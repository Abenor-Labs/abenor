'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * Central plugin registration. Import from here, never from 'gsap' directly,
 * so a plugin can never be used before it is registered.
 *
 * GSAP is 100% free for commercial use including all formerly Club-only
 * plugins (Webflow, 2025) — SplitText and ScrollSmoother included.
 */
let registered = false

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  registered = true
}

export { gsap, ScrollTrigger, SplitText }

/** Shared eases so motion feels like one hand made it. */
export const EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  soft: 'power2.out',
} as const

export const DUR = {
  fast: 0.4,
  base: 0.9,
  slow: 1.4,
} as const
