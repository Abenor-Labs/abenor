'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/scroll/gsap'
import { prefersReducedMotion } from '@/lib/scroll/progress'
import { ActSection } from '@/components/ui/ActSection'

const LINE =
  'Ask a question on Monday. The person who answers is the same person writing the code.'
const ACCENT = /question|answers|code/i

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

    if (prefersReducedMotion()) {
      el.style.color = 'var(--color-ink)'
      return
    }

    const split = new SplitText(el, { type: 'words', wordsClass: 'w' })
    const words = split.words as HTMLElement[]

    gsap.set(words, { color: 'var(--color-rule-2)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 78%',
        end: 'bottom 62%',
        scrub: 0.6,
      },
    })

    tl.to(words, {
      color: (i: number) =>
        ACCENT.test(words[i].textContent ?? '') ? 'var(--color-molten)' : 'var(--color-ink)',
      stagger: 1,
      ease: 'none',
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      split.revert()
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
