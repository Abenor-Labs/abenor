import { Arrow, Button, EMAIL, MAILTO } from './primitives'

/**
 * The mid-page ask is deliberately smaller than the close: an email, not a
 * call. Someone halfway down is curious, not ready to book thirty minutes.
 */
export function EmailRow({ lead }: { lead: string }) {
  return (
    <div className="wrap pt-24 sm:pt-32">
      <div className="reveal flex flex-col items-start justify-between gap-6 rounded-[24px] bg-paper-2 p-7 sm:flex-row sm:items-center sm:p-9">
        <p className="max-w-[34rem] font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.15] tracking-[-0.01em] text-ink">
          {lead}
        </p>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <Button href={MAILTO}>
            Write an email <Arrow />
          </Button>
          <span className="pr-1 font-mono text-[12px] text-ink-3">{EMAIL}</span>
        </div>
      </div>
    </div>
  )
}
