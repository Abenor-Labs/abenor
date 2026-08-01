'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a dot that tracks exactly, and a ring that lags behind it.
 *
 * mix-blend-mode: difference means it inverts against whatever it crosses, so
 * one element reads correctly on paper, on ink panels and over the accent
 * without any per-section logic.
 *
 * Elements opt in to a label with data-cursor="Drag". Suppressed entirely for
 * touch, for reduced motion, and the moment the visitor starts using a
 * keyboard — a fake pointer is noise if you are tabbing.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const d = dot.current
    const r = ring.current
    const l = label.current
    if (!d || !r || !l) return

    // NB: deliberately not `data-cursor` — that is the per-element opt-in
    // attribute, and closest() would walk up and match the root flag, giving
    // every hover the label "custom".
    document.documentElement.dataset.cursorMode = 'on'

    let x = innerWidth / 2
    let y = innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const tick = () => {
      // tight enough that the ring reads as attached to the pointer; any
      // slower and it looks like a second, broken cursor
      rx += (x - rx) * 0.28
      ry += (y - ry) * 0.28
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor], a, button')
      if (!el || el === document.documentElement) return
      const text = el.dataset.cursor ?? ''
      l.textContent = text
      r.dataset.state = text ? 'label' : 'hover'
    }

    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor], a, button')
      if (el) r.dataset.state = 'idle'
    }

    // a keyboard user has no use for this
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        delete document.documentElement.dataset.cursorMode
        cleanup()
      }
    }

    const cleanup = () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('keydown', onKey)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    window.addEventListener('keydown', onKey)
    raf = requestAnimationFrame(tick)

    return () => {
      delete document.documentElement.dataset.cursorMode
      cleanup()
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" data-state="idle">
        <span ref={label} className="cursor-label" />
      </div>
    </div>
  )
}

/**
 * Pulls its child toward the pointer while hovered, then springs back.
 * Used sparingly — one magnetic element per screen keeps it a surprise
 * rather than a tic.
 */
export function Magnetic({
  children,
  strength = 0.32,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.transition = ''
      el.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * strength}px, ${
        (e.clientY - r.top - r.height / 2) * strength * 1.3
      }px, 0)`
    }

    const leave = () => {
      el.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = 'translate3d(0,0,0)'
    }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  )
}
