# Abenor v2 · Design

Machine-readable tokens: `.impeccable/design.json`.

## Ground

Paper `#FAFAF9` (stone-50 family) edge to edge. Nothing floats on shadows;
structure comes from hairlines (`#E7E5E4`) and whitespace. Zero border radius
everywhere. Elevation does not exist.

## Palette (computed, not guessed)

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| paper | `#FAFAF9` | page ground | |
| line | `#E7E5E4` | hairline rules | decorative |
| ink | `#1C1917` | primary text, filled buttons | 16.7:1 on paper |
| ink/70 | | secondary text | ~8.9:1 |
| ink/60 | | small mono captions floor | ~5.2:1 |
| ink/40 | | folio numerals ≥24px, decorative | large-text only |
| poster | `#C8102E` | the one accent | 5.6:1 on paper |
| poster-ground | | close section bg | paper text 5.9:1 |

Dark mode: media strategy, stone-950 ground, stone-100 ink, same red. Every
token has a dark variant; opacity values stay identical.

**One accent.** Red appears as: filled button hover, index markers, ticker
separators, the progress rule, the close flood. Never as body text color
except links marked by underline too.

## Type

IBM Plex Sans (300/400/500/600) display and body; IBM Plex Mono (400/500)
utility: eyebrows, folios, nav, meta rows, ticker. Loaded via `next/font`,
self-hosted, `display: swap`.

Scale (fluid where noted):

| Role | Spec |
| --- | --- |
| Wordmark | `clamp(4rem, 14vw, 12rem)` light, tracking `-0.04em`, leading .9 |
| H2 section | `clamp(2rem, 5vw, 3.75rem)` light tracking tight |
| H3 row title | `text-xl md:text-2xl` normal |
| Body | `text-base md:text-lg`, `max-w-[62ch]`, leading relaxed |
| Mono label | `text-xs` uppercase tracking `.08em` |

Headings are light, never bold. Emphasis inside body is `font-medium`.
Curly quotes and `…` always; straight quotes and three dots are bugs.
`text-balance` on headings, `text-pretty` on body.

## Layout

12-column grid, 8px base unit. Content `max-w-[76rem] mx-auto px-4 md:px-8`.
Section padding `py-20 md:py-32`. Sections separated by hairline top borders.
Asymmetric editorial split: eyebrow column left (col-span-3), content right
(col-span-9), collapsing to stacked on mobile.

Structure device: every section opens with a mono folio row
(`(01) THE LEAK`) that encodes real order, because this page is an argument
built stepwise. Numbering is information here, not decoration.

## Signature elements

1. **Kinetic wordmark**: per-letter typeset rise on load; the red period is
   the brand mark. Hero background is **The Setting Stick**: a canvas layout
   grid where a compositor head sets ink slugs cell by cell in reading order,
   word-gaps included, one red slug in ten. Static hairline grid under
   reduced motion.
2. **Typographic micro-system**: decode-in mono labels with a red setting
   head (hero eyebrow, process day-labels); rotating slug word in the hero
   sentence with a re-inking red underline; CTAs widen their tracking on
   hover like type being spaced.
3. **Folio indicator**: fixed bottom-left mono folio (01–07 + section name)
   tracking scroll position like page numbers; inverts with chrome on the
   poster.
4. **Press feedback**: tickers and the poster heading skew with scroll
   velocity, like a sheet moving through a press.
5. **Poster close**: solid red field, biggest type after the wordmark, chrome
   inverts via `[data-surface="poster"]` CSS variables. Happens once.

## Motion

Tokens:

```css
--ease-swiss-out: cubic-bezier(0.23, 1, 0.32, 1);
```

GSAP CustomEase `swiss` mirrors it. Durations: micro 150–200ms, reveals
600–800ms, marketing moments longer. Transform and opacity only. Stagger
60–90ms. Lenis smooth scroll (never under reduced motion), ScrollTrigger for
scrubs (process rule draw, hero composition), once-only entrance reveals.

Reduced motion contract: no Lenis, no canvas, no scrub transforms; reveals
render rest state; ticker becomes a static row; everything reachable.

## Chrome

Fixed header, hairline bottom, translucent paper backdrop. Left wordmark +
red slug. Center mono nav (Work, Process, Answers). Right filled Book-a-call.
2px red scroll-progress rule pinned above header. All colors flow from CSS
custom properties that flip under `[data-surface="poster"]`.

## Imagery

Documentary black-and-white photography only (AI-generated, labeled
*illustrative* in mono captions as `(FIG. 0n)`), CSS `grayscale` locked so
any source image lands on the paper/ink palette. No faces, no readable text
in images. Placements: site-wide paper-grain overlay (`paper-texture.jpg`,
multiply 5%), letterpress band between Work and Process (`band-press.jpg`),
desk figure in Studio (`studio-desk.jpg`), chaos figure in Leak
(`leak-desk.jpg`). Text never sits directly on an image.

## Don'ts

- No second accent, no gradients, no glows, no rounded corners
- No card grids where list rows work
- No `border-left` colored stripes
- No em dash in interface copy
- No grey picked by eye; contrast table above is the source
- No animation on the calendar/email CTAs beyond 150ms feedback
