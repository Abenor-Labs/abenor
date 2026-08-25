import { ActSection } from '@/components/ui/ActSection'
import { MaskedText } from '@/components/ui/MaskedText'

/**
 * Act 03 — What we build.
 *
 * This used to be five problems, each with a paragraph of answer that only
 * settled into place on hover. Three things were wrong with it. The answers
 * were prose where the reader wanted a spec; the hover was the only way to
 * finish reading a sentence, which a phone cannot do; and the whole thing ran
 * to about four hundred words to convey five facts.
 *
 * It is now a table. Same five things, the deliverable in a column of its own
 * instead of buried in the tail of a sentence.
 *
 * Two columns, not three. A "what you get" column stood here briefly and was
 * cut: on a five-row table it turned out to be the outcome half of the same
 * sentence as "what we build", so every row said its one thing twice. If a
 * row's deliverable does not sell itself, sharpen that cell rather than adding
 * a column to explain it.
 *
 * The wording puts the fault on the tools and the credit on the reader: the
 * spreadsheet held, the tools were never introduced, nobody was given the job.
 * Owners identify with their business personally, so a list of what is broken
 * reads as a list of what they got wrong unless it is written this way. Same
 * diagnosis, no accusation. That constraint should survive edits.
 */
const ROWS: { problem: string; build: string }[] = [
  {
    problem: 'The same record gets typed into two systems that were never introduced.',
    build: 'A sync between them, with alerting.',
  },
  {
    problem: 'Your site passed through three people. Nobody owns it.',
    build: 'Design, build, deploy, DNS. One repository.',
  },
  {
    problem: 'You need an app. You do not need a mobile team.',
    build: 'iOS and Android, through store review.',
  },
  {
    problem: 'It looked right in Figma and fell apart with real content.',
    build: 'The system, not the screenshot: spacing, loading, empty and error states.',
  },
  {
    problem: 'A spreadsheet is holding your company together. It has, so far.',
    build: 'A real tool: database, permissions, audit trail.',
  },
]

const COLS = ['The problem', 'What we build']

export function Act03Problems() {
  return (
    <ActSection id="problems" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">01</b> ] Five of these
          </span>
          <MaskedText
            as="h2"
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Problems we <em className="text-molten not-italic">fix</em>
          </MaskedText>
        </div>

        {/*
          Column headings exist only where there are columns. Below md the
          rows stack and each cell carries its own label instead — a header
          row three screens above the cell it describes is not a header.
        */}
        <div
          aria-hidden="true"
          className="border-rule text-ink-3 hidden grid-cols-[1.15fr_1fr] gap-x-10 border-b pb-3 font-mono text-[10px] tracking-[0.22em] uppercase md:grid"
        >
          {COLS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        <ul>
          {ROWS.map((r) => (
            <li
              key={r.problem}
              data-cursor="Read"
              className="fadeup border-rule group relative grid grid-cols-1 gap-y-3 border-b py-[clamp(20px,2.6vw,32px)] md:grid-cols-[1.15fr_1fr] md:items-start md:gap-x-10"
            >
              {/*
                The row you are pointing at lifts off the paper. Purpose is
                state indication on a five-row table where the cells line up
                horizontally and the eye loses the row — not decoration.

                220ms rather than the 500ms this had before: a pointer moving
                down a list crosses rows faster than that, and a wash still
                arriving after the pointer has left reads as lag.

                No hover gate written here on purpose. Tailwind v4 already
                emits `hover:` variants inside `@media (hover: hover)`, so a
                tap on a touch screen never fires this — and an arbitrary
                variant spelling the query out by hand does not survive the
                CSS minifier, which drops the `and (pointer: fine)` half and
                leaves a query that only looks stricter.
              */}
              <span
                aria-hidden="true"
                className="bg-paper-2 pointer-events-none absolute inset-x-[calc(var(--gut)*-1)] inset-y-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[var(--dur-ui)] ease-[var(--ease-out-expo)] group-hover:origin-top group-hover:scale-y-100"
              />

              <h3
                className="font-display leading-[1.15] font-semibold tracking-[-0.025em]"
                style={{ fontSize: 'clamp(17px, 2.1vw, 26px)' }}
              >
                {r.problem}
              </h3>

              <p className="text-ink-2 max-w-[46ch] text-[13.5px] leading-[1.6]">
                <span className="text-ink-3 mb-1 block font-mono text-[9.5px] tracking-[0.22em] uppercase md:hidden">
                  {COLS[1]}
                </span>
                {r.build}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </ActSection>
  )
}
