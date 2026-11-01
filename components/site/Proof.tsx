'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import harshith from '@/public/testimonials/harshith-varma.png'
import manish from '@/public/testimonials/manish_chetla.jpeg'
import { Arrow, SectionHead } from './primitives'

type Client = {
  name: string
  role: string
  site: string
  scope: string
  quote: string
  photo: StaticImageData
}

const CLIENTS: Client[] = [
  {
    name: 'Harshith Varma',
    role: 'Game developer',
    site: 'harshithvarma.vercel.app',
    scope: 'Portfolio site. Designed, built, deployed, handed over.',
    quote:
      'I am extremely happy with the final result and would highly recommend you to anyone looking for a talented and reliable web designer.',
    photo: harshith,
  },
  {
    name: 'Manish Chetla',
    role: 'Gameplay programmer',
    site: 'manish-chetla.vercel.app',
    scope: 'Portfolio site. Design, build, animation.',
    quote:
      'You created a clean, modern, and responsive website that perfectly matches my style. The smooth animations, great performance, and attention to detail really stand out.',
    photo: manish,
  },
]

const ROTATE_MS = 9000

export function Proof() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % CLIENTS.length), ROTATE_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, reduced])

  const c = CLIENTS[active]

  return (
    <section id="proof" className="pt-32 sm:pt-44">
      <div className="wrap">
        <SectionHead
          align="left"
          eyebrow="Receipts"
          title={
            <>
              Shipped, handed over,
              <br />
              <em className="italic">still running.</em>
            </>
          }
          lede="Every site we have built is still online. Read what the clients said, then open the work and judge it yourself."
        />

        <div
          className="reveal mt-16 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <figure aria-live="polite" className="min-h-[260px]">
            <blockquote
              key={active}
              className="stage-in is-in relative font-serif text-[clamp(28px,3.4vw,42px)] leading-[1.2] tracking-[-0.015em] text-ink"
              style={{ animationDelay: '0ms', animationDuration: '600ms' }}
            >
              <span aria-hidden="true" className="absolute -left-[0.5em] text-ember-bright italic">
                “
              </span>
              {c.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[14px]">
              <span>
                <span className="font-medium text-ink">{c.name}</span>
                <span className="text-ink-3"> · {c.role}</span>
              </span>
              <a
                href={`https://${c.site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nudge inline-flex items-center gap-1.5 text-ink underline decoration-ink/25 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-ink"
              >
                {c.site}
                <Arrow className="-rotate-45" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </figcaption>
            <p className="mt-3 text-[14px] text-ink-3">{c.scope}</p>
          </figure>

          <ul className="self-start border-t border-rule" role="tablist" aria-label="Clients">
            {CLIENTS.map((p, i) => {
              const on = i === active
              return (
                <li key={p.name} className="relative border-b border-rule">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <Image
                      src={p.photo}
                      alt=""
                      width={44}
                      height={44}
                      quality={82}
                      className={`photo-edge size-11 rounded-full object-cover transition-[filter,opacity] duration-150 ${
                        on ? '' : 'opacity-70 grayscale'
                      }`}
                    />
                    <span className="flex flex-col">
                      <span className={`text-[15px] transition-colors duration-150 ${on ? 'font-medium text-ink' : 'text-ink-3'}`}>
                        {p.name}
                      </span>
                      <span className="text-[13px] text-ink-3">{p.role}</span>
                    </span>
                  </button>
                  {on && !reduced && (
                    <span
                      key={`${active}-${paused}`}
                      aria-hidden="true"
                      className="absolute -bottom-px left-0 h-px w-full origin-left bg-ink"
                      style={{
                        animation: `progress ${ROTATE_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </li>
              )
            })}
            <li className="flex items-center gap-4 py-4">
              <span className="grid size-11 place-items-center rounded-full bg-paper-2 font-serif text-[20px] text-ink-2">A</span>
              <span className="flex flex-col">
                <span className="text-[15px] text-ink-3">This website</span>
                <span className="text-[13px] text-ink-3">Designed, written and built in-house</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
