"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadFFmpeg, convertFile } from "@/lib/ffmpeg";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

const MAX_SIZE = 500 * 1024 * 1024; // 500 MB
const OUTPUT_FORMATS = ["mp4", "mp3", "webm", "mov", "wav"] as const;
type OutputFormat = (typeof OUTPUT_FORMATS)[number];

type Status = "idle" | "loading" | "converting" | "done" | "error";

interface ConverterProps {
  defaultOutputFormat?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Converter({ defaultOutputFormat }: ConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(() => {
    if (
      defaultOutputFormat &&
      OUTPUT_FORMATS.includes(defaultOutputFormat as OutputFormat)
    ) {
      return defaultOutputFormat as OutputFormat;
    }
    return "mp4";
  });
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFilename, setOutputFilename] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const downloadUrlRef = useRef<string | null>(null);

  // Revoke blob URL on unmount to free memory
  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  // Keep ref in sync so the cleanup effect always has the latest URL
  useEffect(() => {
    downloadUrlRef.current = downloadUrl;
  }, [downloadUrl]);

  const resetState = () => {
    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current);
      downloadUrlRef.current = null;
    }
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
    setDownloadUrl(null);
    setOutputFilename(null);
  };

  const handleFileChange = useCallback((incoming: File | null) => {
    if (!incoming) return;
    resetState();
    setFile(incoming);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Drag and drop handlers ---
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileChange(dropped);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    handleFileChange(picked);
    // Reset input value so the same file can be re-picked after reset
    e.target.value = "";
  };

  // --- Conversion ---
  const handleConvert = async () => {
    if (!file) return;

    try {
      // Step 1: load ffmpeg.wasm if not already loaded
      setStatus("loading");
      setProgress(0);

      if (!ffmpegRef.current) {
        ffmpegRef.current = await loadFFmpeg();
      }

      // Step 2: run conversion
      setStatus("converting");
      setProgress(0);

      const blob = await convertFile(
        ffmpegRef.current,
        file,
        outputFormat,
        (p) => setProgress(p)
      );

      // Step 3: create download URL
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const filename = `${baseName}.${outputFormat}`;

      setDownloadUrl(url);
      setOutputFilename(filename);
      setProgress(100);
      setStatus("done");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during conversion.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const isTooLarge = file !== null && file.size > MAX_SIZE;
  const isConverting = status === "loading" || status === "converting";
  const canConvert = file !== null && !isTooLarge && !isConverting && status !== "done";

  return (
    <div className="w-full space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        aria-label="File drop zone — click or drag a file here"
        className={[
          "relative w-full rounded-xl border-2 border-dashed cursor-pointer",
          "flex flex-col items-center justify-center gap-2 p-8 text-center",
          "transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50",
        ].join(" ")}
      >
        {/* Upload icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        {file ? (
          <div className="space-y-1">
            <p className="font-medium text-gray-800 break-all">{file.name}</p>
            <p className="text-sm text-gray-500">{formatBytes(file.size)}</p>
            <p className="text-xs text-blue-500">Click or drag to replace</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-medium text-gray-700">
              Drop your video or audio file here
            </p>
            <p className="text-sm text-gray-500">
              or click to browse — up to 500 MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*"
          onChange={onFileInputChange}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* 500 MB warning */}
      {isTooLarge && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            <strong>File is too large.</strong> Maximum size is 500 MB. Your
            file is {formatBytes(file.size)}.
          </span>
        </div>
      )}

      {/* Format selector + Convert button row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="output-format"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Convert to
          </label>
          <select
            id="output-format"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
            disabled={isConverting}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
          >
            {OUTPUT_FORMATS.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!canConvert}
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting ? "Converting…" : "Convert"}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {(status === "loading" || status === "converting") && (
        <div className="space-y-2" role="status" aria-live="polite">
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {status === "loading"
                ? "Loading converter (first time only)…"
                : `Converting… ${progress}%`}
            </span>
            <span>{status === "loading" ? "" : `${progress}%`}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            {status === "loading" ? (
              // Indeterminate animation while loading ffmpeg
              <div className="h-full w-1/3 rounded-full bg-blue-500 animate-[loading_1.2s_ease-in-out_infinite]" />
            ) : (
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        </div>
      )}

      {/* Download button */}
      {status === "done" && downloadUrl && outputFilename && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
          <div className="flex items-center gap-2 text-green-700 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Conversion complete!</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={downloadUrl}
              download={outputFilename}
              className="flex-1 sm:flex-none rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white text-center shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Download {outputFilename}
            </a>
            <button
              type="button"
              onClick={() => {
                resetState();
                setFile(null);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              Convert another
            </button>
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div
          role="alert"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3"
        >
          <div className="flex items-start gap-2 text-red-700 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={resetState}
            className="shrink-0 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
