/**
 * The film timeline.
 *
 * The whole home page is one continuous camera move. Acts are windows on a
 * single normalised 0..1 scroll progress — they are NOT independent scroll
 * containers.
 *
 * Act boundaries are DERIVED from each act's height. Hand-written start/end
 * fractions drift the moment a section grows, and then the camera cuts in the
 * wrong place with nothing obviously broken. Declaring height once and
 * computing the rest keeps picture and sound locked together.
 */

export type ActId =
  | 'title'
  | 'position'
  | 'problems'
  | 'automation'
  | 'build'
  | 'proof'
  | 'faq'
  | 'close'

interface ActDef {
  id: ActId
  /** viewport heights this act occupies — the single source of proportion */
  vh: number
  label: string
  /** camera state on entering this act */
  camera: { position: [number, number, number]; lookAt: [number, number, number]; fov: number }
}

const DEFS: ActDef[] = [
  {
    id: 'title',
    vh: 100,
    label: 'Title',
    camera: { position: [0, 0, 7.5], lookAt: [0, 0, 0], fov: 42 },
  },
  {
    id: 'position',
    vh: 65,
    label: 'Studio',
    camera: { position: [0, 0.15, 3.2], lookAt: [0, 0, 0], fov: 50 },
  },
  {
    /* 140vh was sized for five hover-revealed rows of prose, then 110 for a
       three-column table. The third column has since gone, so this comes down
       again. The figure tracks the content: left high, the camera move
       stretches across a screen of empty paper. */
    id: 'problems',
    vh: 95,
    label: 'What we build',
    camera: { position: [1.2, 0.5, 9], lookAt: [0, 0, -2], fov: 40 },
  },
  {
    /* 185 covered a four-row "what changes" list and an itemised timebox that
       both said what the Act 03 table and the FAQ already say. Both are gone. */
    id: 'automation',
    vh: 150,
    label: 'Automation',
    camera: { position: [3, 0.8, 11], lookAt: [1.5, 0, -3], fov: 38 },
  },
  {
    id: 'build',
    vh: 165,
    label: 'Process',
    camera: { position: [4.5, 0.4, 12.5], lookAt: [3, 0, -4], fov: 40 },
  },
  {
    id: 'proof',
    vh: 110,
    label: 'Receipts',
    camera: { position: [5.2, 0.7, 13.2], lookAt: [4, 0, -4.8], fov: 42 },
  },
  {
    /* Sits after the receipts and before the ask on purpose. By here the
       visitor has stopped being sold to and started doing diligence, and
       diligence wants a list, not another paragraph. Height assumes every
       panel closed, which is how the section is first seen. */
    id: 'faq',
    vh: 105,
    label: 'Questions',
    camera: { position: [5.6, 0.85, 13.6], lookAt: [4.6, 0, -5.1], fov: 43 },
  },
  {
    id: 'close',
    vh: 95,
    label: 'Contact',
    camera: { position: [6, 1.0, 14], lookAt: [5, 0, -5.5], fov: 44 },
  },
]

export interface Act {
  id: ActId
  start: number
  end: number
  vh: number
  label: string
}

/** Total page height in vh — the scroll track the camera runs along. */
export const TOTAL_VH = DEFS.reduce((n, a) => n + a.vh, 0)

export const ACTS: Act[] = (() => {
  let run = 0
  return DEFS.map((d) => {
    const start = run / TOTAL_VH
    run += d.vh
    return { id: d.id, start, end: run / TOTAL_VH, vh: d.vh, label: d.label }
  })
})()

export const ACT_BY_ID = Object.fromEntries(ACTS.map((a) => [a.id, a])) as Record<ActId, Act>

/**
 * Map master progress to an act's own 0..1, clamped.
 * Before the act starts this is 0; after it ends, 1.
 */
export function actProgress(master: number, id: ActId): number {
  const a = ACT_BY_ID[id]
  if (!a) return 0
  const t = (master - a.start) / (a.end - a.start)
  return t < 0 ? 0 : t > 1 ? 1 : t
}

/** Which act the playhead is currently inside. */
export function currentAct(master: number): Act {
  for (const a of ACTS) if (master >= a.start && master < a.end) return a
  return ACTS[ACTS.length - 1]
}

export interface CameraKey {
  at: number
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

/**
 * One key per act boundary, plus a final key so the last act still has
 * something to interpolate toward. Positions stay near the origin now that
 * the scene is the particle wordmark alone — a long lateral journey through
 * empty space is movement, not cinema.
 */
export const CAMERA_KEYS: CameraKey[] = [
  ...DEFS.map((d, i) => ({ at: ACTS[i].start, ...d.camera })),
  {
    at: 1,
    position: [6.5, 1.2, 15.5] as [number, number, number],
    lookAt: [5.5, 0, -6] as [number, number, number],
    fov: 46,
  },
]
