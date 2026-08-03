// @ts-nocheck — removed from page; kept for potential revival
import { ActSection } from '@/components/ui/ActSection'

const WILL = [
  'First projects where proving it fast matters more than a wall of client logos',
  'Automation with a measurable before and after',
  'Greenfield builds where design and engineering are one decision, not two invoices',
  'Rescues, if we get access to the repository and permission to say what is wrong',
]

const WONT = [
  'Work we cannot ship into your own accounts — if you will not own the code and the infrastructure, we are the wrong studio',
  'Design handed over a wall with nobody accountable for the build',
  'Anything that needs us to pretend we have done it ten times before',
  'Projects where the deadline was set before the scope was',
]

/**
 * Act 06 — Terms.
 *
 * This replaces the portfolio. Abenor started in 2026 and has no client work
 * to show; three dashed "coming soon" tiles would announce that louder than
 * saying it plainly. Stating what we refuse is also the strongest available
 * signal of judgement when there is no back catalogue to point at.
 */
export function Act06Terms() {
  return (
    <ActSection id="terms" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">04</b> ] Straight up
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            What we will and <em className="text-molten not-italic">will not</em> take
          </h2>
        </div>

        <p className="fadeup text-ink mb-[clamp(28px,4vw,52px)] max-w-[52ch] text-[15px] leading-[1.72]">
          We started in 2026. There is no work section on this site because we are not going to
          fill one with stock screenshots and someone else&rsquo;s case studies. What we can show
          you is our judgement — starting with the work we turn down.
        </p>

        <div className="fadeup grid gap-px md:grid-cols-2">
          <div className="border-rule bg-paper-2 border p-[clamp(22px,3vw,38px)]">
            <h3 className="font-display text-molten text-[13px] font-semibold tracking-[0.16em] uppercase">
              Yes
            </h3>
            <ul className="mt-5 space-y-4">
              {WILL.map((t) => (
                <li key={t} className="text-ink flex gap-3 text-[14px] leading-[1.6]">
                  <span aria-hidden="true" className="text-molten mt-px shrink-0 font-mono">
                    +
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-rule border p-[clamp(22px,3vw,38px)]">
            <h3 className="font-display text-ink-3 text-[13px] font-semibold tracking-[0.16em] uppercase">
              No
            </h3>
            <ul className="mt-5 space-y-4">
              {WONT.map((t) => (
                <li key={t} className="text-ink-2 flex gap-3 text-[14px] leading-[1.6]">
                  <span aria-hidden="true" className="text-ink-3 mt-px shrink-0 font-mono">
                    &minus;
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ActSection>
  )
}
