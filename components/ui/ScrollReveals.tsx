'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger, EASE, DUR } from '@/lib/scroll/gsap'

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
    const mm = gsap.matchMedia()

    /*
      Full motion: the element travels 32px and fades.

      `will-change` is set as the tween starts and cleared when it finishes.
      Declaring it in the stylesheet instead — which is what `.fadeup` used to
      do — promotes a compositor layer for every revealable element on a
      twelve-thousand-pixel page and holds all of them for the whole visit,
      to buy a hint that only matters for the 900ms each one is moving.
    */
    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
              onStart: () => gsap.set(batch, { willChange: 'transform, opacity' }),
              onComplete: () => gsap.set(batch, { willChange: 'auto' }),
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
    })

    /*
      Reduced motion: no travel, no scroll dependency, everything simply
      present. Not a shorter version of the same tween — a reveal that still
      waits for a scroll position is still scroll-linked motion, which is the
      category the setting exists to switch off.
    */
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.fadeup', { opacity: 1, y: 0 })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return null
}
