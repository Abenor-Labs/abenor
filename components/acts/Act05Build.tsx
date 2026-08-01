import { ActSection } from '@/components/ui/ActSection'

const STEPS = [
  {
    k: '01',
    t: 'A call',
    d: 'Thirty minutes. You describe what is broken. We say whether we can help, and if we cannot, who might.',
  },
  {
    k: '02',
    t: 'A written scope',
    d: 'What we will build, what we will not, and a number — before anyone writes code. If the number and your budget are not in the same room, you find out here.',
  },
  {
    k: '03',
    t: 'Weekly working software',
    d: 'Not status updates. Something you can open and click, every week, from the first one.',
  },
  {
    k: '04',
    t: 'Keys handed over',
    d: 'Repository, hosting and credentials in your accounts, with documentation written for the developer who comes after us.',
  },
]

/**
 * Act 05 — How it works.
 *
 * The wireframe-to-live scene lands here in Phase 3. Copy is deliberately
 * procedural rather than aspirational: four checkable events, not four verbs.
 */
export function Act05Build() {
  return (
    <ActSection id="build" align="center">
      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">03</b> ] What actually happens
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Four things, in <em className="text-molten not-italic">this order</em>
          </h2>
        </div>

        <ol className="grid gap-px md:grid-cols-4">
          {STEPS.map((s) => (
            <li
              key={s.k}
              className="border-rule bg-paper-2/40 hover:bg-paper-2 flex min-h-[190px] flex-col border p-[clamp(20px,2.4vw,30px)] transition-colors duration-300"
            >
              <span className="text-molten font-mono text-[11px] tracking-[0.24em]">{s.k}</span>
              <h3 className="font-display mt-4 text-[20px] leading-[1.1] font-semibold tracking-[-0.02em]">
                {s.t}
              </h3>
              <p className="text-ink-2 mt-2.5 text-[13px] leading-[1.6]">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </ActSection>
  )
}
