'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/motion/palette'
import { useMasterProgress } from '../useActProgress'

/**
 * The room the camera travels through.
 *
 * Without this the canvas is empty after act 01 and the "one continuous
 * camera" reads as one scene followed by nothing. These slabs sit along the
 * camera path at the x offsets in CAMERA_KEYS, so every act has depth behind
 * the copy. Cheap geometry, no shadows — this is atmosphere, not the subject.
 */
const SLABS: { pos: [number, number, number]; scale: [number, number, number]; accent?: boolean }[] = [
  // act 02–03 — capability monoliths
  { pos: [8, -0.6, -4], scale: [1.1, 5.4, 1.1] },
  { pos: [12, 1.2, -7], scale: [0.8, 7.5, 0.8], accent: true },
  { pos: [16, -1.4, -3], scale: [1.4, 3.8, 1.4] },
  { pos: [19, 0.9, -8], scale: [0.9, 6.2, 0.9] },
  // act 04 — automation
  { pos: [25, -1.8, -5], scale: [2.6, 0.14, 2.6] },
  { pos: [28, 1.6, -6], scale: [2.2, 0.14, 2.2], accent: true },
  { pos: [31, -0.4, -9], scale: [3.0, 0.14, 3.0] },
  // act 05 — the build
  { pos: [38, -0.9, -5], scale: [1.6, 1.6, 1.6] },
  { pos: [42, 1.4, -7], scale: [1.1, 3.4, 1.1] },
  // act 06 — terms
  { pos: [52, -1.2, -6], scale: [1.2, 4.6, 1.2] },
  { pos: [57, 1.0, -8], scale: [0.9, 5.8, 0.9], accent: true },
  // act 07 — close
  { pos: [63, -0.8, -9], scale: [1.5, 4.2, 1.5] },
  { pos: [69, 1.1, -11], scale: [1.2, 6.6, 1.2] },
]

export function Monoliths() {
  const group = useRef<THREE.Group>(null)
  const master = useMasterProgress(0.08)

  const materials = useMemo(
    () => ({
      base: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PALETTE.paper3),
        roughness: 0.85,
        metalness: 0.02,
        transparent: true,
        opacity: 0.92,
      }),
      accent: new THREE.MeshStandardMaterial({
        color: new THREE.Color(PALETTE.molten),
        roughness: 0.55,
        metalness: 0.05,
        transparent: true,
        opacity: 0.85,
      }),
    }),
    [],
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      // a slow, uneven drift so the room never reads as a static backdrop
      child.rotation.y = t * 0.05 + i
      child.position.y += Math.sin(t * 0.4 + i * 1.7) * 0.0016
    })
    // the whole room settles a little as the film advances
    group.current.position.y = -master.current * 0.8
  })

  return (
    <group ref={group}>
      {SLABS.map((s, i) => (
        <mesh
          key={i}
          position={s.pos}
          scale={s.scale}
          material={s.accent ? materials.accent : materials.base}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
    </group>
  )
}
