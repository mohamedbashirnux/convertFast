import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

// CDN base for ffmpeg.wasm core (single-thread, no SharedArrayBuffer required for ST)
const FFMPEG_CORE_VERSION = "0.12.6";
const CDN_BASE = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`;

// Module-level cache — ffmpeg is only loaded once per page session
let ffmpegInstance: FFmpeg | null = null;
let loadingPromise: Promise<FFmpeg> | null = null;

/**
 * Load and return the ffmpeg.wasm instance.
 * Safe to call multiple times — returns the cached instance after the first load.
 */
export async function loadFFmpeg(): Promise<FFmpeg> {
  // Return cached instance if already loaded
  if (ffmpegInstance) return ffmpegInstance;

  // Prevent duplicate concurrent loads
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const ffmpeg = new FFmpeg();

    // Load the WASM core from CDN using blob URLs (required by ffmpeg.wasm)
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${CDN_BASE}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${CDN_BASE}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return loadingPromise;
}

/**
 * FFmpeg command arguments per output format.
 * These are conservative settings for maximum compatibility.
 */
function getFFmpegArgs(
  inputFilename: string,
  outputFilename: string,
  outputFormat: string
): string[] {
  const base = ["-i", inputFilename];

  switch (outputFormat) {
    case "mp4":
      return [
        ...base,
        "-c:v", "libx264",
        "-c:a", "aac",
        "-movflags", "+faststart",
        "-preset", "fast",
        outputFilename,
      ];
    case "mp3":
      return [
        ...base,
        "-vn",           // drop video
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        outputFilename,
      ];
    case "webm":
      return [
        ...base,
        "-c:v", "libvpx-vp9",
        "-c:a", "libopus",
        "-b:v", "0",
        "-crf", "30",
        outputFilename,
      ];
    case "mov":
      return [
        ...base,
        "-c:v", "libx264",
        "-c:a", "aac",
        "-movflags", "+faststart",
        outputFilename,
      ];
    case "wav":
      return [
        ...base,
        "-vn",           // drop video
        "-c:a", "pcm_s16le",
        outputFilename,
      ];
    default:
      // Generic fallback — let ffmpeg decide based on extension
      return [...base, outputFilename];
  }
}

/**
 * Convert a file to the specified output format.
 *
 * @param ffmpeg      - A loaded FFmpeg instance from loadFFmpeg()
 * @param file        - The input File object from the browser
 * @param outputFormat - Target format: 'mp4' | 'mp3' | 'webm' | 'mov' | 'wav'
 * @param onProgress  - Callback with progress value 0–100
 * @returns           - A Blob of the converted file
 */
export async function convertFile(
  ffmpeg: FFmpeg,
  file: File,
  outputFormat: string,
  onProgress: (progress: number) => void
): Promise<Blob> {
  // Derive filenames for the virtual FS
  const inputFilename = `input.${file.name.split(".").pop() ?? "bin"}`;
  const outputFilename = `output.${outputFormat}`;

  // Register progress listener
  const progressHandler = ({ progress }: { progress: number }) => {
    // ffmpeg reports 0–1; clamp to 0–100
    onProgress(Math.min(100, Math.round(progress * 100)));
  };
  ffmpeg.on("progress", progressHandler);

  try {
    // Write input file to ffmpeg's virtual file system
    await ffmpeg.writeFile(inputFilename, await fetchFile(file));

    // Build and run the ffmpeg command
    const args = getFFmpegArgs(inputFilename, outputFilename, outputFormat);
    const exitCode = await ffmpeg.exec(args);

    if (exitCode !== 0) {
      throw new Error(
        `Conversion failed (exit code ${exitCode}). The file may be corrupted or the format combination is unsupported.`
      );
    }

    // Read the output file from the virtual FS
    const data = await ffmpeg.readFile(outputFilename);

    // Determine the correct MIME type for the output Blob
    const mimeTypes: Record<string, string> = {
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      webm: "video/webm",
      mov: "video/quicktime",
      wav: "audio/wav",
    };
    const mimeType = mimeTypes[outputFormat] ?? "application/octet-stream";

    // Cast through unknown to satisfy the BlobPart type (FileData can be Uint8Array<ArrayBufferLike>)
    return new Blob([data as unknown as Uint8Array<ArrayBuffer>], { type: mimeType });
  } finally {
    // Always clean up the virtual FS and remove the progress listener
    ffmpeg.off("progress", progressHandler);
    try {
      await ffmpeg.deleteFile(inputFilename);
    } catch {
      // Ignore cleanup errors
    }
    try {
      await ffmpeg.deleteFile(outputFilename);
    } catch {
      // Ignore cleanup errors
    }
  }
}
