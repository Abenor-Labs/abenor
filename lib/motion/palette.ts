/**
 * The 3D layer cannot read CSS custom properties, so the palette is
 * mirrored here. These MUST stay in sync with styles/tokens.css.
 */
export const PALETTE = {
  paper: '#f2f0ea',
  paper2: '#e8e5dd',
  paper3: '#dedad0',
  ink: '#0a0a0c',
  ink2: '#55534e',
  rule: '#d5d1c6',
  molten: '#ff4d0f',
  moltenSoft: '#ff8a52',
  ice: '#1b3bff',
} as const

export type PaletteKey = keyof typeof PALETTE
