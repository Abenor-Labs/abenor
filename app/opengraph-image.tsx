import { ImageResponse } from 'next/og'

export const alt = 'Abenor — we build the software that stops the copy-pasting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Generated at build time so a shared link is never a bare URL.
 * Deliberately no webfont fetch — the system stack renders fine at this size
 * and a network call here is a build-time failure waiting to happen.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07070a',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#83889a',
          }}
        >
          <span>Abenor</span>
          <span>Software studio · 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              fontWeight: 800,
              color: '#efede8',
              maxWidth: 940,
              display: 'flex',
            }}
          >
            Right now, someone in your business is copying data between two tabs.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1.2,
              color: '#ff5e1a',
              display: 'flex',
            }}
          >
            We build the software that stops that.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 74, height: 5, background: '#ff5e1a', display: 'flex' }} />
          <span style={{ fontSize: 22, letterSpacing: 3, color: '#83889a' }}>
            abenor.vercel.app
          </span>
        </div>
      </div>
    ),
    size,
  )
}
