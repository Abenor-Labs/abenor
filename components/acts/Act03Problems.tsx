'use client'

import { useEffect, useRef, useState } from 'react'
import { ActSection } from '@/components/ui/ActSection'

/**
 * Act 03 — Problems.
 *
 * Deliberately not a service menu. Nobody wakes up needing "end-to-end web
 * development"; they wake up because a spreadsheet broke. The headline is the
 * symptom the visitor already recognises, and the service is the quiet answer
 * underneath it.
 *
 * Each row carries a card that follows the cursor. It is what turns a list
 * into something you want to run your pointer down.
 */
const PROBLEMS = [
  {
    n: '001',
    problem: 'Someone is re-typing the same record into a second system.',
    answer:
      'We map what actually moves between your tools, then wire it together in n8n with alerting on top — so a broken sync tells you, instead of a customer telling you.',
    chips: ['n8n', 'Integrations', 'Alerting'],
    peek: 'Nobody re-types\nanything',
    tint: 'linear-gradient(135deg, #ff4d0f, #ff8a52)',
  },
  {
    n: '002',
    problem: 'Your site was built by three different people and none of them own it.',
    answer:
      'We take the whole thing: design, build, deploy, DNS. One repository, one team, one number to call when it goes down at 11pm.',
    chips: ['Next.js', 'CMS', 'Hosting'],
    peek: 'Sketch → DNS,\none team',
    tint: 'linear-gradient(135deg, #1b3bff, #93a4ff)',
  },
  {
    n: '003',
    problem: 'You need an app. You do not need a mobile team.',
    answer:
      'iOS and Android, built and taken through store review, then handed over with the release process written down so your next developer is not reverse-engineering it.',
    chips: ['iOS', 'Android', 'Store submission'],
    peek: 'Built for\nApp Review',
    tint: 'linear-gradient(135deg, #0a0a0c, #55534e)',
  },
  {
    n: '004',
    problem: 'It looked right in Figma and fell apart with real content.',
    answer:
      'We design the system, not the screenshot — type scale, spacing, loading states, empty states, error states — and prove it against your actual data before it ships.',
    chips: ['Design system', 'States', 'Motion'],
    peek: 'Systems,\nnot screenshots',
    tint: 'linear-gradient(135deg, #25d9a4, #a6f0ce)',
  },
  {
    n: '005',
    problem: 'A spreadsheet is holding your company together.',
    answer:
      'We replace it with a real tool: a proper database, permissions, an audit trail, and something that keeps working after the person who built it leaves.',
    chips: ['Internal tools', 'APIs', 'Migrations'],
    peek: 'Survives the\nperson who left',
    tint: 'linear-gradient(135deg, #ff3b6b, #ffa8be)',
  },
]

export function Act03Problems() {
  const [active, setActive] = useState<number | null>(null)
  const peek = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = peek.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.11
      y += (ty - y) * 0.11
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <ActSection id="problems" align="center">
      {/* cursor-following preview */}
      <div
        ref={peek}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 hidden aspect-[4/3] w-[min(260px,22vw)] overflow-hidden md:block"
        style={{
          opacity: active === null ? 0 : 1,
          transition: 'opacity 320ms var(--ease-out-expo)',
        }}
      >
        {PROBLEMS.map((p, i) => (
          <span
            key={p.n}
            className="font-display absolute inset-0 grid place-items-center p-4 text-center leading-[1.15] font-extrabold tracking-[-0.02em] whitespace-pre-line text-white"
            style={{
              background: p.tint,
              opacity: active === i ? 1 : 0,
              transition: 'opacity 260ms ease',
              fontSize: 'clamp(14px, 1.5vw, 21px)',
            }}
          >
            {p.peek}
          </span>
        ))}
      </div>

      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">01</b> ] Sound familiar
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Five problems we <em className="text-molten not-italic">fix</em>
          </h2>
        </div>

        <ul>
          {PROBLEMS.map((p, i) => (
            <li
              key={p.n}
              data-cursor="Open"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive((cur) => (cur === i ? null : cur))}
              className="border-rule group relative grid grid-cols-[44px_1fr] items-start gap-x-4 gap-y-3 border-b py-[clamp(22px,3vw,40px)] md:grid-cols-[64px_1.15fr_1fr_auto] md:items-center md:gap-x-8"
            >
              {/* wash that fills from the bottom on hover */}
              <span
                aria-hidden="true"
                className="bg-paper-2 absolute inset-x-[calc(var(--gut)*-1)] inset-y-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 group-hover:origin-top group-hover:scale-y-100"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              />

              <span className="text-molten pt-1 font-mono text-[11px] tracking-[0.1em] md:pt-0">
                {p.n}
              </span>

              <h3
                data-t={p.problem}
                className="split-h font-display leading-[1.08] font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2"
                style={{ fontSize: 'clamp(19px, 2.6vw, 34px)' }}
              >
                {p.problem}
              </h3>

              <p className="text-ink-2 col-start-2 max-w-[46ch] text-[13px] leading-[1.62] md:col-start-3">
                {p.answer}
              </p>

              <div className="col-start-2 flex flex-wrap gap-1.5 md:col-start-4 md:justify-end">
                {p.chips.map((c) => (
                  <span
                    key={c}
                    className="border-rule text-ink-2 group-hover:border-rule-2 border px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ActSection>
  )
}
