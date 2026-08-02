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
  const [menuOpen, setMenuOpen] = useState(false)

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

      <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-40">
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

          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@abenor.com"
              className="border-ink text-ink hover:bg-ink hover:text-paper border px-4 py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300"
            >
              Start a build
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="border-ink text-ink flex h-[38px] w-[38px] items-center justify-center border transition-colors duration-300 md:hidden"
            >
              <span className="flex w-[16px] flex-col gap-[4px]">
                <span
                  className="bg-ink block h-px w-full transition-transform duration-300"
                  style={menuOpen ? { transform: 'rotate(45deg) translate(1.7px, 1.7px)' } : undefined}
                />
                <span
                  className="bg-ink block h-px w-full transition-all duration-300"
                  style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : undefined}
                />
                <span
                  className="bg-ink block h-px w-full transition-transform duration-300"
                  style={menuOpen ? { transform: 'rotate(-45deg) translate(1.7px, -1.7px)' } : undefined}
                />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="bg-paper border-rule border-t md:hidden">
            <ul className="wrap flex flex-col gap-1 py-4">
              {LINKS.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2.5 font-mono text-[12px] tracking-[0.16em] uppercase transition-colors duration-200 ${
                      active === a.id ? 'text-molten' : 'text-ink-2'
                    }`}
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
