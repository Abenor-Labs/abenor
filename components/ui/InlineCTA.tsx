import { Magnetic } from '@/components/ui/Cursor'

const CONTACT = 'hello@abenor.com'

export function InlineCTA({ variant = 'default' }: { variant?: 'default' | 'alt' }) {
  const alt = variant === 'alt'

  return (
    <div className="relative z-10 py-[clamp(28px,4vw,56px)]">
      <div className="wrap flex flex-col items-center gap-4 text-center">
        <p className="text-ink-2 max-w-[40ch] text-[14px] leading-[1.6]">
          {alt
            ? 'Give us one workflow that wastes real hours. Free answer within two working days.'
            : 'Ready to stop the copy-paste? Tell us what wastes your afternoon.'}
        </p>
        <Magnetic>
          <a
            href={`mailto:${CONTACT}?subject=One%20thing%20that%20wastes%20an%20afternoon`}
            data-cursor="Send"
            className={`inline-flex items-center gap-3 px-8 py-[16px] font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5 ${
              alt
                ? 'border-ink text-ink hover:bg-ink hover:text-paper border'
                : 'bg-molten raised'
            }`}
            style={
              alt
                ? undefined
                : {
                    color: '#EFEDE8',
                    boxShadow:
                      '0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px rgba(232,71,10,0.25)',
                  }
            }
          >
            Start a build <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
