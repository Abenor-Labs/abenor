import { ActSection } from '@/components/ui/ActSection'
import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello@abenor.com'

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
            Describe one job somebody on your team does by hand every week. Within two working days
            we will tell you whether it can be automated, roughly what it would take, and if the
            honest answer is &ldquo;not worth it&rdquo;, we will tell you that instead.
          </p>

          <p className="fadeup text-ink-3 mx-auto mt-3 max-w-[48ch] text-[14px]">
            A free answer within two working days.
          </p>

          <div className="fadeup mt-10">
            <Magnetic>
              <a
                href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
                data-cursor="Send"
                className="bg-molten raised inline-flex items-center gap-3 px-10 py-[20px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                style={{
                  color: '#EFEDE8',
                  boxShadow:
                    '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px rgba(232,71,10,0.25)',
                }}
              >
                {CONTACT} <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <footer className="wrap mt-[clamp(40px,6vw,80px)]">
        <div className="border-rule text-ink-3 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[10.5px] tracking-[0.22em] uppercase">
          <span>Abenor</span>
          <span>Software studio · started 2026</span>
          <span>© 2026</span>
        </div>
      </footer>
    </ActSection>
  )
}
