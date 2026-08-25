'use client'

import { useEffect, useRef } from 'react'
import { gsap, EASE } from '@/lib/scroll/gsap'

/**
 * A number that counts up once, when it scrolls into view.
 *
 * The gate this passes is **explanation**, not delight. "Two hundred hours a
 * year" is a quantity the visitor is supposed to feel the size of, and a
 * number that climbs makes the size legible in a way a printed figure does
 * not. That justification does not extend to every number on the page — a
 * price or a date has no magnitude to convey and should simply be printed.
 *
 * The final value is what renders on the server, so with no JS, with reduced
 * motion, or in a feed reader, the correct figure is already there. The
 * count-up only ever rewinds a number that is still below the fold.
 */
export function Counter({
  to,
  from = 0,
  className = '',
  duration = 1.4,
}: {
  to: number
  from?: number
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* Already on screen at mount means rewinding it would be a visible
         glitch, so the printed value simply stands. */
      const box = el.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) return

      const proxy = { n: from }
      el.textContent = String(from)

      const tween = gsap.to(proxy, {
        n: to,
        duration,
        ease: EASE.out,
        /* integers only — a decimal flickering through the tween reads as a
           broken readout rather than as a count */
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.n))
        },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        el.textContent = String(to)
      }
    })

    return () => {
      mm.revert()
    }
  }, [to, from, duration])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {to}
    </span>
  )
}
