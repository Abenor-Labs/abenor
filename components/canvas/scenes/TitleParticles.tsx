'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/motion/palette'
import { useActProgress } from '../useActProgress'

/* Camera state for the title act. Must stay in step with CAMERA_KEYS[0]. */
const HERO_Z = 7.5
const HERO_FOV = 42

/*
  The mark is built in NORMALISED space: one unit = the width of the wordmark.
  Everything below — dispersal spread, repulsion radius, breathing — is a
  fraction of the mark, so the whole thing survives any viewport by being
  scaled as an object rather than rebuilt at a new size.
*/
const SPRING = 0.055
const DAMPING = 0.86
const REP_RADIUS = 0.09
const REP_STRENGTH = 0.0027
const BREATH_AMP = 0.0007
const BREATH_FREQ = 14
const SPREAD_X = 9 / 7.2
const SPREAD_Y = 5 / 7.2
const SPREAD_Z = 7 / 7.2

/*
  Dot pitch, in CSS pixels, that the mark should hold at EVERY width.

  This is the whole fix for small screens. The raster is a fixed 260px font,
  so a fixed sampling step means the pitch on screen is proportional to the
  viewport: ~3.5px at 1440, and 0.96px at 390. Below about 2px the dots touch
  and the wordmark stops being a particle field and becomes a black slab —
  which is exactly what a phone was getting. Deriving the step from the mark's
  real pixel width keeps the pitch constant instead.
*/
const PITCH_WIDE = 3.4
const PITCH_NARROW = 2.6
const MIN_STEP = 3
const MAX_STEP = 20

/**
 * A constant pitch keeps the mark from clogging, but it does not keep it
 * looking like the same mark: a phone-sized wordmark is only ~13 dots across
 * a stroke, so at desktop pitch it reads as a ghost next to the solid DOM
 * mark it replaces, and the handover shows as a weight drop. Tightening the
 * pitch below ~900px of mark restores the ink without ever reaching the
 * touching-dots territory that broke small screens in the first place.
 */
function targetPitch(markPx: number): number {
  const t = Math.min(1, Math.max(0, (markPx - 300) / 600))
  return PITCH_NARROW + (PITCH_WIDE - PITCH_NARROW) * t
}

const RASTER_FONT = 260
const MAX_PARTICLES = 7000

interface Metrics {
  /** mark width in world units */
  world: number
  /** mark centre in world units */
  worldX: number
  worldY: number
  /** mark width in CSS pixels */
  px: number
  /** mark centre in CSS pixels, y in document space so scroll cannot skew it */
  cxPx: number
  cyPx: number
}

/**
 * Where the DOM wordmark is, expressed in world units.
 *
 * The particle mark is not sized to the viewport — it is sized to the DOM
 * mark it replaces. That element already carries the responsive rules
 * (`clamp(58px, 15.5vw, 238px)` inside `.wrap`, which is gutter-padded and
 * capped at 1460px), so measuring it means the two marks agree at every
 * width by construction. Sizing the particles independently is what made
 * them overflow: it ignored both the gutters and the 238px cap.
 */
function measure(): Metrics {
  const vw = Math.max(1, window.innerWidth)
  const vh = Math.max(1, window.innerHeight)

  const visibleH = 2 * HERO_Z * Math.tan((HERO_FOV / 2) * (Math.PI / 180))
  const worldPerPx = (visibleH * (vw / vh)) / vw

  const el = document.querySelector('.wordmark-fallback')
  const r = el?.getBoundingClientRect()

  const px = r && r.width > 0 ? r.width : vw * 0.9
  const cxPx = r && r.width > 0 ? r.left + r.width / 2 : vw / 2
  const cyPx = r && r.width > 0 ? r.top + window.scrollY + r.height / 2 : vh / 2

  return {
    world: px * worldPerPx,
    worldX: (cxPx - vw / 2) * worldPerPx,
    worldY: -(cyPx - vh / 2) * worldPerPx,
    px,
    cxPx,
    cyPx,
  }
}

interface Raster {
  data: Uint8ClampedArray
  W: number
  H: number
}

function rasterise(): Raster | null {
  const cv = document.createElement('canvas')
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  const applyFont = () => {
    ctx.font = `800 ${RASTER_FONT}px "Bricolage Grotesque", sans-serif`
    ctx.letterSpacing = `${-0.05 * RASTER_FONT}px`
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
  }

  applyFont()
  const W = Math.max(400, Math.ceil(ctx.measureText('ABENOR').width) + 6)
  const H = Math.ceil(RASTER_FONT * 1.02)
  cv.width = W
  cv.height = H
  applyFont()
  ctx.fillText('ABENOR', W / 2, H / 2)

  return { data: ctx.getImageData(0, 0, W, H).data, W, H }
}

interface ParticleState {
  geo: THREE.BufferGeometry
  homePos: Float32Array
  randOff: Float32Array
  curPos: Float32Array
  velX: Float32Array
  velY: Float32Array
  count: number
  step: number
}

function sample(raster: Raster, step: number): ParticleState {
  const { data, W, H } = raster
  const pos: number[] = []
  const rnd: number[] = []
  const siz: number[] = []
  const hot: number[] = []

  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 140) {
        // normalised: one unit == the width of the wordmark
        pos.push((x - W / 2) / W, -(y - H / 2) / W, 0)
        rnd.push(
          (Math.random() - 0.5) * SPREAD_X,
          (Math.random() - 0.5) * SPREAD_Y,
          (Math.random() - 0.5) * SPREAD_Z,
        )
        siz.push(Math.random() < 0.075 ? 2.4 : 1.5)
        hot.push(Math.random() < 0.055 ? 1 : 0)
      }
    }
  }

  const count = pos.length / 3
  const homePos = new Float32Array(pos)
  const curPos = new Float32Array(homePos)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(curPos, 3))
  geo.setAttribute('aSize', new THREE.Float32BufferAttribute(siz, 1))
  geo.setAttribute('aHot', new THREE.Float32BufferAttribute(hot, 1))

  return {
    geo,
    homePos,
    randOff: new Float32Array(rnd),
    curPos,
    velX: new Float32Array(count),
    velY: new Float32Array(count),
    count,
    step,
  }
}

export function TitleParticles() {
  const [ps, setPs] = useState<ParticleState | null>(null)
  const pts = useRef<THREE.Points>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const raster = useRef<Raster | null>(null)
  const stepRef = useRef(0)
  const metrics = useRef<Metrics>({ world: 7, worldX: 0, worldY: 0, px: 1000, cxPx: 0, cyPx: 0 })
  const act = useActProgress('title', 0.1)
  const mouse = useRef(new THREE.Vector2(-99, -99))

  useEffect(() => {
    let cancelled = false
    let timer: number | undefined

    /*
      Rebuild only when the sampling step actually changes. Scale and position
      are object transforms applied every frame, so a resize that leaves the
      pitch alone costs nothing — which matters because mobile browsers fire
      resize on every URL-bar collapse.
    */
    const fit = () => {
      if (cancelled) return
      metrics.current = measure()

      const r = raster.current
      if (!r) return

      const px = metrics.current.px
      let step = Math.min(
        MAX_STEP,
        Math.max(MIN_STEP, Math.round((targetPitch(px) * r.W) / px)),
      )
      if (step === stepRef.current) return

      let next = sample(r, step)
      // Guard rather than decimate: thinning a sampled grid by index leaves
      // visible stripes, so coarsen the grid itself instead.
      while (next.count > MAX_PARTICLES && step < MAX_STEP) {
        next.geo.dispose()
        step += 1
        next = sample(r, step)
      }

      stepRef.current = step
      setPs(next)
    }

    const onResize = () => {
      metrics.current = measure()
      window.clearTimeout(timer)
      timer = window.setTimeout(fit, 150)
    }

    const start = () => {
      if (cancelled) return
      raster.current = rasterise()
      fit()
    }

    if (document.fonts?.ready) document.fonts.ready.then(start)
    else start()

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  useEffect(() => () => ps?.geo.dispose(), [ps])

  useEffect(() => {
    // Pointer mapped against the mark's own pixel box, so repulsion lands
    // where the dots visibly are at any viewport.
    const onMove = (e: PointerEvent) => {
      const m = metrics.current
      mouse.current.set(
        (e.clientX - m.cxPx) / m.px,
        -(e.clientY + window.scrollY - m.cyPx) / m.px,
      )
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInk: { value: new THREE.Color(PALETTE.ink) },
      uHot: { value: new THREE.Color(PALETTE.molten) },
      uDpr: { value: 1 },
      uFade: { value: 1 },
    }),
    [],
  )

  useFrame((s, delta) => {
    if (!ps || !mat.current) return
    const { homePos, randOff, curPos, velX, velY, count, geo } = ps
    const u = mat.current.uniforms
    const m = metrics.current

    if (pts.current) {
      pts.current.position.set(m.worldX, m.worldY, 0)
      pts.current.scale.setScalar(m.world)
    }

    u.uTime.value += delta
    u.uDpr.value = Math.min(s.gl.getPixelRatio(), 2)

    const disperse = act.current
    /*
      Must reach a true zero. At `* 0.85` this floored at 0.15, which sounds
      like nothing and is not: the title act ends one screen in, so every
      section after it was read through 7000 leftover particles. On a phone
      they pack into a quarter of the area and the 13px answer copy in Act 03
      is genuinely illegible behind them. ShaderBackdrop already fades to zero
      and stops drawing; this now matches it.
    */
    u.uFade.value = Math.max(0, 1.0 - disperse)

    // Invisible: skip the simulation entirely rather than keep integrating
    // positions nobody can see for the remaining six acts.
    if (u.uFade.value <= 0.001) return

    const t = u.uTime.value

    const repFactor = 1 - Math.min(disperse * 5, 1)
    const mx = mouse.current.x
    const my = mouse.current.y
    const repR2 = REP_RADIUS * REP_RADIUS
    const repS = REP_STRENGTH * repFactor

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      const hx = homePos[i3]
      const hy = homePos[i3 + 1]

      const tx = hx + Math.sin(t * 0.5 + hy * BREATH_FREQ) * BREATH_AMP + randOff[i3] * disperse
      const ty = hy + Math.cos(t * 0.4 + hx * BREATH_FREQ) * BREATH_AMP + randOff[i3 + 1] * disperse

      let ax = (tx - curPos[i3]) * SPRING
      let ay = (ty - curPos[i3 + 1]) * SPRING

      if (repFactor > 0.01) {
        const dx = curPos[i3] - mx
        const dy = curPos[i3 + 1] - my
        const d2 = dx * dx + dy * dy
        if (d2 < repR2 && d2 > 0.0000001) {
          const f = (((repR2 - d2) / repR2) * repS) / Math.sqrt(d2)
          ax += dx * f
          ay += dy * f
        }
      }

      velX[i] = (velX[i] + ax) * DAMPING
      velY[i] = (velY[i] + ay) * DAMPING

      curPos[i3] += velX[i]
      curPos[i3 + 1] += velY[i]
      curPos[i3 + 2] = randOff[i3 + 2] * disperse
    }

    ;(geo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
  })

  if (!ps) return null

  return (
    <points ref={pts} geometry={ps.geo} frustumCulled={false}>
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
  attribute float aSize;
  attribute float aHot;

  uniform float uDpr;
  uniform float uFade;

  varying float vHot;
  varying float vFade;

  void main() {
    vHot = aHot;
    vFade = uFade;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uDpr * (10.0 / -mv.z);
  }
`

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uInk;
  uniform vec3 uHot;

  varying float vHot;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.42, d);
    if (a < 0.01) discard;

    vec3 col = mix(uInk, uHot, vHot);
    float alpha = a * vFade;
    alpha = clamp(alpha * 1.8, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`
