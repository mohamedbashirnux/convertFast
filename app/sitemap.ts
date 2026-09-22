import type { MetadataRoute } from "next";
import { CONVERSIONS } from "@/lib/conversions";

const BASE_URL = "https://convertfast.convertapp.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CONVERSIONS.map((c) => ({
      url: `${BASE_URL}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
