'use client'

import { useState } from 'react'
import { ActSection } from '@/components/ui/ActSection'
import { MaskedText } from '@/components/ui/MaskedText'

/**
 * Act 07 — Questions.
 *
 * Five things a buyer is anxious about, answered in a sentence each.
 *
 * The first draft had seven, and three of them were not questions. "Who
 * actually writes the code", "how many clients have you had", "what do you
 * build with" — nobody says those out loud to a supplier. They were things we
 * wanted to say, wearing a question mark, which is the same bluff as a
 * paragraph of self-description and harder to spot. If a proposed question is
 * one the studio is pleased to be asked, it is probably one of these.
 *
 * What replaced them are the objections a stranger actually has, including
 * the one the page creates for itself: Act 02 says the person who answers is
 * the person writing the code, which immediately raises "so what happens when
 * he is gone". Answering that in the same breath as ownership turns the
 * weakest structural fact about a studio this size into the strongest answer
 * here.
 *
 * Two rules for editing this list. Each answer is one sentence, because the
 * second sentence is always where the reassurance starts and the fact stops.
 * And the uncomfortable ones stay: a FAQ that ducks price is read as a price
 * list somebody removed.
 */
const QUESTIONS: [string, string][] = [
  [
    'What does it cost?',
    'One workflow, two weeks, a fixed fee quoted in the reply, and if it does not run you do not pay.',
  ],
  [
    'How long does it take?',
    'Eleven working days: two to scope it in writing, five to build, three against your real data, one to hand over.',
  ],
  [
    'Do we have to change the tools we already use?',
    'No, we wire together the ones you have, and tell you when one of them is the actual problem.',
  ],
  [
    'What if you disappear?',
    'Repository, hosting and credentials sit in your accounts from day one, documented for whoever comes next, and a monthly retainer keeps us on call if you want one.',
  ],
  [
    /*
      The one answer on this page authored rather than sourced. Everything
      else restates a fact that already existed in the codebase; this takes a
      position on a competitor, and it should be read and approved rather than
      inherited.
    */
    'Can I not just do this with Zapier?',
    'Often you can, and for one simple trigger you should, so we are worth paying only when it breaks at 3am and nobody wrote down why it was built that way.',
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
            Five <em className="text-molten not-italic">straight</em> answers
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
