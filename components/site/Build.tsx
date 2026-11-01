import { SectionHead } from './primitives'

const SERVICES = [
  {
    name: 'Automation',
    line: 'The sync that used to fail overnight simply stops failing. The handoff happens without the hands.',
    tag: 'n8n · integrations',
  },
  {
    name: 'Websites',
    line: 'Fast, findable, and yours to edit without calling anyone for typos.',
    tag: 'Next.js',
  },
  {
    name: 'iOS & Android',
    line: 'The tool leaves the desk with you, because the work already did.',
    tag: 'Mobile',
  },
  {
    name: 'Internal tools',
    line: 'Built for the spreadsheet currently holding the whole company together.',
    tag: 'Databases',
  },
]

export function Build() {
  return (
    <section id="build" className="pt-32 sm:pt-44">
      <div className="wrap">
        <SectionHead
          align="left"
          eyebrow="What we build"
          title={
            <>
              Software that <em className="italic">does the chore.</em>
            </>
          }
        />

        <ul className="mt-14 grid border-t border-rule lg:grid-cols-4" data-stagger>
          {SERVICES.map((s, i) => (
            <li
              key={s.name}
              className="reveal flex flex-col gap-4 border-t border-rule py-8 first:border-t-0 lg:border-t-0 lg:border-l lg:px-8 lg:pt-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
              <h3 className="font-serif text-[34px] leading-[1.05] tracking-[-0.015em] text-ink">{s.name}</h3>
              <p className="text-[15px] leading-[1.6] text-ink-2">{s.line}</p>
              <p className="mt-auto pt-2 font-mono text-[11px] tracking-[0.12em] text-ink-3 uppercase">{s.tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
