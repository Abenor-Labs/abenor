import { Arrow, Button, CALENDLY, EMAIL, MAILTO } from './primitives'
import { EmailCapture } from './EmailCapture'
import { LocalTime } from './LocalTime'

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'Problem', href: '#leak' },
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
]

export function Footer() {
  return (
    <footer className="wrap pt-24 pb-10 sm:pt-32">
      {/* Contact strip. A smaller second chance for whoever scrolled past the
          photo panel: an email for the undecided, a call for the ready. */}
      <div className="flex flex-col gap-6 border-b border-rule pb-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.015em] text-ink">
            Still deciding?
          </p>
          <p className="mt-1.5 text-[15px] text-ink-2">
            Leave your email and we will write with one question about your workflow.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <EmailCapture />
          <span className="hidden text-[14px] text-ink-3 sm:inline">or</span>
          <Button href={CALENDLY} external className="h-12 justify-center">
            Book a call <Arrow />
          </Button>
        </div>
      </div>

      <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
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

        <div className="grid grid-cols-2 gap-10">
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

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6 text-[13px] text-ink-3">
        <p>© 2026 Abenor</p>
        <LocalTime />
      </div>
    </footer>
  )
}
