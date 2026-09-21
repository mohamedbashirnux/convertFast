import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CONVERSIONS, getConversion } from "@/lib/conversions";
import Converter from "@/components/Converter";
import AdSlot from "@/components/AdSlot";

const BASE_URL = "https://convertfast.app";

// Pre-generate all 10 conversion pages at build time
export function generateStaticParams() {
  return CONVERSIONS.map((c) => ({ conversion: c.slug }));
}

// Generate per-page SEO metadata — params is a Promise in Next.js 16
export async function generateMetadata({
  params,
}: PageProps<"/[conversion]">): Promise<Metadata> {
  const { conversion } = await params;
  const config = getConversion(conversion);

  if (!config) return {};

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `${BASE_URL}/${config.slug}`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${BASE_URL}/${config.slug}`,
      type: "website",
      siteName: "ConvertFast",
    },
    twitter: {
      card: "summary",
      title: config.title,
      description: config.description,
    },
  };
}

// Dynamic conversion page — Server Component
export default async function ConversionPage({
  params,
}: PageProps<"/[conversion]">) {
  const { conversion } = await params;
  const config = getConversion(conversion);

  if (!config) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
      {/* Top ad slot */}
      <AdSlot size="top" />

      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {config.h1}
        </h1>
        <p className="text-gray-500 text-base">{config.description}</p>
      </div>

      {/* Converter tool */}
      <section aria-label="Converter tool">
        <Converter defaultOutputFormat={config.to} />
      </section>

      {/* Bottom ad slot */}
      <AdSlot size="bottom" />

      {/* How-to section */}
      <section aria-labelledby="howto-heading" className="space-y-4">
        <h2
          id="howto-heading"
          className="text-xl font-semibold text-gray-900"
        >
          How to convert {config.from.toUpperCase()} to{" "}
          {config.to.toUpperCase()}
        </h2>
        <ol className="space-y-3 list-none">
          {config.howTo.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ section */}
      <section aria-labelledby="faq-heading" className="space-y-3">
        <h2
          id="faq-heading"
          className="text-xl font-semibold text-gray-900"
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {config.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg border border-gray-200 bg-white overflow-hidden"
            >
              <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                {/* Chevron icon rotates when open */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
