import { ActSection } from '@/components/ui/ActSection'

/**
 * Act 03 — Problems.
 *
 * Deliberately not a service menu. Nobody wakes up needing "end-to-end web
 * development"; they wake up because a spreadsheet broke. The headline is the
 * symptom the visitor already recognises, and the service is the quiet answer
 * underneath it.
 */
const PROBLEMS = [
  {
    n: '001',
    problem: 'Someone is re-typing the same record into a second system.',
    answer:
      'We map what actually moves between your tools, then wire it together in n8n with alerting on top — so a broken sync tells you, instead of a customer telling you.',
    chips: ['n8n', 'Integrations', 'Alerting'],
  },
  {
    n: '002',
    problem: 'Your site was built by three different people and none of them own it.',
    answer:
      'We take the whole thing: design, build, deploy, DNS. One repository, one team, one number to call when it goes down at 11pm.',
    chips: ['Next.js', 'CMS', 'Hosting'],
  },
  {
    n: '003',
    problem: 'You need an app. You do not need a mobile team.',
    answer:
      'iOS and Android, built and taken through store review, then handed over with the release process written down so your next developer is not reverse-engineering it.',
    chips: ['iOS', 'Android', 'Store submission'],
  },
  {
    n: '004',
    problem: 'It looked right in Figma and fell apart with real content.',
    answer:
      'We design the system, not the screenshot — type scale, spacing, loading states, empty states, error states — and prove it against your actual data before it ships.',
    chips: ['Design system', 'States', 'Motion'],
  },
  {
    n: '005',
    problem: 'A spreadsheet is holding your company together.',
    answer:
      'We replace it with a real tool: a proper database, permissions, an audit trail, and something that keeps working after the person who built it leaves.',
    chips: ['Internal tools', 'APIs', 'Migrations'],
  },
]

export function Act03Problems() {
  return (
    <ActSection id="problems" align="center">
      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">01</b> ] Sound familiar
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            Five problems we <em className="text-molten not-italic">fix</em>
          </h2>
        </div>

        <ul>
          {PROBLEMS.map((p) => (
            <li
              key={p.n}
              className="border-rule group grid grid-cols-[44px_1fr] items-start gap-x-4 gap-y-3 border-b py-[clamp(22px,3vw,40px)] md:grid-cols-[64px_1.15fr_1fr_auto] md:items-center md:gap-x-8"
            >
              <span className="text-molten pt-1 font-mono text-[11px] tracking-[0.1em] md:pt-0">
                {p.n}
              </span>

              <h3
                className="font-display leading-[1.08] font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2"
                style={{ fontSize: 'clamp(19px, 2.6vw, 34px)' }}
              >
                {p.problem}
              </h3>

              <p className="text-ink-2 col-start-2 max-w-[46ch] text-[13px] leading-[1.62] md:col-start-3">
                {p.answer}
              </p>

              <div className="col-start-2 flex flex-wrap gap-1.5 md:col-start-4 md:justify-end">
                {p.chips.map((c) => (
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
