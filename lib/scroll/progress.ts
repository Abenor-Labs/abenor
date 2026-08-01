/**
 * A single mutable scroll store.
 *
 * The 3D layer reads `scrollState.progress` inside useFrame, so camera and
 * scenes update without triggering a single React render. DOM components
 * that genuinely need to re-render subscribe instead.
 *
 * Deliberately not React state: at 60fps this would otherwise re-render
 * the whole tree on every frame.
 */

export interface ScrollState {
  /** 0..1 across the entire page */
  progress: number
  /** px/frame, signed. Used for velocity-reactive elements. */
  velocity: number
  /** 1 down, -1 up */
  direction: number
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  direction: 1,
}

type Listener = (s: ScrollState) => void
const listeners = new Set<Listener>()

export function subscribeScroll(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function setScroll(next: Partial<ScrollState>): void {
  Object.assign(scrollState, next)
  for (const fn of listeners) fn(scrollState)
}

/** True when the visitor has asked for less motion. Checked at call time. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
