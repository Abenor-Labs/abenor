import { ActSection } from '@/components/ui/ActSection'

/**
 * Act 07 — Close.
 *
 * The camera pulls out wide, the wordmark reassembles behind, and the only
 * job left on screen is to make contact obvious.
 */
export function Act07Close() {
  return (
    <ActSection id="close" align="center" className="pb-[clamp(40px,7vw,90px)]">
      <div className="wrap">
        <div className="border-rule bg-paper-2/40 border px-[clamp(20px,4vw,60px)] py-[clamp(44px,8vw,110px)] text-center backdrop-blur-[2px]">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ 07 ] — Open for work
          </span>

          <h2
            className="font-display mt-4 leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Bring us something <em className="text-molten not-italic">hard</em>.
          </h2>

          <p className="text-ink-2 mx-auto mt-4 max-w-[46ch] text-[14.5px]">
            Send the problem, not the specification. We will tell you straight whether we are the
            right studio to build it.
          </p>

          <a
            href="mailto:hello@abenor.com"
            className="bg-molten text-paper border-molten mt-7 inline-flex items-center gap-3 border px-9 py-[18px] font-mono text-[12px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-transparent hover:gap-5 hover:text-molten"
          >
            Start a build <span aria-hidden="true">→</span>
          </a>

          <p className="text-molten mt-6 inline-block border border-dashed border-molten/50 px-2 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase">
            Placeholder — confirm the real contact address
          </p>
        </div>
      </div>

      <footer className="wrap mt-[clamp(40px,6vw,80px)]">
        <div className="border-rule text-ink-3 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[10.5px] tracking-[0.22em] uppercase">
          <span>Abenor</span>
          <span>The next generation of digital craftsmanship</span>
          <span>© 2026</span>
        </div>
      </footer>
    </ActSection>
  )
}
