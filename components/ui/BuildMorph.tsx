'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/scroll/gsap'
import { prefersReducedMotion } from '@/lib/scroll/progress'

/**
 * The four steps: a name, and what it costs in time.
 *
 * Each step used to carry a sentence of description that opened as the step
 * became active. They are gone, and the frame beside them is the reason: it
 * already draws the conversation, the scope document, the working build and
 * the handover, so the prose was captioning a picture the visitor is looking
 * at. Where a fact in one of those sentences was load-bearing rather than
 * descriptive — the scope is written, and it lands before any code — it moved
 * into the FAQ, which is now the one place on the page that holds facts.
 *
 * The `when` column is what replaced them. "Weekly working software" is an
 * adjective; "8 days" is a claim a buyer can hold us to, and the four add to
 * the same eleven working days the FAQ quotes. If either is edited, both have
 * to move: a page quoting two different timelines is worse than one quoting
 * none.
 */
const STEPS = [
  { k: '01', t: 'A call', when: '30 min', label: 'Before we start' },
  { k: '02', t: 'A written scope', when: '2 days', label: 'Scope document' },
  { k: '03', t: 'Working software', when: '8 days', label: 'Week 2 build' },
  { k: '04', t: 'Keys handed over', when: '1 day', label: 'Shipped' },
]

export function BuildMorph() {
  const root = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const layers = el.querySelectorAll<HTMLElement>('[data-layer]')

    if (prefersReducedMotion()) {
      gsap.set(layers, { opacity: 1 })
      setStep(STEPS.length - 1)
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4.2))),
      },
    })

    tl.to(layers[1], { opacity: 1, duration: 1 }, 0.35)
      .to(layers[2], { opacity: 1, duration: 1 }, 1.5)
      .to(layers[3], { opacity: 1, duration: 1 }, 2.65)
      .to({}, { duration: 0.5 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div ref={root} className="relative min-h-[500vh]">
      <div className="sticky top-[14vh] grid items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
        {/* ── visual frame ── */}
        <div
          aria-hidden="true"
          className="relative aspect-[16/10] w-full overflow-hidden rounded-sm"
          style={{
            background: 'var(--color-paper-2)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px -4px rgba(0,0,0,0.06)',
          }}
        >
          {/* 01 — conversation */}
          <div data-layer className="absolute inset-0 flex flex-col justify-center px-[clamp(20px,3vw,40px)]">
            <div className="space-y-3 max-w-[80%]">
              <div className="flex items-start gap-2.5">
                <div className="mt-1 h-5 w-5 shrink-0 rounded-full" style={{ background: 'var(--color-molten)', opacity: 0.7 }} />
                <div className="space-y-1.5">
                  <div className="rounded-lg px-3 py-2" style={{ background: 'var(--color-paper-3)' }}>
                    <span className="text-ink-2 text-[11px] leading-[1.5]">
                      We spend 4 hours a week copying leads from the form into our CRM. Can you automate that?
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 justify-end">
                <div className="space-y-1.5">
                  <div className="rounded-lg px-3 py-2" style={{ background: 'var(--color-ink)', color: 'var(--color-paper)' }}>
                    <span className="text-[11px] leading-[1.5]">
                      Yes. We will have a scope to you by Friday.
                    </span>
                  </div>
                </div>
                <div className="mt-1 h-5 w-5 shrink-0 rounded-full" style={{ background: 'var(--color-ink)', opacity: 0.15 }} />
              </div>
            </div>
          </div>

          {/* 02 — scope doc */}
          <div
            data-layer
            className="absolute inset-0 flex flex-col p-[clamp(16px,2.4vw,32px)] opacity-0"
            style={{ background: 'var(--color-paper)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-molten-deep font-mono text-[9px] tracking-[0.2em] uppercase font-medium">Scope</span>
              <span className="text-ink-3 font-mono text-[9px]">v1.0</span>
            </div>
            <div className="space-y-3 flex-1">
              <div className="h-2 rounded-full" style={{ background: 'var(--color-ink)', width: '55%' }} />
              <div className="h-1.5 rounded-full" style={{ background: 'var(--color-paper-3)', width: '90%' }} />
              <div className="h-1.5 rounded-full" style={{ background: 'var(--color-paper-3)', width: '72%' }} />
              <div className="h-px my-3" style={{ background: 'var(--color-rule)' }} />
              <div className="grid grid-cols-3 gap-2">
                {['In scope', 'Out of scope', 'Timeline'].map((label) => (
                  <div key={label} className="border-rule border rounded-sm p-2">
                    <span className="text-ink-3 font-mono text-[8px] tracking-[0.14em] uppercase">{label}</span>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-1 rounded-full" style={{ background: 'var(--color-paper-3)', width: '80%' }} />
                      <div className="h-1 rounded-full" style={{ background: 'var(--color-paper-3)', width: '60%' }} />
                      <div className="h-1 rounded-full" style={{ background: 'var(--color-paper-3)', width: '45%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-auto pt-3">
                <div className="h-7 rounded-sm flex items-center px-3" style={{ background: 'var(--color-molten)' }}>
                  <span className="font-mono text-[8px] tracking-[0.14em] uppercase" style={{ color: '#EFEDE8' }}>Approve</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'var(--color-paper-3)', width: '30%' }} />
              </div>
            </div>
          </div>

          {/* 03 — working build */}
          <div
            data-layer
            className="absolute inset-0 flex flex-col opacity-0"
            style={{ background: 'var(--color-paper)' }}
          >
            {/* toolbar */}
            <div className="flex items-center gap-2 px-[clamp(12px,2vw,20px)] h-8 border-b" style={{ borderColor: 'var(--color-rule)' }}>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="h-2 w-2 rounded-full" style={{ background: '#febc2e' }} />
                <span className="h-2 w-2 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="h-4 w-[40%] rounded-sm" style={{ background: 'var(--color-paper-2)' }} />
              </div>
            </div>
            {/* app content */}
            <div className="flex flex-1">
              {/* sidebar */}
              <div className="w-[22%] border-r p-2 space-y-1.5" style={{ borderColor: 'var(--color-rule)', background: 'var(--color-paper-2)' }}>
                {['Dashboard', 'Leads', 'Pipeline', 'Settings'].map((n, i) => (
                  <div
                    key={n}
                    className="rounded-sm px-2 py-1"
                    style={{ background: i === 1 ? 'var(--color-paper)' : 'transparent' }}
                  >
                    <span className={`font-mono text-[8px] ${i === 1 ? 'text-molten-deep font-medium' : 'text-ink-3'}`}>{n}</span>
                  </div>
                ))}
              </div>
              {/* main */}
              <div className="flex-1 p-[clamp(10px,1.6vw,18px)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-2 rounded-full" style={{ background: 'var(--color-ink)', width: '25%' }} />
                  <div className="h-5 w-5 rounded-full" style={{ background: 'var(--color-molten)', opacity: 0.8 }} />
                </div>
                <div className="space-y-1.5">
                  {[92, 78, 65, 50].map((w, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-sm p-1.5" style={{ background: i === 0 ? 'rgba(232,71,10,0.06)' : 'transparent' }}>
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? 'var(--color-molten)' : 'var(--color-rule)' }} />
                      <div className="h-1 rounded-full flex-1" style={{ background: 'var(--color-paper-3)', width: `${w}%` }} />
                      <div className="h-1 w-8 rounded-full" style={{ background: 'var(--color-paper-3)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 04 — shipped */}
          <div
            data-layer
            className="absolute inset-0 flex flex-col justify-center items-center opacity-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 30% 20%, rgba(255,94,26,0.18), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(43,79,208,0.12), transparent 60%), var(--color-ink)',
            }}
          >
            <span
              className="font-display leading-[0.9] font-extrabold tracking-[-0.04em]"
              style={{ fontSize: 'clamp(28px, 5vw, 64px)', color: 'var(--color-paper)' }}
            >
              Live.
            </span>
            <span className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(239,237,232,0.5)' }}>
              Repo · hosting · credentials · yours
            </span>
          </div>

          {/* stage label */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] uppercase backdrop-blur-sm rounded-sm"
            style={{
              background: step === 3 ? 'rgba(255,255,255,0.1)' : 'rgba(248,246,241,0.85)',
              color: step === 3 ? 'rgba(239,237,232,0.7)' : 'var(--color-ink-2)',
              border: step === 3 ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-rule)',
            }}
          >
            {STEPS[step].label}
          </span>
        </div>

        {/* ── steps list ── */}
        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px"
            style={{ background: 'var(--color-rule)' }}
          />
          {/*
            Progress fill. Scaled, not grown: animating `height` re-runs
            layout and paint on every frame of a 700ms tween that fires on
            every step change, and this rule is full-height already, so a
            transform does the identical thing on the compositor.
          */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px origin-top transition-transform duration-500 ease-[var(--ease-out-expo)]"
            style={{
              background: 'var(--color-molten)',
              transform: `scaleY(${(step + 1) / STEPS.length})`,
            }}
          />
          {STEPS.map((s, i) => {
            const on = i === step
            const done = i < step
            return (
              <li
                key={s.k}
                aria-current={on ? 'step' : undefined}
                className="relative pl-6 transition-opacity duration-300"
                style={{ opacity: on ? 1 : done ? 0.5 : 0.25 }}
              >
                {/* tick mark */}
                <span
                  aria-hidden="true"
                  className="absolute top-[0.85em] left-[-3px] h-[7px] w-[7px] rounded-full border-2 transition-[background-color,border-color] duration-300"
                  style={{
                    borderColor: on || done ? 'var(--color-molten)' : 'var(--color-rule)',
                    background: done ? 'var(--color-molten)' : 'var(--color-paper)',
                  }}
                />
                <div className="py-[clamp(12px,1.8vh,20px)]">
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[10px] tracking-[0.24em] uppercase transition-colors duration-300 ${
                        on ? 'text-molten-deep' : 'text-ink-3'
                      }`}
                    >
                      {s.k}
                    </span>
                    {/*
                      The duration sits on the step, always visible, not
                      inside the panel that only the active step opens. It is
                      the one fact here a visitor might be scanning for, and
                      burying it behind the current scroll position would mean
                      three of the four are unreadable at any moment.
                    */}
                    <span className="text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                      {s.when}
                    </span>
                  </span>
                  <h3 className="font-display mt-1 text-[clamp(18px,2.2vw,27px)] leading-[1.1] font-semibold tracking-[-0.02em]">
                    {s.t}
                  </h3>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
