'use client'

import { useState } from 'react'

const PANES = {
  builds: {
    title: 'Active builds',
    rows: [
      ['Onboarding flow', 'n8n · 14 nodes', 'LIVE'],
      ['Client portal', 'Next.js · staging', '92%'],
      ['Delivery app', 'iOS · TestFlight', 'RC2'],
      ['Billing sync', 'Stripe → CRM', 'LIVE'],
      ['Design system', 'v2 tokens', 'WIP'],
      ['Analytics pipe', 'Postgres', 'LIVE'],
    ],
  },
  runs: {
    title: 'Recent runs',
    rows: [
      ['Lead → CRM', '2 min ago · 340ms', 'OK'],
      ['Invoice sync', '18 min ago · 1.2s', 'OK'],
      ['Slack digest', '1 hr ago · 88ms', 'OK'],
      ['Retry queue', '3 hr ago', '2 HELD'],
    ],
  },
  studio: {
    title: 'Studio',
    rows: [
      ['Capacity', 'Q3 · open', '2 SLOTS'],
      ['Response time', 'business hours', '< 24H'],
      ['Handover docs', 'every project', 'YES'],
    ],
  },
} as const

type PaneKey = keyof typeof PANES

export function PhonePanel() {
  const [pane, setPane] = useState<PaneKey>('builds')
  const active = PANES[pane]

  return (
    <div
      className="raised-lg relative aspect-[9/19] w-[clamp(240px,28vw,296px)] shrink-0 overflow-hidden rounded-[40px] border-[9px] border-[#17181F]"
      style={{ background: '#07070A', boxShadow: '0 40px 90px rgba(0,0,0,0.35), 0 0 0 1px #2B2E3C' }}
      data-cursor="Try"
    >
      <span
        aria-hidden="true"
        className="absolute top-[9px] left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-xl bg-[#17181F]"
      />
      <div className="absolute inset-0 flex flex-col" style={{ background: '#0D0E12' }}>
        <div className="flex justify-between px-4 pt-8 pb-2 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#5A5F70' }}>
          <span>9:41</span>
          <span>Abenor</span>
        </div>

        <div className="scrollbar-none flex-1 overflow-y-auto px-3 pb-3">
          <h3
            className="font-display mt-2 mb-3 text-[23px] font-extrabold tracking-[-0.03em]"
            style={{ color: '#EFEDE8' }}
          >
            {active.title}
          </h3>
          {active.rows.map(([l, sub, r]) => (
            <div
              key={l}
              className="mb-2 flex items-center justify-between gap-2.5 border px-3 py-2.5"
              style={{ borderColor: '#1F212B', background: 'rgba(13,14,18,0.6)' }}
            >
              <span>
                <span className="block text-[11px]" style={{ color: '#EFEDE8' }}>{l}</span>
                <span className="mt-0.5 block text-[9px] tracking-[0.06em]" style={{ color: '#5A5F70' }}>{sub}</span>
              </span>
              <span
                className="font-mono text-[9.5px] tracking-[0.1em]"
                style={{ color: r.includes('HELD') ? '#5B7BFF' : '#FF5E1A' }}
              >
                {r}
              </span>
            </div>
          ))}
        </div>

        <div className="flex border-t" style={{ borderColor: '#1F212B', background: '#0D0E12' }}>
          {(Object.keys(PANES) as PaneKey[]).map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setPane(k)}
              className="flex-1 px-1 pt-3 pb-4 font-mono text-[8.5px] tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ color: pane === k ? '#FF5E1A' : '#5A5F70' }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
