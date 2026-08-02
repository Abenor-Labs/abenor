'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE } from '@/lib/motion/palette'
import { useActProgress } from '../useActProgress'

const FILL = 0.9
const HERO_Z = 7.5
const HERO_FOV = 42

function heroWorldWidth(): number {
  const visibleH = 2 * HERO_Z * Math.tan((HERO_FOV / 2) * (Math.PI / 180))
  const aspect = window.innerWidth / Math.max(1, window.innerHeight)
  return visibleH * aspect * FILL
}

const STEP = 4
const MAX_PARTICLES = 7000
const SPRING = 0.055
const DAMPING = 0.86
const REP_RADIUS_FRAC = 0.09
const REP_STRENGTH_FRAC = 0.0027

interface ParticleState {
  geo: THREE.BufferGeometry
  homePos: Float32Array
  randOff: Float32Array
  curPos: Float32Array
  velX: Float32Array
  velY: Float32Array
  count: number
}

export function TitleParticles() {
  const [ps, setPs] = useState<ParticleState | null>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const worldW = useRef(7.2)
  const act = useActProgress('title', 0.1)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector2(-99, -99))

  useEffect(() => {
    let cancelled = false

    const build = () => {
      if (cancelled) return

      const FONT = 260
      const cv = document.createElement('canvas')
      const ctx = cv.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      const applyFont = () => {
        ctx.font = `800 ${FONT}px "Bricolage Grotesque", sans-serif`
        ctx.letterSpacing = '-13px'
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
      }

      applyFont()
      const measured = ctx.measureText('ABENOR').width
      const W = Math.max(400, Math.ceil(measured) + 6)
      const H = Math.ceil(FONT * 1.02)
      cv.width = W
      cv.height = H
      applyFont()
      ctx.fillText('ABENOR', W / 2, H / 2)

      const imgData = ctx.getImageData(0, 0, W, H).data
      let posArr: number[] = []
      let rndArr: number[] = []
      let sizArr: number[] = []
      let hotArr: number[] = []

      worldW.current = heroWorldWidth()
      const scale = worldW.current / W
      const spread = worldW.current / 7.2

      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          if (imgData[(y * W + x) * 4 + 3] > 140) {
            posArr.push((x - W / 2) * scale, -(y - H / 2) * scale, 0)
            rndArr.push(
              (Math.random() - 0.5) * 9 * spread,
              (Math.random() - 0.5) * 5 * spread,
              (Math.random() - 0.5) * 7 * spread,
            )
            sizArr.push(Math.random() < 0.075 ? 2.4 : 1.5)
            hotArr.push(Math.random() < 0.055 ? 1 : 0)
          }
        }
      }

      // Cap particle count like the mockup
      if (posArr.length / 3 > MAX_PARTICLES) {
        const total = posArr.length / 3
        const step = total / MAX_PARTICLES
        const p2: number[] = [], r2: number[] = [], s2: number[] = [], h2: number[] = []
        for (let i = 0; i < MAX_PARTICLES; i++) {
          const j = Math.floor(i * step)
          const j3 = j * 3
          p2.push(posArr[j3], posArr[j3 + 1], posArr[j3 + 2])
          r2.push(rndArr[j3], rndArr[j3 + 1], rndArr[j3 + 2])
          s2.push(sizArr[j])
          h2.push(hotArr[j])
        }
        posArr = p2; rndArr = r2; sizArr = s2; hotArr = h2
      }

      const count = posArr.length / 3
      const homePos = new Float32Array(posArr)
      const randOff = new Float32Array(rndArr)
      const curPos = new Float32Array(homePos)
      const velX = new Float32Array(count)
      const velY = new Float32Array(count)

      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(curPos, 3))
      g.setAttribute('aSize', new THREE.Float32BufferAttribute(sizArr, 1))
      g.setAttribute('aHot', new THREE.Float32BufferAttribute(hotArr, 1))

      setPs({ geo: g, homePos, randOff, curPos, velX, velY, count })
    }

    if (document.fonts?.ready) document.fonts.ready.then(build)
    else build()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => () => ps?.geo.dispose(), [ps])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
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

    u.uTime.value += delta
    u.uDpr.value = Math.min(s.gl.getPixelRatio(), 2)

    const disperse = act.current
    u.uFade.value = 1.0 - disperse * 0.85

    const t = u.uTime.value

    const repFactor = 1 - Math.min(disperse * 5, 1)
    const mx = mouse.current.x
    const my = mouse.current.y
    const ww = worldW.current
    const repR = ww * REP_RADIUS_FRAC
    const repR2 = repR * repR
    const repS = ww * REP_STRENGTH_FRAC * repFactor

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      const hx = homePos[i3]
      const hy = homePos[i3 + 1]

      const tx = hx + Math.sin(t * 0.5 + hy * 2.0) * 0.005 + randOff[i3] * disperse
      const ty = hy + Math.cos(t * 0.4 + hx * 2.0) * 0.005 + randOff[i3 + 1] * disperse

      let ax = (tx - curPos[i3]) * SPRING
      let ay = (ty - curPos[i3 + 1]) * SPRING

      if (repFactor > 0.01) {
        const dx = curPos[i3] - mx
        const dy = curPos[i3 + 1] - my
        const d2 = dx * dx + dy * dy
        if (d2 < repR2 && d2 > 0.00001) {
          const f = ((repR2 - d2) / repR2) * repS / Math.sqrt(d2)
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
    <points geometry={ps.geo} frustumCulled={false}>
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
