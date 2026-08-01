import { ActSection } from '@/components/ui/ActSection'
import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello@abenor.com'

/**
 * Act 07 — Contact.
 *
 * One specific, checkable offer beats "get in touch". A stranger can act on
 * this in under a minute and it costs them nothing, which is the only kind of
 * ask a studio with no back catalogue has earned.
 */
export function Act07Close() {
  return (
    <ActSection id="close" align="center" className="pb-[clamp(40px,7vw,90px)]">
      <div className="wrap">
        <div className="border-rule bg-paper-2/60 raised-lg border px-[clamp(20px,4vw,60px)] py-[clamp(44px,8vw,110px)] text-center backdrop-blur-[2px]">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ 05 ] — Taking work now
          </span>

          <h2
            className="font-display mx-auto mt-4 max-w-[16ch] leading-[0.98] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Send us one thing that <em className="text-molten not-italic">wastes an afternoon</em>.
          </h2>

          <p className="text-ink mx-auto mt-6 max-w-[50ch] text-[15px] leading-[1.72]">
            Describe one job somebody on your team does by hand every week. Within two working days
            we will tell you whether it can be automated, roughly what it would take, and if the
            honest answer is &ldquo;not worth it&rdquo;, we will tell you that instead.
          </p>

          <p className="text-ink-2 mx-auto mt-3 max-w-[50ch] text-[14px]">
            No charge, no call required, no pitch deck.
          </p>

          <div className="mt-8">
            <Magnetic>
              <a
                href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
                data-cursor="Send"
                className="bg-molten text-paper border-molten hover:text-molten raised inline-flex items-center gap-3 border px-9 py-[18px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5 hover:bg-transparent"
              >
                {CONTACT} <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>

          <p className="text-molten border-molten/50 mt-6 inline-block border border-dashed px-2 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase">
            Placeholder address — confirm the real one
          </p>
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
