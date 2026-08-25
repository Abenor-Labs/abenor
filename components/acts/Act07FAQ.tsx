'use client'

import { useState } from 'react'
import { ActSection } from '@/components/ui/ActSection'
import { MaskedText } from '@/components/ui/MaskedText'

/**
 * Act 07 — Questions.
 *
 * The cheapest section on the page to write and the densest to read, which
 * is why it earns its place after the receipts: by here the visitor has
 * decided they are interested and switched from being sold to to doing
 * diligence. Prose is the wrong shape for diligence. A list of the seven
 * things people actually ask, answered in two sentences each, is the right
 * one.
 *
 * Every answer is a fact already true elsewhere in the repository — the
 * handover terms from Act 05, the client count from Act 06, the stack from
 * the proof strip. Nothing here is a new claim, and the two questions with
 * uncomfortable answers (what it costs, how many clients) are answered
 * straight rather than skipped. A FAQ that only contains flattering
 * questions is read as marketing and stops being load-bearing.
 */
const QUESTIONS: [string, string][] = [
  [
    'Who actually writes the code?',
    'The person who answers your email is the person in the repository. There is no account manager in between, which is the whole reason a studio this size is worth hiring.',
  ],
  [
    'Who owns it when you are done?',
    'You do. Repository, hosting and credentials live in your accounts from day one, not ours, and the release process is written down for whoever comes after us.',
  ],
  [
    'How long does a first automation take?',
    'Eleven working days: two to scope it, five to build, three against your real data, one to hand over. The scope is written before any code, and it says what we are not building as well as what we are.',
  ],
  [
    'What does it cost?',
    'One workflow, two weeks, fixed fee, quoted in the reply once we know which workflow. We do not publish a number here because a number invented before the scope is a number we would have to walk back.',
  ],
  [
    'What happens after handover?',
    'A monthly retainer if you want us on call for changes and breakages. If you do not, the handover stands on its own — that is what the documentation is for.',
  ],
  [
    'How many clients have you had?',
    'Two, and both were built free to get started. The words on this page are theirs and the invoices never existed. Better you hear that from us than find it out later.',
  ],
  [
    'What do you build with?',
    'TypeScript, React, Next.js and Python, with n8n for workflow automation. Nothing here is a platform you would need us to keep paying for.',
  ],
]

export function Act07FAQ() {
  /* Single-open, and the id rather than an index so the state cannot silently
     point at the wrong row if the list is ever reordered. */
  const [open, setOpen] = useState<string | null>(null)

  return (
    <ActSection id="faq" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">05</b> ] Before you ask
          </span>
          <MaskedText
            as="h2"
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Seven <em className="text-molten not-italic">straight</em> answers
          </MaskedText>
        </div>

        <ul className="border-rule border-t">
          {QUESTIONS.map(([q, a]) => {
            const id = q.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')
            const on = open === id
            return (
              <li key={id} className="fadeup border-rule border-b">
                {/*
                  A real button with aria-expanded and aria-controls, not a
                  div with a click handler. This is the one component on the
                  page whose content is hidden by default, so it is also the
                  one where getting the semantics wrong actually removes
                  information from a screen reader rather than merely
                  annoying it.
                */}
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`faq-${id}`}
                  onClick={() => setOpen((cur) => (cur === id ? null : id))}
                  data-cursor={on ? 'Close' : 'Open'}
                  className="press group flex w-full items-start gap-5 py-[clamp(16px,2.2vw,24px)] text-left"
                >
                  <span className="font-display flex-1 text-[clamp(16px,2vw,24px)] leading-[1.25] font-semibold tracking-[-0.02em]">
                    {q}
                  </span>

                  {/*
                    A plus that becomes a minus: one bar rotates a quarter
                    turn onto the other. Two glyphs swapped would be a cut;
                    this is the same mark changing state, which is what the
                    panel underneath is also doing.
                  */}
                  <span
                    aria-hidden="true"
                    className="relative mt-[0.45em] h-[11px] w-[11px] shrink-0"
                  >
                    <span className="bg-ink absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
                    <span
                      className="bg-ink absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-transform duration-[var(--dur-ui)] ease-[var(--ease-out-expo)]"
                      style={{ transform: on ? 'translateX(-50%) rotate(90deg)' : undefined }}
                    />
                  </span>
                </button>

                <div id={`faq-${id}`} role="region" className="disclosure" data-open={on}>
                  <div>
                    <p className="text-ink-2 max-w-[62ch] pb-[clamp(16px,2.2vw,24px)] text-[13.5px] leading-[1.7]">
                      {a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </ActSection>
  )
}
