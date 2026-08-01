'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/scroll/gsap'
import { prefersReducedMotion } from '@/lib/scroll/progress'

const STAGES = ['Wireframe', 'Design', 'Built', 'Live']

/**
 * The same page, resolving from grey boxes to a shipped screen.
 *
 * The frame is pinned with position:sticky and the tall wrapper around it
 * supplies the scroll distance, so the visitor stays with one artefact while
 * four stages advance under their thumb. Sticky rather than ScrollTrigger's
 * pin: it needs no spacer element, cannot desync from Lenis, and degrades to
 * a normal block if anything above it fails.
 */
export function BuildMorph() {
  const root = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const layers = el.querySelectorAll('[data-layer]')

    if (prefersReducedMotion()) {
      gsap.set(layers, { opacity: 1 })
      setStage(STAGES.length - 1)
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => setStage(Math.min(3, Math.floor(self.progress * 4.2))),
      },
    })

    // each layer fades in over its quarter, with a beat of hold at the end
    tl.to(layers[1], { opacity: 1, duration: 1 }, 0.35)
      .to(layers[2], { opacity: 1, duration: 1 }, 1.5)
      .to(layers[3], { opacity: 1, duration: 1 }, 2.65)
      .to({}, { duration: 0.6 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div ref={root} className="relative min-h-[165vh]">
      <div className="sticky top-[14vh]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
          <div
            aria-hidden="true"
            className="border-rule bg-paper raised-lg relative h-[52vh] w-full max-w-[calc(52vh*1.6)] overflow-hidden border md:mx-0"
          >
            {/* 01 wireframe */}
            <div data-layer className="absolute inset-0 flex flex-col gap-3 p-[clamp(12px,2vw,24px)]">
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

            {/* 02 design */}
            <div
              data-layer
              className="bg-paper absolute inset-0 flex flex-col gap-3 p-[clamp(12px,2vw,24px)] opacity-0"
            >
              <div className="flex h-[clamp(20px,3vw,32px)] items-center gap-2">
                <div className="bg-paper-3 h-full w-[22%] rounded-sm" />
                <div className="bg-paper-2 h-full flex-1 rounded-sm" />
                <div className="bg-molten/60 h-full w-[12%] rounded-sm" />
              </div>
              <div className="from-molten/45 to-molten/10 h-[26%] rounded-sm bg-gradient-to-br" />
              <div className="flex flex-1 gap-3">
                <div className="border-rule bg-paper-2 flex-1 rounded-sm border" />
                <div className="border-rule bg-paper-2 flex-1 rounded-sm border" />
                <div className="border-rule bg-paper-2 flex-1 rounded-sm border" />
              </div>
            </div>

            {/* 03 built */}
            <div
              data-layer
              className="bg-paper absolute inset-0 flex flex-col gap-3 p-[clamp(12px,2vw,24px)] opacity-0"
            >
              <div className="flex h-[clamp(20px,3vw,32px)] items-center gap-2">
                <div className="bg-paper-3 h-full w-[22%] rounded-sm" />
                <div className="bg-paper-2 h-full flex-1 rounded-sm" />
                <div className="bg-molten h-full w-[12%] rounded-sm" />
              </div>
              <div className="from-molten/45 to-molten/10 h-[26%] rounded-sm bg-gradient-to-br" />
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

            {/* 04 live */}
            <div
              data-layer
              className="absolute inset-0 flex flex-col justify-end p-[clamp(14px,2.4vw,30px)] opacity-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 80% at 18% 8%, rgba(255,77,15,0.22), transparent 60%), radial-gradient(ellipse 60% 80% at 86% 92%, rgba(27,59,255,0.16), transparent 60%), var(--color-paper-2)',
              }}
            >
              <span
                className="font-display leading-[0.9] font-extrabold tracking-[-0.04em]"
                style={{ fontSize: 'clamp(22px, 4.2vw, 56px)' }}
              >
                Shipped.
              </span>
              <span className="text-ink-2 mt-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                Deployed · monitored · keys handed over
              </span>
            </div>
          </div>

          <ol className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-3">
            {STAGES.map((s, i) => (
              <li
                key={s}
                aria-current={i === stage ? 'step' : undefined}
                className={`font-mono text-[10.5px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  i === stage ? 'text-molten' : i < stage ? 'text-ink-2' : 'text-ink-3'
                }`}
              >
                0{i + 1} — {s}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-ink-3 mt-4 font-mono text-[10px] tracking-[0.18em] uppercase">
          Keep scrolling — the same page, from grey boxes to shipped
        </p>
      </div>
    </div>
  )
}
