import { ActSection } from '@/components/ui/ActSection'
import { BuildMorph } from '@/components/ui/BuildMorph'

/**
 * Act 05 — How it works.
 *
 * One sequence, told twice at once: the copy says what happens at each step,
 * the frame beside it shows what you are holding when it does. BuildMorph
 * owns both halves so the two can never drift apart again.
 */
export function Act05Build() {
  return (
    <ActSection id="build" align="start" className="pt-[clamp(80px,12vh,160px)]">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">03</b> ] What actually happens
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Four things, in <em className="text-molten not-italic">this order</em>
          </h2>
        </div>

        <BuildMorph />
      </div>
    </ActSection>
  )
}
