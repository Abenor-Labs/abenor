'use client'

import dynamic from 'next/dynamic'

/**
 * Client-only boundary for the visual layers.
 *
 * Neither three.js nor raw WebGL has any business running during SSR, and the
 * hero headline must be real server-rendered DOM text for LCP and indexing.
 * Both canvases load after hydration; the page is fully readable without them.
 *
 * Two separate canvases on purpose: the backdrop is a full-screen effect that
 * must never move with the scene camera, and the particle mark must.
 */
const ShaderBackdrop = dynamic(
  () => import('./ShaderBackdrop').then((m) => m.ShaderBackdrop),
  { ssr: false, loading: () => null },
)

const StageInner = dynamic(() => import('./StageInner').then((m) => m.StageInner), {
  ssr: false,
  loading: () => null,
})

export function Stage() {
  return (
    <>
      <ShaderBackdrop />
      <StageInner />
    </>
  )
}
