import Image from 'next/image'
import hazyPeaks from '@/public/photos/hazy-peaks.jpg'
import { SectionHead } from './primitives'

const STEPS = [
  { when: 'Day 0', title: 'Pick the thing', body: 'You show us the task. We tell you honestly whether software should touch it. Sometimes the answer is no.' },
  { when: 'Week 1', title: 'Watch it build', body: 'One workflow, built against your real data and your real tools. You see it working as it takes shape.' },
  { when: 'Week 2', title: 'Let it run', body: 'The task hands itself over to software. Nobody gets trained, because there is nothing to learn.' },
  { when: 'Handover', title: 'Own everything', body: 'If we disappeared tomorrow, nothing breaks.' },
]

const OWNED = ['Source code', 'Repository', 'Credentials', 'Documentation']

export function Process() {
  return (
    <section id="process" className="pt-32 sm:pt-44">
      <div className="wrap">
        <SectionHead
          eyebrow="How it goes"
          title={
            <>
              One workflow. Two weeks.
              {' '}<br className="hidden sm:block" />
              <em className="italic">A fixed fee.</em>
            </>
          }
          lede="No retainer. No discovery phase that discovers nothing. The whole engagement fits on one card."
        />
      </div>

      <div className="mx-auto mt-16 max-w-[1280px] px-3 sm:mt-20 sm:px-6">
        <div
          data-stage
          className="photo-edge relative isolate overflow-hidden rounded-[24px] px-4 py-12 sm:rounded-[28px] sm:px-10 sm:py-20"
        >
          <Image
            src={hazyPeaks}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="-z-10 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/5 to-black/30" />

          <div className="mx-auto grid max-w-[920px] items-start gap-4 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <ol className="stage-in float-dark rounded-[22px] bg-[#111110]/92 p-6 text-white backdrop-blur-md sm:p-7" style={{ ['--i' as string]: 0 }}>
              {STEPS.map((s, i) => (
                <li key={s.when} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span aria-hidden="true" className="absolute top-6 bottom-0 left-[5px] w-px bg-white/15" />
                  )}
                  <span
                    aria-hidden="true"
                    className={`mt-[7px] size-[11px] shrink-0 rounded-full border ${
                      i === 0 ? 'border-ember-bright bg-ember-bright' : 'border-white/40 bg-[#111110]'
                    }`}
                  />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">{s.when}</p>
                    <h3 className="mt-1 text-[17px] font-medium">{s.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.6] text-white/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="stage-in float rounded-[22px] bg-white p-6 md:mt-16" style={{ ['--i' as string]: 1 }}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">Yours at handover</p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {OWNED.map((o) => (
                  <li key={o} className="flex items-center gap-3 rounded-[12px] bg-paper px-3 py-2.5 text-[14px] text-ink">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 text-live" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-dashed border-rule pt-4 text-[13.5px] leading-[1.55] text-ink-2">
                Handover is part of the fee, not an upsell.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
