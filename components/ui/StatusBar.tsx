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
    <div className="border-rule bg-paper-2/60 relative z-10 border-y backdrop-blur-[2px]">
      <div className="wrap text-ink-2 flex flex-wrap items-center justify-between gap-4 py-3 font-mono text-[10.5px] tracking-[0.2em] uppercase">
        <span className="text-ink flex items-center gap-2.5">
          <i
            aria-hidden="true"
            className="bg-molten inline-block h-[7px] w-[7px] rounded-full"
            style={{ boxShadow: '0 0 0 3px rgba(255,94,26,0.18)', animation: 'beat 2s ease-in-out infinite' }}
          />
          Taking work now
        </span>
        <span>
          Studio time{' '}
          <b className="text-ink font-medium tabular-nums">{time ?? '--:--:--'}</b> IST
        </span>
        <span>Software studio · started 2026</span>
      </div>
    </div>
  )
}
