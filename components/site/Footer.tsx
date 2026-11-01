import { CALENDLY, EMAIL, MAILTO } from './primitives'

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'What we build', href: '#build' },
      { label: 'Process', href: '#process' },
      { label: 'Work', href: '#proof' },
      { label: 'Answers', href: '#answers' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Book a call', href: CALENDLY, external: true },
      { label: EMAIL, href: MAILTO },
    ],
  },
  {
    title: 'Live work',
    links: [
      { label: 'harshithvarma.vercel.app', href: 'https://harshithvarma.vercel.app', external: true },
      { label: 'manish-chetla.vercel.app', href: 'https://manish-chetla.vercel.app', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="wrap pt-24 pb-10 sm:pt-32">
      <div className="grid gap-12 border-b border-rule pb-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-baseline gap-1 font-serif text-[30px] leading-none tracking-[-0.02em]">
            Abenor
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ember-bright" />
          </a>
          <p className="max-w-[22rem] text-[15px] leading-[1.6] text-ink-2">
            A software studio. One workflow, two weeks, a fixed fee, and everything handed over.
          </p>
          <p className="inline-flex items-center gap-2 text-[13px] text-ink-3">
            <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-live" />
            Taking new work
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[14px] break-words text-ink-2 transition-colors duration-150 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[13px] text-ink-3">
        <p>© 2026 Abenor</p>
        <p>IST · UTC+5:30 · Photography from Unsplash</p>
      </div>
    </footer>
  )
}
