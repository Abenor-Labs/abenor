import type { ReactNode } from 'react'

export const CALENDLY = 'https://calendly.com/hello-abenor/30min'
export const EMAIL = 'hello.abenor@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=One%20thing%20that%20wastes%20an%20afternoon`

/** Small mono label with the one accent dot. Opens every section. */
export function Eyebrow({ children, tone = 'ink' }: { children: ReactNode; tone?: 'ink' | 'light' }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase ${
        tone === 'light' ? 'text-white/85' : 'text-ink'
      }`}
    >
      <span aria-hidden="true" className="relative grid size-3.5 place-items-center">
        <span className="absolute inset-0 rounded-full bg-ember-bright/20" />
        <span className="size-1.5 rounded-full bg-ember-bright" />
      </span>
      {children}
    </p>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'dark' | 'light' | 'ghost'
  external?: boolean
  className?: string
}

/** Pill button. Dark on paper, light on photography. */
export function Button({ href, children, variant = 'dark', external, className = '' }: ButtonProps) {
  const styles = {
    dark: 'bg-ink text-paper pill-shadow hover:bg-[#2a2a28]',
    light: 'bg-white text-ink pill-shadow hover:bg-[#ececea]',
    ghost: 'text-ink hover:bg-ink/[0.05]',
  }[variant]

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`press nudge inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium tracking-[-0.01em] ${styles} ${className}`}
    >
      {children}
    </a>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`arrow size-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

/** Section heading block: eyebrow, serif headline, optional lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'center' | 'left'
}) {
  const c = align === 'center'
  return (
    <div className={`flex flex-col gap-5 ${c ? 'items-center text-center' : 'items-start'}`} data-stagger>
      <div className="reveal">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="reveal font-serif text-[clamp(40px,5.6vw,68px)] leading-[1.02] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {lede && (
        <p className={`reveal text-[17px] leading-[1.65] text-ink-2 ${c ? 'max-w-[34rem]' : 'max-w-[30rem]'}`}>
          {lede}
        </p>
      )}
    </div>
  )
}
