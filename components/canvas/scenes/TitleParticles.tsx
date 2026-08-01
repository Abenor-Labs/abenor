'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/motion/palette'
import { useActProgress } from '../useActProgress'

/** World width the wordmark spans. Camera keys assume this. */
const WORLD_W = 7.2
const MAX_POINTS = 9000

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
      const step = 3

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 140) {
            pos.push((x - W / 2) * scale, -(y - H / 2) * scale, (Math.random() - 0.5) * 0.06)
            rnd.push(
              (Math.random() - 0.5) * 9,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 7,
            )
            siz.push(Math.random() < 0.08 ? 2.0 : 1.25)
            hot.push(Math.random() < 0.09 ? 1 : 0)
          }
        }
      }

      // decimate evenly rather than truncating, so the mark stays legible
      let P = pos, R = rnd, S = siz, Hh = hot
      const count = siz.length
      if (count > MAX_POINTS) {
        const k = count / MAX_POINTS
        P = []; R = []; S = []; Hh = []
        for (let i = 0; i < MAX_POINTS; i++) {
          const j = Math.floor(i * k)
          P.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
          R.push(rnd[j * 3], rnd[j * 3 + 1], rnd[j * 3 + 2])
          S.push(siz[j]); Hh.push(hot[j])
        }
      }

      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
      g.setAttribute('aRand', new THREE.Float32BufferAttribute(R, 3))
      g.setAttribute('aSize', new THREE.Float32BufferAttribute(S, 1))
      g.setAttribute('aHot', new THREE.Float32BufferAttribute(Hh, 1))
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

    // idle drift so the mark breathes before any scrolling happens
    p.x += sin(uTime * 0.5 + position.y * 2.0) * 0.012;
    p.y += cos(uTime * 0.4 + position.x * 2.0) * 0.012;

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
    gl_PointSize = aSize * uDpr * (14.0 / -mv.z);
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
