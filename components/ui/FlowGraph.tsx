'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface NodeDef {
  x: number
  y: number
  kind: 'Trigger' | 'Filter' | 'Action' | 'Branch' | 'Output'
  label: string
}

const NODES: NodeDef[] = [
  { x: 0.04, y: 0.1, kind: 'Trigger', label: 'Enquiry form submitted' },
  { x: 0.29, y: 0.04, kind: 'Filter', label: 'Real lead?' },
  { x: 0.29, y: 0.56, kind: 'Action', label: 'Create CRM record' },
  { x: 0.55, y: 0.24, kind: 'Branch', label: 'Budget stated?' },
  { x: 0.79, y: 0.05, kind: 'Output', label: 'Send proposal' },
  { x: 0.79, y: 0.47, kind: 'Output', label: 'Post to Slack' },
  { x: 0.55, y: 0.76, kind: 'Action', label: 'Book intro call' },
]

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 6],
  [3, 4],
  [3, 5],
  [6, 5],
]

const KIND_COLOR: Record<NodeDef['kind'], string> = {
  Trigger: 'var(--color-molten)',
  Filter: 'var(--color-ink-2)',
  Action: 'var(--color-ink-2)',
  Branch: 'var(--color-ink-2)',
  Output: 'var(--color-ice)',
}

/**
 * A live n8n-shaped graph. Every node drags; the bezier edges and the packets
 * travelling along them re-route in real time.
 *
 * This is the one place on the site that demonstrates the lead service rather
 * than describing it. It is decoration in the accessibility sense — the same
 * information is stated in the prose beside it — so it is hidden from
 * assistive tech rather than turned into a fake interactive widget.
 */
export function FlowGraph() {
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const pktRefs = useRef<(SVGCircleElement | null)[]>([])
  const pos = useRef<{ x: number; y: number }[]>([])
  const dragging = useRef<number | null>(null)
  const offset = useRef({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  const paint = useCallback(() => {
    const box = wrap.current
    if (!box) return

    nodeRefs.current.forEach((el, i) => {
      const p = pos.current[i]
      if (el && p) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
    })

    EDGES.forEach(([from, to], i) => {
      const path = pathRefs.current[i]
      const a = nodeRefs.current[from]
      const b = nodeRefs.current[to]
      const pa = pos.current[from]
      const pb = pos.current[to]
      if (!path || !a || !b || !pa || !pb) return

      const ax = pa.x + a.offsetWidth
      const ay = pa.y + a.offsetHeight / 2
      const bx = pb.x
      const by = pb.y + b.offsetHeight / 2
      const dx = Math.max(40, Math.abs(bx - ax) * 0.45)

      path.setAttribute('d', `M ${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`)
    })
  }, [])

  const layout = useCallback(() => {
    const box = wrap.current
    if (!box) return
    const w = box.clientWidth
    const h = box.clientHeight
    pos.current = NODES.map((n, i) => {
      const el = nodeRefs.current[i]
      const nw = el?.offsetWidth ?? 160
      const nh = el?.offsetHeight ?? 56
      return {
        x: Math.max(0, Math.min(w - nw, n.x * w)),
        y: Math.max(0, Math.min(h - nh, n.y * h)),
      }
    })
    paint()
    setReady(true)
  }, [paint])

  useEffect(() => {
    layout()
    const ro = new ResizeObserver(layout)
    if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [layout])

  // packets
  useEffect(() => {
    let raf = 0
    let t = 0
    const tick = () => {
      t += 0.0042
      EDGES.forEach((_, i) => {
        const path = pathRefs.current[i]
        const dot = pktRefs.current[i]
        if (!path || !dot) return
        const len = path.getTotalLength()
        if (!len) {
          dot.style.opacity = '0'
          return
        }
        const u = (t + i * 0.14) % 1
        const pt = path.getPointAtLength(u * len)
        dot.setAttribute('cx', String(pt.x))
        dot.setAttribute('cy', String(pt.y))
        dot.style.opacity = String(Math.sin(u * Math.PI) * 0.95)
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pos.current[i]
    if (!p) return
    dragging.current = i
    offset.current = { x: e.clientX - p.x, y: e.clientY - p.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onMove = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current !== i) return
    const box = wrap.current
    const el = nodeRefs.current[i]
    if (!box || !el) return
    pos.current[i] = {
      x: Math.max(0, Math.min(box.clientWidth - el.offsetWidth, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(box.clientHeight - el.offsetHeight, e.clientY - offset.current.y)),
    }
    paint()
  }

  const onUp = () => {
    dragging.current = null
  }

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="border-rule bg-paper raised relative h-[clamp(400px,50vw,540px)] touch-none overflow-hidden border"
      style={{
        backgroundImage:
          'linear-gradient(var(--color-rule) 1px, transparent 1px), linear-gradient(90deg, var(--color-rule) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    >
      <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full">
        {EDGES.map((_, i) => (
          <path
            key={`e${i}`}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            fill="none"
            stroke="var(--color-rule-2)"
            strokeWidth={1.5}
          />
        ))}
        {EDGES.map((_, i) => (
          <circle
            key={`p${i}`}
            ref={(el) => {
              pktRefs.current[i] = el
            }}
            r={3.5}
            fill="var(--color-molten)"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>

      {NODES.map((n, i) => (
        <div
          key={n.label}
          ref={(el) => {
            nodeRefs.current[i] = el
          }}
          onPointerDown={onDown(i)}
          onPointerMove={onMove(i)}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="border-rule-2 bg-paper hover:border-molten absolute top-0 left-0 w-[clamp(128px,15vw,178px)] cursor-grab touch-none border px-3 py-2.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-200 select-none active:cursor-grabbing"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <span className="text-ink-3 flex items-center gap-1.5 font-mono text-[8.5px] tracking-[0.2em] uppercase">
            <i
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: KIND_COLOR[n.kind] }}
            />
            {n.kind}
          </span>
          <span className="font-display mt-1 block text-[clamp(12px,1.4vw,14px)] leading-tight font-semibold tracking-[-0.01em]">
            {n.label}
          </span>
        </div>
      ))}
    </div>
  )
}
