'use client'

import { useEffect, useState } from 'react'
import { ACTS, currentAct } from '@/lib/motion/acts'
import { subscribeScroll } from '@/lib/scroll/progress'

const LINKS = ACTS.filter((a) => a.id !== 'title')

/**
 * Fixed nav with a live act indicator.
 *
 * Contact is reachable from here at every scroll position — the spec calls
 * this out explicitly, because a page this long must never trap the one
 * action that earns money behind seven acts of scrolling.
 */
export function Nav() {
  const [active, setActive] = useState<string>('title')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return subscribeScroll((s) => {
      setProgress(s.progress)
      setActive(currentAct(s.progress).id)
    })
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="bg-molten fixed top-0 left-0 z-50 h-[2px] origin-left"
        style={{ width: `${progress * 100}%` }}
      />

      {/*
        The nav is fixed over a page that scrolls forever, so without a scrim
        every heading passes straight through it. A paper fade reads cleaner
        here than a hard bar — it keeps the header feeling weightless while
        still guaranteeing the links stay legible over any act.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[110px]"
        style={{
          background:
            'linear-gradient(180deg, var(--color-paper) 0%, color-mix(in srgb, var(--color-paper) 82%, transparent) 55%, transparent 100%)',
        }}
      />

      <nav className="fixed inset-x-0 top-0 z-40">
        <div className="wrap flex items-center justify-between gap-5 py-5">
          <a href="#title" className="font-display text-ink text-[18px] font-extrabold tracking-[0.2em]">
            ABENOR
          </a>

          <ul className="hidden gap-7 md:flex">
            {LINKS.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  aria-current={active === a.id ? 'true' : undefined}
                  className={`font-mono text-[11px] tracking-[0.16em] uppercase transition-opacity duration-300 ${
                    active === a.id ? 'text-molten opacity-100' : 'text-ink opacity-55 hover:opacity-100'
                  }`}
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="mailto:hello@abenor.com"
            className="border-ink text-ink hover:bg-ink hover:text-paper border px-4 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300"
          >
            Start a build
          </a>
        </div>
      </nav>
    </>
  )
}
