import { ActSection } from '@/components/ui/ActSection'
import { FlowGraph, FlowList } from '@/components/ui/FlowGraph'
import { PhonePanel } from '@/components/ui/PhonePanel'
import { MaskedText } from '@/components/ui/MaskedText'
import { Counter } from '@/components/ui/Counter'

const CHANGES: [string, string][] = [
  ['Lead lands in a form', 'and never gets typed into the CRM again'],
  ['Invoice is paid', 'and the ops sheet, the CRM and the channel all know'],
  ['A sync fails at 3am', 'and you are told before the customer notices'],
  ['Someone leaves', 'and the process survives them, because it was never in their head'],
]

/**
 * Act 04 — Automation.
 *
 * The lead offer, and the cheapest thing for a stranger to test us on.
 * The graph shows what gets built; the phone shows what it looks like once it
 * is running — which doubles as the only place on the page that demonstrates
 * the mobile work rather than claiming it.
 */
export function Act04Automation() {
  return (
    <ActSection id="automation" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">02</b> ] Start here
          </span>
          <MaskedText
            as="h2"
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            The <em className="text-molten not-italic">cheapest</em> way to test us
          </MaskedText>
        </div>

        <div className="flex flex-col gap-[clamp(28px,5vw,72px)] lg:flex-row lg:items-start">
          <div className="flex-1">
            <p className="fadeup text-ink max-w-[46ch] text-[15px] leading-[1.72]">
              Automation proves fastest. No design phase, no taste argument. Either the thing that
              ate your Tuesdays runs by itself now, or it does not.
            </p>

            {/*
              Stated as what is already being lost, not as what could be
              gained. The same quantity moves people roughly twice as hard
              when it is framed as a loss, and this one is a loss either way:
              the hours are being spent right now, by someone, on re-typing.

              Set as a figure rather than as words ("two hundred") so it can
              count. The climb is the argument: the point of the sentence is
              that the number is bigger than it feels, and a number that takes
              a beat to arrive at 200 makes that case better than the printed
              glyphs do.
            */}
            <div className="fadeup border-rule mt-6 max-w-[46ch] border-y py-5">
              <p
                className="font-display text-ink leading-[1.15] font-semibold tracking-[-0.03em]"
                style={{ fontSize: 'clamp(21px, 2.9vw, 33px)' }}
              >
                Four hours a week is{' '}
                <span className="text-molten-deep">
                  <Counter to={200} /> hours a year
                </span>
                .
              </p>
              <p className="text-ink-2 mt-2 text-[13px] leading-[1.6]">
                A month of someone&rsquo;s working life, spent re-typing.
              </p>
            </div>

            {/*
              No number, deliberately, until there is a real one to publish.
              An invented price is worse than none — it gets quoted back at
              you. But silence about cost is its own tax: unknown price reads
              as "expensive" or "they are hiding it", so the shape of the deal
              is stated even while the figure is not. Scope and timebox let a
              buyer self-qualify on commitment instead of on rupees.

              Replace this with the figure the moment one exists. A number
              here converts harder than any sentence on the page.
            */}
            <dl className="fadeup border-rule mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-y py-5">
              <dt className="text-ink-3 font-mono text-[10.5px] tracking-[0.22em] uppercase">
                First automation
              </dt>
              <dd className="font-display text-ink text-[clamp(15px,1.9vw,21px)] leading-[1.3] font-semibold tracking-[-0.02em]">
                One workflow · two weeks · fixed fee
              </dd>
              {/*
                The timebox, itemised. "Two weeks" is a promise; eleven days
                split four ways is a plan, and a buyer can tell the difference
                — the second one can be checked against, which is exactly why
                it is worth publishing and the round number is not.
              */}
              <dd className="border-rule text-ink-2 w-full border-t pt-3 font-mono text-[10.5px] leading-[2] tracking-[0.16em] uppercase">
                <b className="text-ink font-medium">2</b> scope ·{' '}
                <b className="text-ink font-medium">5</b> build ·{' '}
                <b className="text-ink font-medium">3</b> test on your data ·{' '}
                <b className="text-ink font-medium">1</b> handover
              </dd>
              <dd className="text-ink-2 w-full text-[13px] leading-[1.6]">
                Quoted in the reply. Asking costs nothing.
              </dd>
            </dl>

            <ul className="fadeup border-rule mt-8 border-t">
              {CHANGES.map(([a, b]) => (
                <li key={a} className="border-rule border-b py-[clamp(14px,2vw,20px)]">
                  <span className="font-display block text-[clamp(15px,1.8vw,20px)] leading-[1.2] font-semibold tracking-[-0.02em]">
                    {a}
                  </span>
                  <span className="text-ink-2 mt-1 block text-[13px] leading-[1.6]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <PhonePanel />
            {/*
              The graph below already says "roughly as we would build it" and
              is read as a sketch because of it. The phone had no such line,
              so its invented build list and run history read as a live feed —
              a page that admits further down to two free projects cannot also
              imply six running ones.
            */}
            <p className="text-ink-3 max-w-[30ch] text-center font-mono text-[10px] tracking-[0.18em] uppercase lg:text-left">
              Illustrative. A tool of the kind we build.
            </p>
          </div>
        </div>

        <div className="mt-[clamp(32px,5vw,64px)]">
          {/*
            Two renderings of one flow, split at md. The graph needs room for
            seven nodes laid out fractionally across its width; a phone does
            not have it, and the drag invitation is nonsense once they stack.
            Small screens get the steps as a list instead — same array, same
            story, no toy.
          */}
          <div className="hidden md:block">
            <FlowGraph />
            <div className="mt-3 flex flex-wrap justify-between gap-4">
              <p className="text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                Drag any node. Traffic re-routes live.
              </p>
              <p className="text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                Enquiry to CRM, roughly as we build it
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <p className="text-ink-3 mb-4 font-mono text-[10px] tracking-[0.18em] uppercase">
              Enquiry to CRM, roughly as we build it
            </p>
            <FlowList />
          </div>
        </div>
      </div>
    </ActSection>
  )
}
