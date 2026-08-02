import { ImageResponse } from 'next/og'

export const alt = 'Abenor — we build the software that stops the copy-pasting'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          background: '#F8F6F1',
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
            color: '#6E7180',
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
              color: '#0A0B0F',
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
              color: '#E8470A',
              display: 'flex',
            }}
          >
            We build the software that stops that.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 74, height: 5, background: '#E8470A', display: 'flex' }} />
          <span style={{ fontSize: 22, letterSpacing: 3, color: '#8E919E' }}>
            abenor.vercel.app
          </span>
        </div>
      </div>
    ),
    size,
  )
}
