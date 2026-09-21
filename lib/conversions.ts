export interface ConversionConfig {
  slug: string;
  from: string;
  to: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  howTo: string[];
  faq: { q: string; a: string }[];
}

export const CONVERSIONS: ConversionConfig[] = [
  {
    slug: "webm-to-mp4",
    from: "webm",
    to: "mp4",
    label: "WebM to MP4",
    title: "Convert WebM to MP4 Online — Free & Fast",
    description:
      "Convert WebM videos to MP4 instantly in your browser. No upload needed, 100% private, supports files up to 200 MB. Free forever.",
    h1: "Free WebM to MP4 Converter",
    howTo: [
      "Click 'Choose File' or drag your WebM video into the drop zone.",
      "Make sure MP4 is selected as the output format.",
      "Click 'Convert' and wait for the progress bar to complete.",
      "Click 'Download' to save your MP4 file.",
    ],
    faq: [
      {
        q: "Is this WebM to MP4 converter free?",
        a: "Yes, completely free. There are no limits on conversions and no account required.",
      },
      {
        q: "Does my file get uploaded to a server?",
        a: "No. Conversion happens entirely inside your browser using WebAssembly. Your file never leaves your device.",
      },
      {
        q: "Why convert WebM to MP4?",
        a: "MP4 is supported by almost every device and platform including iPhones, Android phones, TVs, and social media sites. WebM has limited support outside of browsers.",
      },
      {
        q: "What is the maximum file size?",
        a: "Up to 200 MB. For larger files, consider splitting the video first.",
      },
      {
        q: "Will the quality be affected?",
        a: "The converter re-encodes the video. You can expect very good quality output, though some minor quality loss is normal when changing formats.",
      },
    ],
  },
  {
    slug: "mp4-to-mp3",
    from: "mp4",
    to: "mp3",
    label: "MP4 to MP3",
    title: "Convert MP4 to MP3 Online — Extract Audio Free",
    description:
      "Extract audio from MP4 videos and save as MP3. Works in your browser, no upload, no software to install. Free and fast.",
    h1: "Free MP4 to MP3 Converter — Extract Audio",
    howTo: [
      "Choose or drag your MP4 video file into the drop zone.",
      "Select MP3 as the output format.",
      "Click 'Convert' to extract the audio track.",
      "Download your MP3 file once conversion is complete.",
    ],
    faq: [
      {
        q: "Can I extract audio from any MP4 file?",
        a: "Yes, as long as the MP4 has an audio track. Silent videos will produce a silent or very small MP3 file.",
      },
      {
        q: "What audio quality will the MP3 be?",
        a: "The audio is extracted and encoded at 192 kbps by default, which is high quality for most uses.",
      },
      {
        q: "Is there a faster way to convert?",
        a: "The conversion speed depends on your device. Modern computers and phones handle most files in under a minute.",
      },
      {
        q: "Does the video get deleted after conversion?",
        a: "Nothing is stored anywhere. The file stays on your device and the browser never uploads it.",
      },
    ],
  },
  {
    slug: "mov-to-mp4",
    from: "mov",
    to: "mp4",
    label: "MOV to MP4",
    title: "Convert MOV to MP4 Online — Free iPhone Video Converter",
    description:
      "Convert MOV files from iPhone or Mac to MP4. Works in your browser with no upload. Free, fast and private.",
    h1: "Free MOV to MP4 Converter",
    howTo: [
      "Select your MOV file using the file picker or drag it in.",
      "MP4 is already selected as the output format.",
      "Click 'Convert' and watch the progress bar.",
      "Click 'Download' to get your converted MP4.",
    ],
    faq: [
      {
        q: "Why do I need to convert MOV to MP4?",
        a: "MOV files recorded on iPhones or Macs may not play on Windows or Android devices. MP4 works universally.",
      },
      {
        q: "Will I lose quality converting MOV to MP4?",
        a: "The quality difference is minimal. Both formats can carry the same H.264 video data.",
      },
      {
        q: "Can I convert 4K MOV files?",
        a: "Yes, but 4K files are large and may take a few minutes. Make sure the file is under 200 MB.",
      },
      {
        q: "Does this work on iPhone?",
        a: "Yes, the converter works in mobile browsers on iOS and Android.",
      },
    ],
  },
  {
    slug: "mkv-to-mp4",
    from: "mkv",
    to: "mp4",
    label: "MKV to MP4",
    title: "Convert MKV to MP4 Online — Free & No Software Needed",
    description:
      "Convert MKV videos to MP4 directly in your browser. No installation, no upload, completely private. Supports files up to 200 MB.",
    h1: "Free MKV to MP4 Converter",
    howTo: [
      "Drag your MKV file into the drop zone or click to browse.",
      "Confirm MP4 is selected as the output.",
      "Press 'Convert' and wait for the conversion to finish.",
      "Download your MP4 file.",
    ],
    faq: [
      {
        q: "What is an MKV file?",
        a: "MKV (Matroska Video) is a flexible container format often used for HD movies and TV shows. It supports multiple audio tracks and subtitles.",
      },
      {
        q: "Why convert MKV to MP4?",
        a: "MP4 is more widely supported on smart TVs, phones, and streaming services that may not handle MKV files.",
      },
      {
        q: "Will subtitles be included in the MP4?",
        a: "Subtitles embedded as a separate track are not converted. Only the main video and audio tracks are included in the output.",
      },
      {
        q: "Is this converter safe to use?",
        a: "Your file never leaves your device. Conversion runs locally in the browser using WebAssembly.",
      },
    ],
  },
  {
    slug: "mp4-to-webm",
    from: "mp4",
    to: "webm",
    label: "MP4 to WebM",
    title: "Convert MP4 to WebM Online — Free Web Video Converter",
    description:
      "Convert MP4 to WebM format for use in web projects. Runs in your browser, no upload required. Free and private.",
    h1: "Free MP4 to WebM Converter",
    howTo: [
      "Choose your MP4 file with the file picker or drag it in.",
      "Select WebM as the output format.",
      "Click 'Convert' and wait for the progress bar.",
      "Download the WebM file when done.",
    ],
    faq: [
      {
        q: "When should I use WebM instead of MP4?",
        a: "WebM is the preferred format for web video on HTML5 pages and is well-supported in Chrome and Firefox. It often produces smaller file sizes.",
      },
      {
        q: "Is WebM supported on all browsers?",
        a: "WebM is supported in Chrome, Firefox, Edge, and Opera. Safari has limited support, which is why MP4 is still more common.",
      },
      {
        q: "Will the converted WebM file be smaller?",
        a: "WebM with VP9 encoding can be significantly smaller than H.264 MP4 at similar quality.",
      },
    ],
  },
  {
    slug: "avi-to-mp4",
    from: "avi",
    to: "mp4",
    label: "AVI to MP4",
    title: "Convert AVI to MP4 Online — Free & Fast",
    description:
      "Convert old AVI video files to MP4 in your browser. No software, no upload. Free, fast, and 100% private.",
    h1: "Free AVI to MP4 Converter",
    howTo: [
      "Select your AVI file or drag it into the drop zone.",
      "MP4 is selected as the output format.",
      "Click 'Convert' and let the browser do the work.",
      "Download your MP4 when conversion is complete.",
    ],
    faq: [
      {
        q: "Are AVI files still common?",
        a: "AVI is an older Microsoft format still used by some cameras and older software. MP4 is the modern replacement.",
      },
      {
        q: "Why won't my AVI play on my phone?",
        a: "Most phones don't support AVI natively. Converting to MP4 solves this instantly.",
      },
      {
        q: "How long does conversion take?",
        a: "Conversion time depends on file size and your device speed. A 100 MB file typically converts in under 2 minutes.",
      },
    ],
  },
  {
    slug: "mp3-to-wav",
    from: "mp3",
    to: "wav",
    label: "MP3 to WAV",
    title: "Convert MP3 to WAV Online — Free Lossless Audio Converter",
    description:
      "Convert MP3 audio to uncompressed WAV format in your browser. No upload, free, and instant. Perfect for audio editing.",
    h1: "Free MP3 to WAV Converter",
    howTo: [
      "Upload your MP3 file or drag it into the converter.",
      "Select WAV as the output format.",
      "Click 'Convert' to start the conversion.",
      "Download your WAV file when ready.",
    ],
    faq: [
      {
        q: "Why convert MP3 to WAV?",
        a: "WAV is an uncompressed format needed by some audio software (DAWs, video editors) that require lossless audio.",
      },
      {
        q: "Will the audio quality improve after converting?",
        a: "No. Converting MP3 to WAV won't recover lost quality from the original MP3 compression, but the WAV file will be compatible with professional audio tools.",
      },
      {
        q: "Why is the WAV file much larger than the MP3?",
        a: "WAV stores uncompressed audio data. A 5 MB MP3 can become a 50 MB WAV file — this is normal.",
      },
    ],
  },
  {
    slug: "wav-to-mp3",
    from: "wav",
    to: "mp3",
    label: "WAV to MP3",
    title: "Convert WAV to MP3 Online — Compress Audio Free",
    description:
      "Compress large WAV audio files to MP3 in your browser. No upload, no account needed. Free and instant.",
    h1: "Free WAV to MP3 Converter",
    howTo: [
      "Choose your WAV file or drag it into the drop zone.",
      "Select MP3 as the output format.",
      "Click 'Convert' and wait for the process to finish.",
      "Download your compressed MP3 file.",
    ],
    faq: [
      {
        q: "How much smaller will my MP3 be compared to WAV?",
        a: "MP3 is typically 10x smaller than WAV at the same length. A 50 MB WAV usually compresses to around 5 MB in MP3.",
      },
      {
        q: "What quality is the output MP3?",
        a: "The output is encoded at 192 kbps, which sounds excellent for music and voices.",
      },
      {
        q: "Will I be able to hear a difference?",
        a: "For most listeners, 192 kbps MP3 is indistinguishable from the original WAV in everyday listening.",
      },
    ],
  },
  {
    slug: "mp4-to-wav",
    from: "mp4",
    to: "wav",
    label: "MP4 to WAV",
    title: "Convert MP4 to WAV Online — Extract Audio as WAV Free",
    description:
      "Extract audio from MP4 video and save as uncompressed WAV. Browser-based, no upload, free and instant.",
    h1: "Free MP4 to WAV Converter — Extract Audio",
    howTo: [
      "Select your MP4 file or drag it in.",
      "Choose WAV as the output format.",
      "Click 'Convert' to extract and convert the audio.",
      "Download your WAV file.",
    ],
    faq: [
      {
        q: "Why extract audio as WAV instead of MP3?",
        a: "WAV is uncompressed, making it ideal for further editing in audio software without any quality loss.",
      },
      {
        q: "Does the video portion get deleted?",
        a: "The output is audio-only. The video track is discarded during conversion.",
      },
      {
        q: "Can I use the WAV file in a DAW like Audacity or GarageBand?",
        a: "Yes. WAV is the standard format accepted by all major audio editing applications.",
      },
    ],
  },
  {
    slug: "webm-to-mp3",
    from: "webm",
    to: "mp3",
    label: "WebM to MP3",
    title: "Convert WebM to MP3 Online — Extract Audio Free",
    description:
      "Extract audio from WebM videos and save as MP3. Runs in your browser, no upload, completely private. Free forever.",
    h1: "Free WebM to MP3 Converter",
    howTo: [
      "Add your WebM file by clicking 'Choose File' or dragging it in.",
      "Select MP3 as the output format.",
      "Click 'Convert' and wait for the audio extraction.",
      "Download your MP3 file.",
    ],
    faq: [
      {
        q: "What kind of WebM files work with this converter?",
        a: "Any WebM file with an audio track (VP8/VP9 video with Vorbis or Opus audio) is supported.",
      },
      {
        q: "Can I use this to save audio from browser recordings?",
        a: "Yes. Browser-recorded WebM files (from MediaRecorder API) convert perfectly to MP3.",
      },
      {
        q: "Is this free for commercial use?",
        a: "Yes, the conversion tool is free for personal and commercial use.",
      },
    ],
  },
];

/**
 * Look up a conversion config by its slug.
 * Returns undefined if the slug is not found.
 */
export function getConversion(slug: string): ConversionConfig | undefined {
  return CONVERSIONS.find((c) => c.slug === slug);
}
