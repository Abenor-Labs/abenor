'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
})

/**
 * The studio's wall clock. Rendered only after mount, because the server's
 * minute and the visitor's minute will not match and React would flag it.
 */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-live" />
      {now ? (
        <>
          It’s <time className="tabular-nums text-ink-2">{now}</time> in India
        </>
      ) : (
        'IST · UTC+5:30'
      )}
    </p>
  )
}
