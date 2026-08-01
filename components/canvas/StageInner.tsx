'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { TitleParticles } from './scenes/TitleParticles'
import { Monoliths } from './scenes/Monoliths'

/**
 * Flags the document once the canvas has actually painted, which is the
 * signal CSS uses to hand the wordmark over from DOM to particles.
 * Waits a couple of frames so the handover never reveals an empty canvas.
 */
function CanvasReady() {
  const [frames, setFrames] = useState(0)

  useFrame(() => {
    if (frames < 3) setFrames((n) => n + 1)
  })

  useEffect(() => {
    if (frames >= 3) document.documentElement.dataset.canvas = 'ready'
    return () => {
      delete document.documentElement.dataset.canvas
    }
  }, [frames])

  return null
}

/**
 * THE canvas. One instance, fixed to the viewport, alive for the whole page.
 *
 * This is the mechanism behind "one continuous camera": scenes live in a
 * shared world at different x offsets, and the rig travels between them.
 * Mounting a canvas per section would defeat the entire idea.
 */
export function StageInner() {
  const [small, setSmall] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const set = () => setSmall(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <Canvas
        dpr={[1, small ? 1.4 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7.5], fov: 42, near: 0.1, far: 200 }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 8]} intensity={1.4} />
        <Suspense fallback={null}>
          <TitleParticles />
          {/* the room is atmosphere only — skipped on small screens where it costs frames */}
          {!small && <Monoliths />}
        </Suspense>
        <CanvasReady />
      </Canvas>
    </div>
  )
}
