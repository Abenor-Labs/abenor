'use client'

import { useState } from 'react'
import { SectionHead } from './primitives'

const QA = [
  {
    q: 'Two shipped projects and neither was paid. Why would I trust you?',
    a: 'Because you just read that in our own writing, before we knew you were looking. Ask for the walkthrough of either project on the call. We would rather show unfinished honesty than polished fiction.',
  },
  {
    q: 'What does it cost?',
    a: 'One workflow, two weeks, a fixed fee agreed before anything starts. The number depends on the task, so it gets named on the call instead of hidden until the invoice.',
  },
  {
    q: 'What if it turns out not to be worth automating?',
    a: 'Then the first call ends with that answer and you have lost fifteen minutes. We would rather be useful than busy.',
  },
  {
    q: 'Who owns what gets built?',
    a: 'You do. Source code, repository, credentials, documentation. Handover is part of the fee, not an upsell.',
  },
  {
    q: 'What happens when it breaks at 11pm?',
    a: 'Automation runs without supervision, which is the point of building it. When something does need hands, you email a person who knows the system, not a ticket queue.',
  },
]

export function Answers() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="answers" className="pt-32 sm:pt-44">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            align="left"
            eyebrow="Straight answers"
            title={
              <>
                Asked before
                <br />
                <em className="italic">you ask.</em>
              </>
            }
          />
        </div>

        <ul className="reveal border-t border-rule">
          {QA.map((item, i) => {
            const on = open === i
            return (
              <li key={item.q} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`answer-${i}`}
                    id={`question-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-[clamp(22px,2.2vw,27px)] leading-[1.2] tracking-[-0.01em] text-ink">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative mt-2 grid size-7 shrink-0 place-items-center rounded-full bg-paper-2"
                    >
                      <span className="absolute h-px w-3 bg-ink" />
                      <span
                        className={`absolute h-3 w-px bg-ink transition-transform duration-200 ease-[var(--ease-ui)] ${
                          on ? 'scale-y-0' : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`answer-${i}`}
                  role="region"
                  aria-labelledby={`question-${i}`}
                  className="disclosure"
                  data-open={on}
                >
                  <div>
                    <p className="max-w-[40rem] pb-7 text-[16px] leading-[1.7] text-ink-2">{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
