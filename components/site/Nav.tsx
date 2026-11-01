'use client'

import { useEffect, useState } from 'react'
import { Button, CALENDLY, MAILTO } from './primitives'

const LINKS = [
  { href: '#leak', label: 'Problem' },
  { href: '#build', label: 'What we build' },
  { href: '#process', label: 'Process' },
  { href: '#proof', label: 'Work' },
  { href: '#answers', label: 'Answers' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled || open
          ? 'bg-paper/80 shadow-[0_1px_0_rgba(17,17,16,0.08)] backdrop-blur-xl backdrop-saturate-150'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[68px] max-w-[1440px] items-center px-[var(--gut)]">
        <a href="#top" className="flex items-baseline gap-1 font-serif text-[26px] leading-none tracking-[-0.02em]">
          Abenor
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ember-bright" />
        </a>

        <ul className="ml-14 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={MAILTO}
            className="hidden rounded-full px-3 py-2 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink sm:inline-block"
          >
            Email us
          </a>
          <Button href={CALENDLY} external className="h-10 px-4 text-[14px]">
            Book a call
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="press grid size-10 place-items-center rounded-full hover:bg-ink/[0.05] lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path
                d={open ? 'M5 5l10 10M15 5L5 15' : 'M3 7h14M3 13h14'}
                className="transition-[d] duration-200"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className="disclosure lg:hidden" data-open={open}>
        <div>
          <ul className="flex flex-col px-[var(--gut)] pb-5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule py-3.5 font-serif text-[24px] leading-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
