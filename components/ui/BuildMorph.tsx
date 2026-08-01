'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/scroll/gsap'
import { prefersReducedMotion } from '@/lib/scroll/progress'

/**
 * The four steps, and the artefact that exists after each one.
 *
 * Previously this section carried two different four-item lists — the frame
 * morphed through Wireframe/Design/Built/Live while cards underneath listed
 * Call/Scope/Build/Handover — under a heading promising one sequence. Now
 * there is a single set of four: the copy says what happens, the frame beside
 * it shows what you are holding when it does.
 */
const STEPS = [
  {
    k: '01',
    t: 'A call',
    d: 'Thirty minutes. You describe what is broken. We say whether we can help, and if we cannot, who might.',
    artefact: 'Nothing built yet',
  },
  {
    k: '02',
    t: 'A written scope',
    d: 'What we will build, what we will not, and a number — before anyone writes code. If the number and your budget are not in the same room, you find out here.',
    artefact: 'A plan you can price',
  },
  {
    k: '03',
    t: 'Weekly working software',
    d: 'Not status updates. Something you can open and click, every week, from the first one.',
    artefact: 'Something you can click',
  },
  {
    k: '04',
    t: 'Keys handed over',
    d: 'Repository, hosting and credentials in your accounts, with documentation written for the developer who comes after us.',
    artefact: 'Live, and yours',
  },
]

export function BuildMorph() {
  const root = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const layers = el.querySelectorAll('[data-layer]')

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
    <div ref={root} className="relative min-h-[150vh]">
      <div className="sticky top-[14vh] grid items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-[1.15fr_1fr]">
        {/* ── the artefact ── */}
        <div
          aria-hidden="true"
          className="border-rule bg-paper raised-lg relative aspect-[16/10] w-full overflow-hidden border"
        >
          {/* 01 — a call: nothing built */}
          <div data-layer className="absolute inset-0 grid place-items-center">
            <span className="text-ink-3 font-mono text-[10px] tracking-[0.24em] uppercase">
              Nothing built yet
            </span>
          </div>

          {/* 02 — scope: wireframe */}
          <div
            data-layer
            className="bg-paper absolute inset-0 flex flex-col gap-3 p-[clamp(12px,2vw,24px)] opacity-0"
          >
            <div className="flex h-[clamp(20px,3vw,32px)] items-center gap-2">
              <div className="bg-rule h-full w-[22%] rounded-sm" />
              <div className="bg-rule h-full flex-1 rounded-sm" />
              <div className="bg-rule h-full w-[12%] rounded-sm" />
            </div>
            <div className="bg-rule h-[26%] rounded-sm" />
            <div className="flex flex-1 gap-3">
              <div className="bg-rule flex-1 rounded-sm" />
              <div className="bg-rule flex-1 rounded-sm" />
              <div className="bg-rule flex-1 rounded-sm" />
            </div>
          </div>

          {/* 03 — weekly software: built */}
          <div
            data-layer
            className="bg-paper absolute inset-0 flex flex-col gap-3 p-[clamp(12px,2vw,24px)] opacity-0"
          >
            <div className="flex h-[clamp(20px,3vw,32px)] items-center gap-2">
              <div className="bg-paper-3 h-full w-[22%] rounded-sm" />
              <div className="bg-paper-2 h-full flex-1 rounded-sm" />
              <div className="bg-molten h-full w-[12%] rounded-sm" />
            </div>
            <div className="from-molten/40 to-molten/10 h-[26%] rounded-sm bg-gradient-to-br" />
            <div className="flex flex-1 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="border-rule bg-paper-2 flex flex-1 flex-col gap-2 rounded-sm border p-[clamp(8px,1.2vw,14px)]"
                >
                  <div className="bg-molten h-2.5 w-[44%] rounded-full" />
                  <div className="bg-rule-2 h-1.5 w-[78%] rounded-full" />
                  <div className="bg-rule-2 h-1.5 w-[56%] rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* 04 — keys: live */}
          <div
            data-layer
            className="absolute inset-0 flex flex-col justify-end p-[clamp(16px,2.6vw,34px)] opacity-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 18% 8%, rgba(255,94,26,0.26), transparent 60%), radial-gradient(ellipse 60% 80% at 86% 92%, rgba(91,123,255,0.18), transparent 60%), var(--color-paper-2)',
            }}
          >
            <span
              className="font-display leading-[0.9] font-extrabold tracking-[-0.04em]"
              style={{ fontSize: 'clamp(24px, 4vw, 54px)' }}
            >
              Shipped.
            </span>
            <span className="text-ink-2 mt-2 font-mono text-[10px] tracking-[0.2em] uppercase">
              Repo · hosting · credentials — in your accounts
            </span>
          </div>

          {/* running label for the current artefact */}
          <span className="border-rule bg-paper/85 text-ink-2 absolute top-3 left-3 border px-2.5 py-1.5 font-mono text-[9px] tracking-[0.2em] uppercase backdrop-blur-[2px]">
            {STEPS[step].artefact}
          </span>
        </div>

        {/* ── the four steps ── */}
        <ol className="relative">
          <span aria-hidden="true" className="bg-rule absolute top-0 bottom-0 left-0 w-px" />
          {STEPS.map((s, i) => {
            const on = i === step
            const done = i < step
            return (
              <li
                key={s.k}
                aria-current={on ? 'step' : undefined}
                className="relative pl-6 transition-opacity duration-500"
                style={{ opacity: on ? 1 : done ? 0.55 : 0.3 }}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[0.7em] left-0 h-px transition-all duration-500 ${
                    on ? 'bg-molten w-4' : 'bg-rule-2 w-2.5'
                  }`}
                />
                <div className="py-[clamp(10px,1.6vh,18px)]">
                  <span
                    className={`font-mono text-[10px] tracking-[0.24em] uppercase transition-colors duration-500 ${
                      on ? 'text-molten' : 'text-ink-3'
                    }`}
                  >
                    {s.k}
                  </span>
                  <h3 className="font-display mt-1 text-[clamp(18px,2.2vw,27px)] leading-[1.1] font-semibold tracking-[-0.02em]">
                    {s.t}
                  </h3>
                  <p
                    className="text-ink-2 overflow-hidden text-[13px] leading-[1.6] transition-all duration-500"
                    style={{
                      maxHeight: on ? '9rem' : '0rem',
                      opacity: on ? 1 : 0,
                      marginTop: on ? '0.5rem' : '0rem',
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
