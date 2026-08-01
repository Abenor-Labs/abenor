import { ActSection } from '@/components/ui/ActSection'

const SLOTS = [
  { label: 'Featured slot', title: 'Flagship project', cap: 'The one you lead with · full case study', featured: true },
  { label: 'Slot 02', title: 'Mobile app', cap: 'iOS + Android · store links', featured: false },
  { label: 'Slot 03', title: 'Automation build', cap: 'Hours saved · systems connected', featured: false },
]

/**
 * Act 06 — Proof.
 *
 * Placeholders until real case studies land in content/work/*.mdx. They are
 * marked as placeholders on purpose: an empty grid of fake logos does more
 * damage to a new studio than an honest gap.
 */
export function Act06Proof() {
  return (
    <ActSection id="proof" align="center">
      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">05</b> ] Selected work
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Proof of <em className="text-molten not-italic">craft</em>
          </h2>
          <span className="text-molten border-molten/50 border border-dashed px-2 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase">
            Needs real projects
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          {SLOTS.map((s) => (
            <article
              key={s.label}
              className={`border-rule bg-paper-2/50 hover:border-molten flex flex-col justify-between border p-[clamp(18px,2.4vw,32px)] transition-colors duration-300 ${
                s.featured ? 'md:row-span-2 md:min-h-[clamp(340px,44vw,600px)]' : 'min-h-[200px]'
              }`}
            >
              <span className="text-molten border-molten/40 self-start border border-dashed px-2 py-1 font-mono text-[9.5px] tracking-[0.2em] uppercase">
                {s.label}
              </span>
              <div>
                <h3
                  className="font-display font-semibold tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(19px, 2.2vw, 30px)' }}
                >
                  {s.title}
                </h3>
                <p className="text-ink-3 mt-2 font-mono text-[10.5px] tracking-[0.16em] uppercase">
                  {s.cap}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ActSection>
  )
}
