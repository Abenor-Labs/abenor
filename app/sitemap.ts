import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required by output: "export" — emit sitemap.xml at build time.
export const dynamic = "force-static";

/**
 * One page, one entry. Case-study routes join this when there is real work to
 * put in them — an empty /work index would be worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
