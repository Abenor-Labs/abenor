'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { actProgress, type ActId } from '@/lib/motion/acts'
import { scrollState } from '@/lib/scroll/progress'

/**
 * Per-frame act progress for 3D scenes.
 *
 * Returns a ref, not state — reading it inside useFrame costs nothing and
 * never re-renders React. `smooth` adds a light lag so scenes glide rather
 * than snap when the visitor flicks the wheel.
 */
export function useActProgress(id: ActId, smooth = 0.12) {
  const ref = useRef(0)

  useFrame(() => {
    const target = actProgress(scrollState.progress, id)
    ref.current += (target - ref.current) * smooth
  })

  return ref
}

/** Master 0..1, same contract. */
export function useMasterProgress(smooth = 0.12) {
  const ref = useRef(0)

  useFrame(() => {
    ref.current += (scrollState.progress - ref.current) * smooth
  })

  return ref
}
