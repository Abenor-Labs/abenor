'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CAMERA_KEYS } from '@/lib/motion/acts'
import { scrollState, prefersReducedMotion } from '@/lib/scroll/progress'

const tmpPos = new THREE.Vector3()
const tmpLook = new THREE.Vector3()

/** Smoothstep so keyframe boundaries read as a continuous move, not cuts. */
function ease(t: number): number {
  return t * t * (3 - 2 * t)
}

/**
 * The single camera. Scroll is the playhead; this interpolates position,
 * target and FOV across CAMERA_KEYS.
 *
 * Under reduced motion the camera still lands on the correct keyframe for
 * the current act, it just does not glide between them, and the mouse
 * parallax is disabled entirely.
 */
export function CameraRig() {
  const { camera } = useThree()
  const look = useRef(new THREE.Vector3())
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const reduced = useRef<boolean | null>(null)

  useFrame((state, delta) => {
    if (reduced.current === null) reduced.current = prefersReducedMotion()

    const p = scrollState.progress

    // locate the keyframe pair bracketing the playhead
    let i = 0
    while (i < CAMERA_KEYS.length - 2 && CAMERA_KEYS[i + 1].at < p) i++
    const a = CAMERA_KEYS[i]
    const b = CAMERA_KEYS[Math.min(i + 1, CAMERA_KEYS.length - 1)]
    const span = b.at - a.at
    const t = span > 0 ? ease(Math.min(1, Math.max(0, (p - a.at) / span))) : 0

    tmpPos.set(
      THREE.MathUtils.lerp(a.position[0], b.position[0], t),
      THREE.MathUtils.lerp(a.position[1], b.position[1], t),
      THREE.MathUtils.lerp(a.position[2], b.position[2], t),
    )
    tmpLook.set(
      THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], t),
      THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], t),
      THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], t),
    )

    if (!reduced.current) {
      // a breath of mouse parallax — enough to feel handheld, not enough to nauseate
      const m = mouse.current
      m.x += (m.tx - m.x) * 0.04
      m.y += (m.ty - m.y) * 0.04
      tmpPos.x += m.x * 0.45
      tmpPos.y += m.y * 0.3
    }

    const k = reduced.current ? 1 : 1 - Math.pow(0.001, delta)
    camera.position.lerp(tmpPos, k)
    look.current.lerp(tmpLook, k)
    camera.lookAt(look.current)

    const cam = camera as THREE.PerspectiveCamera
    const fov = THREE.MathUtils.lerp(a.fov, b.fov, t)
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, fov, k)
      cam.updateProjectionMatrix()
    }

    // pointer is normalised -1..1 by R3F already
    mouse.current.tx = state.pointer.x
    mouse.current.ty = state.pointer.y
  })

  return null
}
