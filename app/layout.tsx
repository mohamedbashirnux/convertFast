import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ConvertFast",
    default: "ConvertFast — Free Online Video & Audio Converter",
  },
  description:
    "Free online video and audio converter. Convert MP4, MP3, WebM, MOV, WAV and more. Works in your browser — no upload needed, 100% private.",
  metadataBase: new URL("https://convertfast.app"),
  openGraph: {
    siteName: "ConvertFast",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {/* Sticky navigation */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              ConvertFast
            </Link>
            <span className="text-xs text-gray-400 hidden sm:block">
              Free browser-based converter
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} ConvertFast. All conversions run in
              your browser.
            </p>
            <p>No uploads. No accounts. Free forever.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
