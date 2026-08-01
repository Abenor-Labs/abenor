'use client'

import dynamic from 'next/dynamic'

/**
 * Client-only boundary for the 3D layer.
 *
 * three.js has no business running during SSR, and the hero headline must be
 * real server-rendered DOM text for LCP and indexing. So the canvas loads
 * after hydration and the page is fully readable without it.
 */
const StageInner = dynamic(() => import('./StageInner').then((m) => m.StageInner), {
  ssr: false,
  loading: () => null,
})

export function Stage() {
  return <StageInner />
}
