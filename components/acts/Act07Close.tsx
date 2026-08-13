import { ActSection } from '@/components/ui/ActSection'
import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello.abenor@gmail.com'
const CALENDLY = 'https://calendly.com/hello-abenor/30min'

export function Act07Close() {
  return (
    /*
      The one inverted surface on the page.

      Twelve thousand pixels of paper arrive here and the ground drops out.
      DESIGN.md's Heat Rule carves exactly this exception: a deliberate
      inversion where ink floods and the accent stops being a tint and starts
      being light. It is spent here, at the close, because this is the only
      screen where the visitor has read the process, seen the receipts, and
      been offered a "not worth it" answer. Boldness anywhere earlier would be
      decoration; here it is the page raising its voice for the ask.

      The fixed nav and status bar invert with it via `data-surface`, set by
      Nav from the active act.
    */
    <ActSection
      id="close"
      align="center"
      className="bg-ink text-paper pb-[clamp(40px,7vw,90px)]"
    >
      <div className="wrap">
        {/* accent line: the vertical mark that opens the section */}
        <div
          aria-hidden="true"
          className="mx-auto mb-7 h-14 w-px"
          style={{ background: 'var(--color-molten)', opacity: 0.75 }}
        />

        <div className="mx-auto max-w-[680px] text-center">
          <span className="fadeup font-mono text-[10.5px] tracking-[0.24em] text-[rgba(248,246,241,0.5)] uppercase">
            Taking work now
          </span>

          {/*
            Bigger than every other act heading on purpose. Six sections have
            now opened at clamp(28px, 5.4vw, 72px); arriving at the ask in the
            same size says the ask is one more section. DESIGN.md's Wide-Gap
            Rule applies between sections, not only within them.
          */}
          <h2
            className="fadeup font-display mx-auto mt-4 max-w-[14ch] leading-[0.94] font-extrabold tracking-[-0.045em]"
            style={{ fontSize: 'clamp(34px, 6.4vw, 92px)' }}
          >
            Bring us one thing that <em className="text-molten not-italic">wastes an afternoon</em>.
          </h2>

          <p className="fadeup mx-auto mt-6 max-w-[48ch] text-[15px] leading-[1.72] text-[rgba(248,246,241,0.72)]">
            Thirty minutes. You describe one job somebody does by hand every week, we say whether it
            can be automated and what it would take.
          </p>

          {/*
            This was the last clause of the paragraph above, set at 15px in
            secondary ink. It is the only sentence on the page that a studio
            chasing the work would not write, which makes it the one worth
            setting like a headline.
          */}
          {/*
            The accent inverts with the surface. molten-deep is the small-text
            accent ON PAPER (4.98:1); on ink it drops to roughly 1.9:1 and
            disappears. molten reads 4.66:1 here, which clears the large-text
            bar, so the floor moves 18px to 19px to keep this unambiguously
            large text at 600 weight.
          */}
          <p
            className="fadeup font-display mx-auto mt-7 max-w-[24ch] border-y border-[rgba(248,246,241,0.18)] py-5 leading-[1.3] font-semibold tracking-[-0.02em]"
            style={{ fontSize: 'clamp(19px, 2.4vw, 26px)' }}
          >
            And if the honest answer is{' '}
            <em className="text-molten not-italic">not worth it</em>, we will say so.
          </p>

          {/*
            The call is the primary ask HERE and only here.

            A booked call is a bigger commitment than an email, and the page
            spends five acts earning it: this is the one place a visitor has
            read the process, seen the receipts, and been told we will say "not
            worth it" if it is. The two mid-page CTAs stay on email precisely
            because a visitor mid-scroll has not earned that yet. Warm up
            cheap, close on the call.
          */}
          <div className="fadeup mt-8">
            <Magnetic>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="Book"
                className="bg-molten-deep raised inline-flex items-center gap-3 px-10 py-[20px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                /* The paper glow is a black-based shadow and vanishes on ink.
                   On this surface the lift has to be made of the accent
                   itself, which is what "the accent becomes light" means. */
                style={{
                  color: '#FFF7F2',
                  boxShadow:
                    '0 0 0 1px rgba(232,71,10,0.4), 0 10px 32px -6px rgba(232,71,10,0.5), 0 28px 80px -24px rgba(232,71,10,0.35)',
                }}
              >
                Book 30 minutes <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>

          {/*
            Email stays reachable, as a link rather than a button. Someone who
            will not put a slot in a calendar is not lost, they are just
            earlier, and the cheap ask is what catches them.
          */}
          <p className="fadeup mt-6">
            <a
              href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
              data-cursor="Send"
              className="inline-flex min-h-11 items-center gap-2 border-b border-[rgba(248,246,241,0.25)] pb-1 font-mono text-[11px] tracking-[0.18em] text-[rgba(248,246,241,0.72)] uppercase transition-colors duration-300 hover:border-[var(--color-paper)] hover:text-[var(--color-paper)]"
            >
              Or email {CONTACT} <span aria-hidden="true">→</span>
            </a>
          </p>

          {/*
            Act 02 promises "the person who answers is the same person writing
            the code", and until now the page made that claim and then showed
            nobody. A name is the cheapest way to cash it.
          */}
          <p className="fadeup mt-10 font-mono text-[10.5px] tracking-[0.2em] text-[rgba(248,246,241,0.5)] uppercase">
            <b className="text-paper font-medium">Mahamad Suhail</b>, who takes the call
          </p>
        </div>
      </div>

      <footer className="wrap mt-[clamp(40px,6vw,80px)]">
        {/* justify-between with three items and one wrap always widows the
            third onto its own line; centre until there is room for the row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[rgba(248,246,241,0.16)] pt-6 text-center font-mono text-[10.5px] tracking-[0.22em] text-[rgba(248,246,241,0.5)] uppercase sm:justify-between sm:gap-4 sm:text-left">
          <span>Abenor</span>
          <span>Software studio · started 2026</span>
          <span>© 2026</span>
        </div>
      </footer>
    </ActSection>
  )
}
