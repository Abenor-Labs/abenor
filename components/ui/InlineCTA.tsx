import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello.abenor@gmail.com'

export function InlineCTA({ variant = 'default' }: { variant?: 'default' | 'alt' }) {
  const alt = variant === 'alt'

  return (
    <div className="relative z-10 py-[clamp(28px,4vw,56px)]">
      <div className="wrap flex flex-col items-center gap-4 text-center">
        <p className="text-ink-2 max-w-[40ch] text-[14px] leading-[1.6]">
          {alt
            ? 'One workflow that wastes real hours. Free answer in two days.'
            : 'Tell us what wastes your afternoon.'}
        </p>
        <Magnetic>
          <a
            href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
            data-cursor="Send"
            className={`inline-flex items-center gap-3 px-8 py-[16px] font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5 ${
              alt
                ? 'border-ink text-ink hover:bg-ink hover:text-paper border'
                : 'bg-molten-deep raised'
            }`}
            style={
              alt
                ? undefined
                : {
                    // #FFF7F2 on molten-deep is 5.08:1. The old pairing
                    // (#EFEDE8 on molten) was 3.36:1 — the primary CTA was
                    // the least legible text on the page.
                    color: '#FFF7F2',
                    boxShadow:
                      '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px rgba(194,58,5,0.28)',
                  }
            }
          >
            {/*
              The label used to read "Start a build", which prices the click
              at a project. The actual ask is one paragraph about one annoying
              job, answered free in two days. Naming the small ask is what
              earns the chance to make the big one.
            */}
            Send us one job <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
