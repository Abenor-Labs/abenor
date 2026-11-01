'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { setScroll, prefersReducedMotion } from './progress'

let active: Lenis | null = null

/** Scrolls through Lenis when it is running, natively otherwise. */
export function scrollToY(y: number) {
  if (active) active.scrollTo(y, { duration: 0.9 })
  else window.scrollTo({ top: y })
}

/**
 * Owns scrolling for the whole site.
 *
 * One Lenis instance drives one GSAP ticker, which drives ScrollTrigger,
 * which writes the master 0..1 progress into the scroll store. Everything
 * downstream — camera, scenes, overlays — reads that one number.
 *
 * Under prefers-reduced-motion Lenis is not started at all: native scrolling
 * stays, and progress is still published so scenes can hold correct rest
 * states without animating toward them.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    let lenis: Lenis | null = null

    const publish = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setScroll({ progress: Math.min(1, Math.max(0, p)) })
    }

    if (!reduced) {
      // `anchors` hands in-page links to Lenis; a native hash jump would
      // fight the smoothed position. The offset clears the fixed nav.
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -72 } })
      active = lenis

      lenis.on('scroll', (e: { velocity: number; direction: number }) => {
        ScrollTrigger.update()
        setScroll({ velocity: e.velocity, direction: e.direction || 1 })
        publish()
      })

      const raf = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(raf)
        lenis?.destroy()
        active = null
      }
    }

    // reduced motion: native scroll, still publish progress
    publish()
    window.addEventListener('scroll', publish, { passive: true })
    window.addEventListener('resize', publish)
    return () => {
      window.removeEventListener('scroll', publish)
      window.removeEventListener('resize', publish)
    }
  }, [])

  return <>{children}</>
}
