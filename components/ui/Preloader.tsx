'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/scroll/gsap'

const STEPS = ['booting', 'loading glyphs', 'compiling shaders', 'wiring nodes', 'ready']

/**
 * Counter, progress rule, then a curtain of panels wiping up off the page.
 *
 * The content underneath is already in the DOM and already painted — this is
 * an overlay over a finished page, not a gate in front of an unfinished one,
 * so it costs nothing in LCP terms. Skipped outright under reduced motion and
 * removed from the tree once it has played.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.remove()
      document.documentElement.dataset.intro = 'done'
      return
    }

    const count = el.querySelector<HTMLElement>('[data-count]')
    const bar = el.querySelector<HTMLElement>('[data-bar]')
    const log = el.querySelector<HTMLElement>('[data-log]')
    const panels = el.querySelectorAll<HTMLElement>('[data-panel]')

    const o = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.dataset.intro = 'done'
        el.remove()
      },
    })

    tl.to(o, {
      v: 100,
      duration: 1.25,
      ease: 'power2.inOut',
      onUpdate() {
        if (count) count.textContent = String(Math.round(o.v))
        if (log) log.textContent = STEPS[Math.min(STEPS.length - 1, Math.floor((o.v / 100) * STEPS.length))]
      },
    })
      .to(bar, { scaleX: 1, duration: 1.25, ease: 'power2.inOut' }, 0)
      .to(el.querySelector('[data-face]'), { autoAlpha: 0, duration: 0.3 }, '+=0.08')
      .to(panels, { yPercent: -101, duration: 0.85, stagger: 0.06, ease: 'expo.inOut' }, '-=0.15')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="bg-paper absolute inset-0 flex flex-col items-center justify-center" data-face>
        <span
          data-count
          className="font-display text-ink leading-none font-extrabold tracking-[-0.05em]"
          style={{ fontSize: 'clamp(70px, 18vw, 230px)' }}
        >
          0
        </span>
        <span
          data-log
          className="text-ink-3 absolute bottom-[8vh] font-mono text-[10.5px] tracking-[0.3em] uppercase"
        >
          booting
        </span>
        <span
          data-bar
          className="bg-molten absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0"
        />
      </div>

      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} data-panel className="bg-paper-2 flex-1" />
        ))}
      </div>
    </div>
  )
}
