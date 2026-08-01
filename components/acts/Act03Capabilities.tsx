import { ActSection } from '@/components/ui/ActSection'

const SERVICES = [
  {
    n: '001',
    title: 'Web Design',
    body: 'Interface systems with an argument behind them — type scales, motion rules and component logic that survive contact with a real CMS and a real content team.',
    chips: ['Design system', 'Prototype', 'Motion spec'],
  },
  {
    n: '002',
    title: 'End-to-End Websites',
    body: 'One team from the first sketch to the production DNS record. No handoff seam for scope to fall through, and one phone number when something breaks.',
    chips: ['Next.js', 'Headless CMS', 'Hosting'],
  },
  {
    n: '003',
    title: 'n8n Automation',
    body: 'Your tools wired together and observable, so nobody on your team is re-typing the same record into a second system at 6pm on a Friday.',
    chips: ['Integrations', 'Ops workflows', 'Alerting'],
  },
  {
    n: '004',
    title: 'iOS & Android',
    body: 'Mobile products that feel native to the platform they live on. Built for App Review, for over-the-air updates, and for the release after this one.',
    chips: ['Native / RN', 'Store submission', 'Release ops'],
  },
  {
    n: '005',
    title: 'Custom Software',
    body: 'Internal tools, APIs, data migrations and the integrations nobody volunteers to own — held to the same standard as the front door.',
    chips: ['APIs', 'Migrations', 'Internal tools'],
  },
]

/** Act 03 — Capabilities. The camera tracks sideways past five monoliths. */
export function Act03Capabilities() {
  return (
    <ActSection id="capabilities" align="center">
      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">01</b> ] Disciplines
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Five things, <em className="text-molten not-italic">properly</em>
          </h2>
        </div>

        <ul>
          {SERVICES.map((s) => (
            <li
              key={s.n}
              className="border-rule group grid grid-cols-[44px_1fr] items-center gap-x-4 gap-y-2 border-b py-[clamp(20px,3vw,38px)] md:grid-cols-[64px_1fr_1.05fr_auto] md:gap-x-8"
            >
              <span className="text-molten font-mono text-[11px] tracking-[0.1em]">{s.n}</span>

              <h3
                className="font-display leading-[1.02] font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2"
                style={{ fontSize: 'clamp(21px, 3.4vw, 42px)' }}
              >
                {s.title}
              </h3>

              <p className="text-ink-2 col-start-2 max-w-[44ch] text-[13px] leading-[1.62] md:col-start-3">
                {s.body}
              </p>

              <div className="col-start-2 flex flex-wrap gap-1.5 md:col-start-4 md:justify-end">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="border-rule text-ink-2 border px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.14em] whitespace-nowrap uppercase"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ActSection>
  )
}
