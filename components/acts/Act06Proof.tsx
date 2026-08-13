import { ActSection } from '@/components/ui/ActSection'
import { Avatar } from '@/components/ui/Avatar'

/**
 * Act 06 — Receipts.
 *
 * Deliberately placed after Act 05 and before the close: Act 05 says how the
 * work happens, this says it has happened, and then the ask lands. People
 * judge an experience by its peak and its ending, so the last thing before
 * the ask should be evidence, not a process diagram.
 *
 * The section is small on purpose. Two clients is two clients — dressing that
 * up as a logo wall is the one move that would cost more trust than the thin
 * record does. The note at the bottom volunteers the weakness for the same
 * reason: a buyer who discovers the free work later stops believing the rest
 * of the page, and a buyer who is told up front reads it as confidence.
 *
 * Client work only. Two entries were cut from here: an internal project, and
 * the page you are reading. Neither is somebody choosing to hire us, which is
 * the single thing this section exists to evidence, and padding a short list
 * with things that are not client work advertises the shortness rather than
 * hiding it.
 */

interface Work {
  n: string
  name: string
  what: string
  href?: string
  quote?: string
  who?: string
  role?: string
  photo?: string
}

const WORK: Work[] = [
  {
    n: '01',
    name: 'Harshith Varma',
    what: 'Portfolio · built, deployed, handed over',
    href: 'https://harshithvarma.vercel.app/',
    quote:
      'I am extremely happy with the final result and would highly recommend you to anyone looking for a talented and reliable web designer. I look forward to working with you again in the future.',
    who: 'Harshith Varma',
    role: 'Game developer',
    photo: '/testimonials/harshith-varma.png',
  },
  {
    n: '02',
    name: 'Manish Chetla',
    what: 'Portfolio · design, build, animation',
    href: 'https://manish-chetla.vercel.app/',
    // Trimmed to two sentences so the two cards balance. His words, fewer of
    // them — nothing rephrased, nothing added.
    quote:
      'You created a clean, modern, and responsive website that perfectly matches my style. The smooth animations, great performance, and attention to detail really stand out.',
    who: 'Manish Chetla',
    role: 'Gameplay programmer',
    photo: '/testimonials/manish_chetla.jpeg',
  },
]

export function Act06Proof() {
  return (
    <ActSection id="proof" align="center">
      <div className="wrap">
        <div className="fadeup border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten-deep font-medium">04</b> ] Receipts
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            What we have <em className="text-molten not-italic">actually</em> shipped
          </h2>
        </div>

        {/*
          A flex-1 quote inside a flex column: the two testimonials are
          different lengths, and cards whose feet do not line up read as
          broken rather than as organic. The quote absorbs the difference so
          both "View site" links sit on the same baseline.
        */}
        <ul className="grid grid-cols-1 gap-[clamp(16px,2.5vw,28px)] md:grid-cols-2">
          {WORK.map((w) => (
            <li
              key={w.n}
              className="fadeup border-rule bg-paper-2/40 flex flex-col border p-[clamp(20px,2.6vw,32px)]"
            >
              <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
                [ <b className="text-molten-deep font-medium">{w.n}</b> ] {w.what}
              </span>

              <blockquote
                className="font-display text-ink mt-5 flex-1 leading-[1.4] font-normal"
                style={{ fontSize: 'clamp(16px, 1.75vw, 21px)' }}
              >
                &ldquo;{w.quote}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3.5">
                {w.photo && <Avatar src={w.photo} name={w.who ?? w.name} />}
                <span className="font-mono text-[10.5px] leading-[1.7] tracking-[0.18em] uppercase">
                  <b className="text-ink block font-medium">{w.who}</b>
                  {w.role && <span className="text-ink-3">{w.role}</span>}
                </span>
              </div>

              {w.href && (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Open"
                  className="text-ink border-rule hover:border-ink mt-6 inline-flex min-h-11 items-center gap-2 border-t pt-4 font-mono text-[10.5px] tracking-[0.18em] uppercase transition-colors duration-300"
                >
                  View site <span aria-hidden="true">→</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className="fadeup text-ink-2 mt-[clamp(20px,3vw,32px)] max-w-[54ch] text-[13px] leading-[1.7]">
          Both were built free, to get started. The words are theirs; the invoices never existed.
          Better you hear it from us.
        </p>
      </div>
    </ActSection>
  )
}
