/**
 * The 3D layer cannot read CSS custom properties, so the palette is
 * mirrored here. These MUST stay in sync with styles/tokens.css.
 *
 * Same role names as the CSS: `paper` is the base surface, `ink` is the
 * foreground on top of it. The palette is dark.
 */
export const PALETTE = {
  paper: '#07070a',
  paper2: '#0d0e12',
  paper3: '#12131a',
  ink: '#efede8',
  ink2: '#83889a',
  rule: '#1f212b',
  molten: '#ff5e1a',
  moltenSoft: '#ffae6b',
  ice: '#5b7bff',
} as const

export type PaletteKey = keyof typeof PALETTE
