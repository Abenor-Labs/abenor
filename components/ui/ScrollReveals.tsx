'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger, EASE, DUR } from '@/lib/scroll/gsap'
import { prefersReducedMotion } from '@/lib/scroll/progress'

/**
 * Global scroll-reveal orchestrator. Renders nothing — just sets up
 * ScrollTrigger.batch on every .fadeup element. Elements entering the
 * viewport at the same time stagger automatically, giving each section
 * a cinematic cascade without per-component wiring.
 *
 * Mount once in the page root, after all acts have rendered.
 */
export function ScrollReveals() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set('.fadeup', { opacity: 1, y: 0 })
      return
    }

    // Small delay so Lenis + ScrollTrigger positions are settled
    const id = requestAnimationFrame(() => {
      ScrollTrigger.batch('.fadeup', {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            stagger: 0.1,
            ease: EASE.out,
            overwrite: true,
          })
        },
        start: 'top 88%',
        once: true,
      })

      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(id)
      ScrollTrigger.getAll()
        .filter((t) => t.vars.once)
        .forEach((t) => t.kill())
    }
  }, [])

  return null
}
