import { ActSection } from '@/components/ui/ActSection'
import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello.abenor@gmail.com'
const CALENDLY = 'https://calendly.com/hello-abenor/30min'

export function Act07Close() {
  return (
    <ActSection id="close" align="center" className="pb-[clamp(40px,7vw,90px)]">
      <div className="wrap">
        {/* accent line — vertical mark above the section */}
        <div
          aria-hidden="true"
          className="mx-auto mb-10 h-20 w-px"
          style={{ background: 'var(--color-molten)', opacity: 0.4 }}
        />

        <div className="mx-auto max-w-[680px] text-center">
          <span className="fadeup text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            Taking work now
          </span>

          <h2
            className="fadeup font-display mx-auto mt-5 max-w-[16ch] leading-[0.98] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Bring us one thing that <em className="text-molten not-italic">wastes an afternoon</em>.
          </h2>

          <p className="fadeup text-ink-2 mx-auto mt-7 max-w-[48ch] text-[15px] leading-[1.72]">
            Thirty minutes. You describe one job somebody does by hand every week, we say whether it
            can be automated and what it would take.
          </p>

          {/*
            This was the last clause of the paragraph above, set at 15px in
            secondary ink. It is the only sentence on the page that a studio
            chasing the work would not write, which makes it the one worth
            setting like a headline.
          */}
          <p
            className="fadeup font-display border-rule text-ink mx-auto mt-8 max-w-[24ch] border-y py-6 leading-[1.3] font-semibold tracking-[-0.02em]"
            style={{ fontSize: 'clamp(18px, 2.4vw, 26px)' }}
          >
            And if the honest answer is{' '}
            <em className="text-molten-deep not-italic">not worth it</em>, we will say so.
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
          <div className="fadeup mt-10">
            <Magnetic>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="Book"
                className="bg-molten-deep raised inline-flex items-center gap-3 px-10 py-[20px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                style={{
                  color: '#FFF7F2',
                  boxShadow:
                    '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px rgba(194,58,5,0.28)',
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
              className="text-ink-2 hover:text-ink border-rule hover:border-ink inline-flex min-h-11 items-center gap-2 border-b pb-1 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
            >
              Or email {CONTACT} <span aria-hidden="true">→</span>
            </a>
          </p>

          {/*
            Act 02 promises "the person who answers is the same person writing
            the code", and until now the page made that claim and then showed
            nobody. A name is the cheapest way to cash it.
          */}
          <p className="fadeup text-ink-3 mt-10 font-mono text-[10.5px] tracking-[0.2em] uppercase">
            <b className="text-ink font-medium">Mahamad Suhail</b>, who takes the call
          </p>
        </div>
      </div>

      <footer className="wrap mt-[clamp(40px,6vw,80px)]">
        {/* justify-between with three items and one wrap always widows the
            third onto its own line; centre until there is room for the row */}
        <div className="border-rule text-ink-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t pt-6 text-center font-mono text-[10.5px] tracking-[0.22em] uppercase sm:justify-between sm:gap-4 sm:text-left">
          <span>Abenor</span>
          <span>Software studio · started 2026</span>
          <span>© 2026</span>
        </div>
      </footer>
    </ActSection>
  )
}
