'use client'

import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/scroll/gsap'
import { ActSection } from '@/components/ui/ActSection'

const LINE = 'The person who answers you is the person writing the code.'
const ACCENT = /answers|writing|code/i

/**
 * Act 02 — Position.
 *
 * The sentence resolves word by word as the camera pulls back. Scrubbed, not
 * timed: the visitor controls the reveal, which is what makes it read as film
 * rather than as an animation that happened to play.
 */
export function Act02Position() {
  const root = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    /*
      gsap.matchMedia rather than a one-off check of the media query.

      The old `if (prefersReducedMotion())` read the setting once, at mount,
      and never looked again — a visitor who turns the OS setting on mid-visit
      kept the scrubbed reveal, and one who turns it off never got it. This
      also gives GSAP a scope to revert, so switching preference tears the
      split back down instead of leaving orphaned word spans in the DOM.
    */
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = new SplitText(el, { type: 'words', wordsClass: 'w' })
      const words = split.words as HTMLElement[]

      gsap.set(words, { color: 'var(--color-rule-2)' })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 62%', scrub: 0.6 },
      })

      tl.to(words, {
        color: (i: number) =>
          ACCENT.test(words[i].textContent ?? '') ? 'var(--color-molten)' : 'var(--color-ink)',
        stagger: 1,
        ease: 'none',
      })

      return () => split.revert()
    })

    /* Reduced motion is not "no reveal", it is "the sentence is simply
       there". Colour alone would have been Tier 3 and safe to keep, but the
       scrub is driven by scroll position, and scroll-linked motion is the
       thing the setting is actually about. */
    mm.add('(prefers-reduced-motion: reduce)', () => {
      el.style.color = 'var(--color-ink)'
      return () => {
        el.style.color = ''
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <ActSection id="position" align="center">
      <div className="wrap">
        <p
          ref={root}
          className="font-display max-w-[20ch] leading-[1.14] font-semibold tracking-[-0.035em]"
          style={{ fontSize: 'clamp(24px, 4.6vw, 60px)' }}
        >
          {LINE}
        </p>
      </div>
    </ActSection>
  )
}
