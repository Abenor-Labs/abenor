'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, SplitText, EASE } from '@/lib/scroll/gsap'

type Tag = 'h2' | 'h3' | 'p' | 'span' | 'div'

/**
 * A masked reveal: lines (or words) rise out of an overflow clip as the
 * element enters the viewport.
 *
 * Three decisions worth keeping.
 *
 * **Nothing is hidden up front.** The usual recipe sets the text to
 * `visibility: hidden` and lets GSAP reveal it. That trades a reveal for a
 * blank heading whenever JS is slow, blocked, or broken, and on a server-
 * rendered page it also flashes: the HTML paints the text, hydration then
 * hides it. Here the text is simply real text, and the split happens while
 * the element is still below the fold — the swap is never on screen. The
 * cost is that this component must not be used above the fold, which is why
 * the hero has its own handling.
 *
 * **Lines, not words, by default.** Word masks on a four-word display
 * heading make each word its own promoted layer and read as a slot machine.
 * Lines stagger as the eye actually reads. `by="words"` is there for short
 * labels where the extra articulation is the point.
 *
 * **`gsap.matchMedia`, not an `if`.** Under reduced motion the split never
 * runs at all, and if the visitor toggles the OS setting mid-visit GSAP
 * reverts this setup rather than leaving half-built masks in the DOM.
 */
export function MaskedText({
  as: Tag = 'span',
  by = 'lines',
  delay = 0,
  className = '',
  style,
  children,
}: {
  as?: Tag
  by?: 'lines' | 'words'
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let split: SplitText | null = null

      const run = () => {
        if (!ref.current) return
        split = SplitText.create(el, {
          type: by,
          mask: by,
          /* re-splits on resize, and re-runs onSplit so the tween is rebuilt
             against the new line boxes rather than tweening stale ones */
          autoSplit: true,
          /* keeps the original sentence on the element for screen readers;
             without it the split spans get announced one fragment at a time */
          aria: 'auto',
          onSplit: (self) => {
            const targets = by === 'words' ? self.words : self.lines
            return gsap.fromTo(
              targets,
              { yPercent: 108 },
              {
                yPercent: 0,
                duration: 0.85,
                ease: EASE.out,
                delay,
                stagger: by === 'words' ? 0.035 : 0.09,
                /* the hint is worth paying for only while the tween runs;
                   left on, it holds a layer per line for the whole visit */
                onStart: () => gsap.set(targets, { willChange: 'transform' }),
                onComplete: () => gsap.set(targets, { willChange: 'auto' }),
                scrollTrigger: { trigger: el, start: 'top 84%', once: true },
              },
            )
          },
        })
      }

      /* Splitting before the display face has loaded measures fallback line
         boxes, and the reveal then plays against wrapping that no longer
         exists. */
      if (document.fonts?.status === 'loaded') run()
      else void document.fonts?.ready.then(run)

      return () => split?.revert()
    })

    return () => {
      mm.revert()
    }
  }, [by, delay])

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  )
}
