'use client'

import { useState } from 'react'
import { ActSection } from '@/components/ui/ActSection'

/**
 * The wording here is doing something specific and it should survive edits.
 *
 * Owners identify with their business personally, so a list of what is broken
 * reads as a list of what they got wrong, and the reflex is to defend rather
 * than enquire. Every line is therefore written to put the fault on the tools
 * and the credit on the reader: the spreadsheet held, the tools never talked,
 * nobody was given the job. Same diagnosis, no accusation.
 */
const PROBLEMS = [
  {
    problem: 'The same record gets typed into two systems that were never introduced.',
    answer: 'We wire them together, with alerting. A broken sync tells you before a customer does.',
  },
  {
    problem: 'Your site passed through three people. Nobody owns it.',
    answer:
      'We take all of it: design, build, deploy, DNS. One repository, one team, one number at 11pm.',
  },
  {
    problem: 'You need an app. You do not need a mobile team.',
    answer:
      'iOS and Android, through store review, handed over with the release process written down.',
  },
  {
    problem: 'It looked right in Figma and fell apart with real content.',
    answer:
      'We design the system, not the screenshot: spacing, loading, empty and error states, proven against your real data.',
  },
  {
    problem: 'A spreadsheet is holding your company together. It has, so far.',
    answer:
      'We replace it with a real tool: database, permissions, audit trail. It keeps working after its author leaves.',
  },
]

export function Act03Problems() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <ActSection id="problems" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">01</b> ] Sound familiar
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Five problems we <em className="text-molten not-italic">fix</em>
          </h2>
        </div>

        <ul>
          {PROBLEMS.map((p, i) => {
            const on = active === i
            return (
              <li
                key={i}
                data-cursor="Read"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive((cur) => (cur === i ? null : cur))}
                className="fadeup border-rule group relative grid grid-cols-[1fr] items-start gap-y-2 border-b py-[clamp(22px,3vw,40px)] md:grid-cols-[1.15fr_1fr] md:items-center md:gap-x-8"
              >
                {/* wash */}
                <span
                  aria-hidden="true"
                  className="bg-paper-2 absolute inset-x-[calc(var(--gut)*-1)] inset-y-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 group-hover:origin-top group-hover:scale-y-100"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />

                <h3
                  data-t={p.problem}
                  className="split-h font-display leading-[1.08] font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2"
                  style={{ fontSize: 'clamp(19px, 2.6vw, 34px)' }}
                >
                  {p.problem}
                </h3>

                {/*
                  The answers used to rest at opacity 0.4 and only come up on
                  pointerenter. Two problems with that: touch devices never
                  fire it, so half the copy on this page was permanently
                  invisible on a phone; and 0.4 of ink-2 on paper is 1.5:1,
                  which is not "de-emphasised", it is unreadable everywhere.

                  The reveal is now motion, not contrast — the text is always
                  legible, and hover only settles it into place.
                */}
                <p
                  className="text-ink-2 max-w-[46ch] text-[13px] leading-[1.62] transition-transform duration-500"
                  style={{ transform: on ? 'translateY(0)' : 'translateY(4px)' }}
                >
                  {p.answer}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </ActSection>
  )
}
