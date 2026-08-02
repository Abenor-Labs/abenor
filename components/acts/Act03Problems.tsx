'use client'

import { useState } from 'react'
import { ActSection } from '@/components/ui/ActSection'

const PROBLEMS = [
  {
    problem: 'Someone is re-typing the same record into a second system.',
    answer:
      'We map what actually moves between your tools, then wire it together with alerting on top; a broken sync tells you, instead of a customer telling you.',
  },
  {
    problem: 'Your site was built by three different people and none of them own it.',
    answer:
      'We take the whole thing: design, build, deploy, DNS. One repository, one team, one number to call when it goes down at 11pm.',
  },
  {
    problem: 'You need an app. You do not need a mobile team.',
    answer:
      'iOS and Android, built and taken through store review, then handed over with the release process written down so your next developer is not reverse-engineering it.',
  },
  {
    problem: 'It looked right in Figma and fell apart with real content.',
    answer:
      'We design the system, not the screenshot: type scale, spacing, loading states, empty states, error states, proven against your actual data before it ships.',
  },
  {
    problem: 'A spreadsheet is holding your company together.',
    answer:
      'We replace it with a real tool: a proper database, permissions, an audit trail, and something that keeps working after the person who built it leaves.',
  },
]

export function Act03Problems() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <ActSection id="problems" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
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

                <p
                  className="text-ink-2 max-w-[46ch] text-[13px] leading-[1.62] transition-all duration-500"
                  style={{
                    opacity: on ? 1 : 0.4,
                    transform: on ? 'translateY(0)' : 'translateY(4px)',
                  }}
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
