'use client'

import { useEffect, useState } from 'react'
import { ACTS, currentAct } from '@/lib/motion/acts'
import { subscribeScroll } from '@/lib/scroll/progress'

const LINKS = ACTS.filter((a) => a.id !== 'title')
const CALENDLY = 'https://calendly.com/hello-abenor/30min'

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

  /*
    The fixed chrome inverts when the close section passes under it.

    Deliberately NOT driven by the active act. Act ranges are derived from each
    act's declared `vh`, but real section heights diverge from that (Act 05 is
    a 500vh scroll track inside a 165vh act), so the progress-derived boundary
    lands hundreds of pixels away from where the ink actually starts. Flipping
    there paints a dark chrome band over a still-paper section.

    The observer watches a zero-height band at y=112px, which is the bottom
    edge of the nav plus the status bar. The chrome changes colour exactly
    when the ink arrives at it, whatever the section heights do later.
  */
  useEffect(() => {
    const el = document.getElementById('close')
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.dataset.surface = entry.isIntersecting ? 'ink' : 'paper'
      },
      { rootMargin: '-112px 0px -100% 0px', threshold: 0 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      delete document.documentElement.dataset.surface
    }
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
      <div aria-hidden="true" className="nav-scrim pointer-events-none fixed inset-x-0 top-0 z-30 h-[110px]" />

      <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-40">
        <div className="wrap flex items-center justify-between gap-5 py-5">
          <a
            href="#title"
            className="font-display chrome-t text-[18px] font-extrabold tracking-[0.2em] text-[var(--chrome-fg)]"
          >
            ABENOR
          </a>

          {/*
            xl, not lg: the act list gained "Questions" and "What we build",
            and seven mono labels at 0.16em tracking plus the wordmark and the
            CTA no longer clear 1024px without wrapping into the logo. The
            breakpoint has moved twice for the same reason — if another act is
            added, shorten a label rather than moving it a third time.
          */}
          <ul className="hidden gap-7 xl:flex">
            {LINKS.map((a) => (
              <li key={a.id}>
                <a
                  href={`#${a.id}`}
                  aria-current={active === a.id ? 'true' : undefined}
                  className={`chrome-t font-mono text-[11px] tracking-[0.16em] uppercase ${
                    active === a.id
                      ? 'text-[var(--chrome-accent)] opacity-100'
                      : 'text-[var(--chrome-fg)] opacity-85 hover:opacity-100'
                  }`}
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/*
              The persistent CTA points at the calendar, not the inbox: a
              booked call is the outcome this page is measured on, and this is
              the one control that is reachable from every scroll position.
              Email is still offered at the close for anyone not ready to
              commit a slot.
            */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="Book"
              /* deliberately not `.press`: that class owns transition-property
                 for the element, and `.chrome-t` needs those same longhands to
                 run the 450ms paper/ink handover. Whichever lost would either
                 desync this button from the rest of the fixed chrome or drop
                 the press feedback silently. */
              className="chrome-t border border-[var(--chrome-fg)] px-4 py-2 font-mono text-[10.5px] tracking-[0.16em] whitespace-nowrap text-[var(--chrome-fg)] uppercase hover:bg-[var(--chrome-fg)] hover:text-[var(--chrome-bg)]"
            >
              Book a call
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="chrome-t flex h-11 w-11 items-center justify-center border border-[var(--chrome-fg)] text-[var(--chrome-fg)] xl:hidden"
            >
              <span className="flex w-[16px] flex-col gap-[4px]">
                <span
                  className="block h-px w-full bg-[var(--chrome-fg)] transition-[transform,background-color] duration-300"
                  style={menuOpen ? { transform: 'rotate(45deg) translate(1.7px, 1.7px)' } : undefined}
                />
                <span
                  className="block h-px w-full bg-[var(--chrome-fg)] transition-[opacity,transform] duration-300"
                  style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : undefined}
                />
                <span
                  className="block h-px w-full bg-[var(--chrome-fg)] transition-[transform,background-color] duration-300"
                  style={menuOpen ? { transform: 'rotate(-45deg) translate(1.7px, -1.7px)' } : undefined}
                />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="chrome-t border-t border-[var(--chrome-rule)] bg-[var(--chrome-bg)] xl:hidden">
            <ul className="wrap flex flex-col gap-1 py-4">
              {LINKS.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`chrome-t block py-3 font-mono text-[12px] tracking-[0.16em] uppercase ${
                      active === a.id ? 'text-[var(--chrome-accent)]' : 'text-[var(--chrome-fg-dim)]'
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
