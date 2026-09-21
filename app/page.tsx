import Link from "next/link";
import { CONVERSIONS } from "@/lib/conversions";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Free Online Video &amp; Audio Converter
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Convert your files instantly in the browser. No upload, no waiting,
          100% private. Your files never leave your device.
        </p>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          "🔒 100% Private",
          "⚡ Browser-based",
          "🆓 Free Forever",
          "📱 Works on Mobile",
          "🚫 No Sign-up",
        ].map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Converter grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Choose a converter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONVERSIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {/* Format arrow badge */}
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-bold uppercase text-gray-600">
                  {c.from}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase text-blue-600">
                  {c.to}
                </span>
              </div>

              {/* Label */}
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {c.label}
              </h3>

              {/* Short description */}
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {c.description}
              </p>

              {/* CTA */}
              <span className="mt-auto pt-1 text-sm font-medium text-blue-600 group-hover:underline">
                Convert now →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust section */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          How does it work?
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          ConvertFast uses{" "}
          <strong>FFmpeg compiled to WebAssembly</strong>, running entirely
          inside your browser. Your file is never uploaded to any server.
          Conversion happens on your own device — fast, private, and free.
        </p>
      </div>
    </main>
  );
}
