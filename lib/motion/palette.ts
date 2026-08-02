/**
 * The 3D layer cannot read CSS custom properties, so the palette is
 * mirrored here. These MUST stay in sync with styles/tokens.css.
 *
 * Same role names as the CSS: `paper` is the base surface (warm cream),
 * `ink` is the foreground on top of it (near-black). Light palette.
 */
export const PALETTE = {
  paper: '#F8F6F1',
  paper2: '#EFEDE8',
  paper3: '#E4E2DC',
  ink: '#0A0B0F',
  ink2: '#5A5E6D',
  rule: '#D4D2CC',
  molten: '#E8470A',
  moltenSoft: '#FF8C40',
  ice: '#2B4FD0',
} as const

export type PaletteKey = keyof typeof PALETTE
