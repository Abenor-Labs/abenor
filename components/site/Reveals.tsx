'use client'

import { useEffect } from 'react'

/**
 * One observer for the whole page. Anything with `.reveal` or `.stage-in`
 * (or a `[data-stage]` parent of stage-in cards) gets `.is-in` the first
 * time it crosses into view, and is then forgotten. Children of a
 * `[data-stagger]` parent receive their index as `--i` so the CSS can
 * offset them.
 */
export function Reveals() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        ;(child as HTMLElement).style.setProperty('--i', String(i))
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    document.querySelectorAll('.reveal, [data-stage]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
