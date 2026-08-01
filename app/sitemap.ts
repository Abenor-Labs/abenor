import type { MetadataRoute } from 'next'

const SITE = 'https://abenor.vercel.app'

/**
 * One page, one entry. Case-study routes join this when there is real work to
 * put in them — an empty /work index would be worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date('2026-08-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
