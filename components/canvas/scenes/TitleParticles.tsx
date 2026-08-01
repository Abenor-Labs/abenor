'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/motion/palette'
import { useActProgress } from '../useActProgress'

/** World width the wordmark spans. Camera keys assume this. */
const WORLD_W = 7.2

/**
 * Sampling step in offscreen pixels.
 *
 * The offscreen canvas is ~1:1 with the rendered width, so this is the dot
 * pitch you actually see. Density is controlled HERE and only here — an
 * earlier version sampled at step 3 and then decimated to a point budget,
 * which threw away every k-th sample and destroyed the grid, leaving clumps
 * and speckle instead of letterforms. Coarser sampling, never decimation.
 */
const STEP = 4

/**
 * ABENOR, sampled from real rendered glyphs.
 *
 * The word is drawn once to an offscreen 2D canvas, its opaque pixels become
 * point positions, and a shader handles dispersal and cursor repulsion on the
 * GPU. Sampling the real font (rather than approximating letterforms) is what
 * keeps the mark on-brand at every size.
 */
export function TitleParticles() {
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const act = useActProgress('title', 0.1)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector2(-99, -99))

  useEffect(() => {
    let cancelled = false

    const build = () => {
      if (cancelled) return

      const W = 1200
      const H = 380
      const cv = document.createElement('canvas')
      cv.width = W
      cv.height = H
      const ctx = cv.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `800 250px "Bricolage Grotesque", sans-serif`
      ctx.letterSpacing = '-12px'
      ctx.fillText('ABENOR', W / 2, H / 2)

      const data = ctx.getImageData(0, 0, W, H).data
      const pos: number[] = []
      const rnd: number[] = []
      const siz: number[] = []
      const hot: number[] = []

      const scale = WORLD_W / W

      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          if (data[(y * W + x) * 4 + 3] > 140) {
            // exact grid position, no z jitter — depth variation reads as
            // inconsistent dot size once perspective is applied
            pos.push((x - W / 2) * scale, -(y - H / 2) * scale, 0)
            rnd.push(
              (Math.random() - 0.5) * 9,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 7,
            )
            siz.push(Math.random() < 0.07 ? 1.7 : 1.05)
            hot.push(Math.random() < 0.055 ? 1 : 0)
          }
        }
      }

      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      g.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 3))
      g.setAttribute('aSize', new THREE.Float32BufferAttribute(siz, 1))
      g.setAttribute('aHot', new THREE.Float32BufferAttribute(hot, 1))
      setGeo(g)
    }

    if (document.fonts?.ready) document.fonts.ready.then(build)
    else build()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => () => geo?.dispose(), [geo])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // screen → world on the z=0 plane, good enough for a repulsion field
      mouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * viewport.width,
        -(e.clientY / window.innerHeight - 0.5) * viewport.height,
      )
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [viewport.width, viewport.height])

  const uniforms = useMemo(
    () => ({
      uDisperse: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-99, -99) },
      uInk: { value: new THREE.Color(PALETTE.ink) },
      uHot: { value: new THREE.Color(PALETTE.molten) },
      uDpr: { value: 1 },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    const u = mat.current.uniforms
    u.uDisperse.value = act.current
    u.uTime.value += delta
    u.uDpr.value = Math.min(state.gl.getPixelRatio(), 2)
    ;(u.uMouse.value as THREE.Vector2).lerp(mouse.current, 0.12)
  })

  if (!geo) return null

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </points>
  )
}

const VERT = /* glsl */ `
  attribute vec3 aRand;
  attribute float aSize;
  attribute float aHot;

  uniform float uDisperse;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uDpr;

  varying float vHot;
  varying float vFade;

  void main() {
    vHot = aHot;

    vec3 p = position;

    // idle drift so the mark breathes — small enough that the grid holds
    p.x += sin(uTime * 0.5 + position.y * 2.0) * 0.005;
    p.y += cos(uTime * 0.4 + position.x * 2.0) * 0.005;

    // scroll dispersal
    p += aRand * uDisperse;

    // cursor repulsion — a tight swirl, not a crater.
    // radius is in world units and the mark is 7.2 wide, so anything much
    // above 0.5 punches a hole through whole letters.
    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float force = smoothstep(0.46, 0.0, dist) * 0.3;
    p.xy += normalize(d + 1e-5) * force;

    vFade = 1.0 - uDisperse * 0.85;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // ~2px at rest: dots should sit inside the 4px pitch, not merge into it
    gl_PointSize = aSize * uDpr * (11.0 / -mv.z);
  }
`

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uInk;
  uniform vec3 uHot;

  varying float vHot;
  varying float vFade;

  void main() {
    // round points with a soft edge
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.32, length(c));
    if (a < 0.01) discard;

    vec3 col = mix(uInk, uHot, vHot);
    gl_FragColor = vec4(col, a * vFade);
  }
`
