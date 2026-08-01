'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/scroll/gsap'
import { scrollState, prefersReducedMotion } from '@/lib/scroll/progress'

/**
 * A ticker that runs on its own and reverses with your scroll direction.
 *
 * Driven from the GSAP ticker rather than a CSS keyframe so it can react to
 * scroll: the direction flip is the detail that makes it feel attached to the
 * page instead of looping beside it.
 */
export function Ticker({ items, label }: { items: string[]; label?: string }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    if (prefersReducedMotion()) return

    let x = 0
    const step = () => {
      const half = el.scrollWidth / 2
      if (!half) return
      x -= 0.85 * (scrollState.direction || 1)
      if (x <= -half) x += half
      if (x > 0) x -= half
      el.style.transform = `translate3d(${x}px, 0, 0)`
    }

    gsap.ticker.add(step)
    return () => {
      gsap.ticker.remove(step)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="border-rule bg-paper-2/50 relative z-10 overflow-hidden border-y py-4"
    >
      {label && (
        <span className="wrap text-ink-3 mb-2 block font-mono text-[9.5px] tracking-[0.24em] uppercase">
          {label}
        </span>
      )}
      <div ref={track} className="flex w-max gap-10 will-change-transform">
        {[...items, ...items].map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="text-ink-2 flex items-center gap-10 font-mono text-[12px] tracking-[0.16em] whitespace-nowrap uppercase"
          >
            {s}
            <i aria-hidden="true" className="text-molten not-italic">
              /
            </i>
          </span>
        ))}
      </div>
    </div>
  )
}
