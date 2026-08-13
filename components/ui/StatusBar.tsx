'use client'

import { useEffect, useState } from 'react'

/**
 * A live clock and an availability light.
 *
 * Small, but it is the difference between a page and a place — something on
 * screen is happening right now, which is exactly the claim a studio taking
 * work needs to make. Rendered only after mount so server and client cannot
 * disagree about the time.
 */
export function StatusBar() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      // IST, independent of the visitor's own timezone
      const now = new Date()
      const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000)
      setTime(
        [ist.getHours(), ist.getMinutes(), ist.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':'),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    /* 68px was stale: the nav is py-5 around a 44px hamburger below lg (84px)
       and a 34px button above it (74px), so the bar's top border was sitting
       inside the nav's own box on small screens. */
    <div className="chrome-t fixed inset-x-0 top-[84px] z-30 border-y border-[var(--chrome-rule)] bg-[var(--chrome-bg-2)] backdrop-blur-[6px] lg:top-[74px]">
      {/*
        This bar is fixed under a fixed nav, so every row it wraps to is a row
        stolen from the viewport for the whole visit. Three wide uppercase
        strings do not fit a 375px phone on one line, and the nav above is
        already 68px — left alone it costs well over a fifth of a small screen
        permanently. So the bar sheds text as the viewport narrows rather than
        growing taller: the founding line is in the footer anyway, and the
        clock reads fine without its label.
      */}
      <div className="wrap chrome-t flex items-center justify-between gap-4 py-2.5 font-mono text-[10.5px] tracking-[0.2em] text-[var(--chrome-fg-dim)] uppercase">
        <span className="chrome-t flex items-center gap-2.5 whitespace-nowrap text-[var(--chrome-fg)]">
          <i
            aria-hidden="true"
            className="bg-molten inline-block h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ boxShadow: '0 0 0 3px rgba(255,94,26,0.18)', animation: 'beat 2s ease-in-out infinite' }}
          />
          Taking work now
        </span>
        <span className="whitespace-nowrap">
          <span className="hidden sm:inline">Studio time </span>
          <b className="chrome-t font-medium text-[var(--chrome-fg)] tabular-nums">
            {time ?? '--:--:--'}
          </b>{' '}
          IST
        </span>
        <span className="hidden whitespace-nowrap md:inline">Software studio · started 2026</span>
      </div>
    </div>
  )
}
