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
            Send us one thing that <em className="text-molten not-italic">wastes an afternoon</em>.
          </h2>

          <p className="fadeup text-ink-2 mx-auto mt-7 max-w-[48ch] text-[15px] leading-[1.72]">
            Describe one job somebody does by hand every week. In two working days we say whether it
            can be automated, and what it would take.
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

          <div className="fadeup mt-10">
            <Magnetic>
              <a
                href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
                data-cursor="Send"
                className="bg-molten-deep raised inline-flex items-center gap-3 px-10 py-[20px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                style={{
                  color: '#FFF7F2',
                  boxShadow:
                    '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px rgba(194,58,5,0.28)',
                }}
              >
                {CONTACT} <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>

          {/*
            Calendly is deliberately the smaller of the two.

            The whole page is built on making the first ask cheap: one
            paragraph, answered in two days, no calendar, no timezone, no
            appointment to keep. A booked call is a bigger commitment than
            that, so giving it equal weight would split attention between two
            asks and drag the average commitment up rather than down. It sits
            here as the option for someone who has already decided, and it is
            styled as a link because that is what it is.
          */}
          <p className="fadeup mt-6">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="Book"
              className="text-ink-2 hover:text-ink border-rule hover:border-ink inline-flex min-h-11 items-center gap-2 border-b pb-1 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300"
            >
              Or book 30 minutes <span aria-hidden="true">→</span>
            </a>
          </p>

          {/*
            Act 02 promises "the person who answers is the same person writing
            the code", and until now the page made that claim and then showed
            nobody. A name is the cheapest way to cash it.
          */}
          <p className="fadeup text-ink-3 mt-10 font-mono text-[10.5px] tracking-[0.2em] uppercase">
            <b className="text-ink font-medium">Mahamad Suhail</b>, who replies
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
