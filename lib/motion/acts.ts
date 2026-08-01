/**
 * The film timeline.
 *
 * The whole home page is one continuous camera move. Acts are windows on
 * a single normalised 0..1 scroll progress — they are NOT independent
 * scroll containers. Both the DOM overlays and the camera read from here,
 * which is what keeps picture and sound in sync.
 */

export type ActId =
  | 'title'
  | 'position'
  | 'capabilities'
  | 'automation'
  | 'build'
  | 'proof'
  | 'close'

export interface Act {
  id: ActId
  /** inclusive start on the master 0..1 timeline */
  start: number
  /** exclusive end on the master 0..1 timeline */
  end: number
  /** viewport heights this act occupies — drives page height */
  vh: number
  label: string
}

export const ACTS: Act[] = [
  { id: 'title', start: 0.0, end: 0.13, vh: 100, label: 'Title' },
  { id: 'position', start: 0.13, end: 0.25, vh: 90, label: 'Position' },
  { id: 'capabilities', start: 0.25, end: 0.45, vh: 160, label: 'Capabilities' },
  { id: 'automation', start: 0.45, end: 0.6, vh: 130, label: 'Automation' },
  { id: 'build', start: 0.6, end: 0.76, vh: 140, label: 'The build' },
  { id: 'proof', start: 0.76, end: 0.9, vh: 120, label: 'Proof' },
  { id: 'close', start: 0.9, end: 1.0, vh: 90, label: 'Close' },
]

export const ACT_BY_ID = Object.fromEntries(ACTS.map((a) => [a.id, a])) as Record<ActId, Act>

/** Total page height in vh — the scroll track the camera runs along. */
export const TOTAL_VH = ACTS.reduce((n, a) => n + a.vh, 0)

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

/* ── camera keyframes ──────────────────────────────────────────────
   One keyframe per act boundary. CameraRig interpolates between them
   with an eased blend, so the move reads as a continuous dolly rather
   than a set of cuts.
   ─────────────────────────────────────────────────────────────── */

export interface CameraKey {
  at: number
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

export const CAMERA_KEYS: CameraKey[] = [
  { at: 0.0, position: [0, 0, 7.5], lookAt: [0, 0, 0], fov: 42 },
  // push through the wordmark
  { at: 0.13, position: [0, 0, 1.2], lookAt: [0, 0, 0], fov: 52 },
  // pull back, type occludes
  { at: 0.25, position: [0, 0.4, 9], lookAt: [0, 0, -2], fov: 40 },
  // track sideways past the capability monoliths
  { at: 0.45, position: [14, 0.6, 8], lookAt: [14, 0, 0], fov: 38 },
  // orbit the automation graph
  { at: 0.6, position: [26, 3.4, 9.5], lookAt: [28, 0, 0], fov: 44 },
  // dolly into the build
  { at: 0.76, position: [40, 0.8, 7], lookAt: [40, 0, 0], fov: 40 },
  // lateral travel past the work
  { at: 0.9, position: [54, 0.5, 8.5], lookAt: [54, 0, 0], fov: 42 },
  // pull out wide for the close
  { at: 1.0, position: [66, 1.2, 15], lookAt: [66, 0, 0], fov: 46 },
]
