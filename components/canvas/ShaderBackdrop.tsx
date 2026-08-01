'use client'

import { useEffect, useRef } from 'react'
import { ACT_BY_ID } from '@/lib/motion/acts'
import { scrollState } from '@/lib/scroll/progress'

/**
 * The flow field behind everything.
 *
 * Hand-written GLSL on its own canvas rather than inside the R3F tree: it is
 * a full-screen effect that has nothing to do with the scene camera, and
 * keeping it separate means the moving camera can never drag it around.
 *
 * Domain-warped fbm noise, six octaves, with a soft pull toward the pointer.
 * Falls back to a flat gradient if WebGL is unavailable.
 */
export function ShaderBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return

    const gl = (cv.getContext('webgl') ||
      cv.getContext('experimental-webgl')) as WebGLRenderingContext | null

    if (!gl) {
      cv.style.background = 'linear-gradient(160deg, #12131a, #07070a)'
      return
    }

    const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

    const FS = `
      precision highp float;
      uniform vec2 u_res; uniform float u_t; uniform vec2 u_m;

      vec2 hash(vec2 p){
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
                   mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)), dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
        return v;
      }

      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
        float t = u_t * 0.04;

        vec2 md = uv - u_m;
        float pull = 0.15 / (dot(md, md) + 0.15);

        vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 + vec2(3.2, 1.4) - t));
        vec2 r = vec2(fbm(uv * 1.6 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3 + pull * 0.28),
                      fbm(uv * 1.6 + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
        float f = fbm(uv * 1.6 + 3.4 * r);

        vec3 col = mix(vec3(0.027, 0.027, 0.039), vec3(0.05, 0.056, 0.082), clamp(f * f * 3.2, 0.0, 1.0));
        col = mix(col, vec3(1.0, 0.369, 0.102), clamp(pow(max(r.x, 0.0), 2.4) * 1.4 + pull * 0.07, 0.0, 0.72));
        col = mix(col, vec3(0.357, 0.482, 1.0), clamp(pow(max(q.y, 0.0), 3.4) * 0.8, 0.0, 0.30));
        col += vec3(1.0, 0.369, 0.102) * pow(clamp(f, 0.0, 1.0), 7.0) * 0.45;

        col *= clamp(1.0 - 0.7 * length(uv * vec2(0.6, 1.0)), 0.0, 1.0);
        col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.026;

        gl_FragColor = vec4(col, 1.0);
      }`

    /**
     * Compile with the status actually checked.
     *
     * Silently ignoring this is how a broken program ends up bound: the draw
     * then does nothing, the canvas keeps whatever the compositor gave it,
     * and the page renders a colour nobody chose.
     */
    const fail = (why: string) => {
      console.error('[ShaderBackdrop] ' + why)
      cv.style.background = 'linear-gradient(160deg, #12131a, #07070a)'
    }

    const sh = (type: number, src: string, name: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        fail(name + ' shader failed: ' + gl.getShaderInfoLog(s))
        return null
      }
      return s
    }

    const vs = sh(gl.VERTEX_SHADER, VS, 'vertex')
    const fs = sh(gl.FRAGMENT_SHADER, FS, 'fragment')
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      fail('link failed: ' + gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // never composite over an uninitialised buffer
    gl.clearColor(0.027, 0.027, 0.039, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uT = gl.getUniformLocation(prog, 'u_t')
    const uM = gl.getUniformLocation(prog, 'u_m')

    let mx = 0
    let my = 0
    let tx = 0
    let ty = 0

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX - innerWidth / 2) / innerHeight
      ty = -(e.clientY - innerHeight / 2) / innerHeight
    }

    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5)
      cv.width = Math.max(1, Math.floor(cv.clientWidth * d))
      cv.height = Math.max(1, Math.floor(cv.clientHeight * d))
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(uRes, cv.width, cv.height)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', size)
    size()

    // The field belongs to the opening shot. Past the title it fades out and
    // stops drawing, so the rest of the page is clean dark and the GPU is idle
    // for eight of the nine screens.
    const fadeEnd = ACT_BY_ID.title.end
    const t0 = performance.now()
    let raf = 0
    let shown = 1

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)

      const target = Math.max(0, 1 - scrollState.progress / fadeEnd)
      shown += (target - shown) * 0.15
      cv.style.opacity = String(shown)
      if (shown < 0.01) return // offscreen: skip the draw entirely

      mx += (tx - mx) * 0.045
      my += (ty - my) * 0.045
      gl.uniform1f(uT, (now - t0) / 1000)
      gl.uniform2f(uM, mx, my)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', size)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
