---
name: Abenor
description: A software studio that stops the copy-pasting. Foundry-floor palette, structural rules, one molten accent.
colors:
  paper: "#F8F6F1"
  paper-2: "#EFEDE8"
  paper-3: "#E4E2DC"
  ink: "#0A0B0F"
  ink-2: "#5A5E6D"
  ink-3: "#6A6D7C"
  rule: "#D4D2CC"
  rule-2: "#C0BEB8"
  molten: "#E8470A"
  molten-deep: "#C23A05"
  molten-soft: "#FF8C40"
  ice: "#2B4FD0"
  cta-label: "#FFF7F2"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(58px, 15.5vw, 238px)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 5.4vw, 72px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(19px, 2.6vw, 34px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body-lead:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(17px, 2.3vw, 30px)"
    fontWeight: 400
    lineHeight: 1.28
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.22em"
rounded:
  none: "0px"
  sm: "4px"
  full: "9999px"
spacing:
  gutter: "clamp(18px, 4vw, 64px)"
  measure: "1460px"
  section-gap: "clamp(26px, 4vw, 50px)"
  row: "clamp(22px, 3vw, 40px)"
components:
  button-primary:
    backgroundColor: "{colors.molten-deep}"
    textColor: "{colors.cta-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "20px 40px"
  button-primary-hover:
    backgroundColor: "{colors.molten-deep}"
    textColor: "{colors.cta-label}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0px"
  nav-link-active:
    textColor: "{colors.molten-deep}"
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 3vw, 40px) 0px"
  list-row-hover:
    backgroundColor: "{colors.paper-2}"
  panel:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(20px, 2.6vw, 32px)"
---

# Design System: Abenor

## 1. Overview

**Creative North Star: "The Foundry Floor"**

Cooled metal is the ground and molten metal is the event. The surface is a warm,
matte, slightly off-white that has been worked rather than printed on. Structure
is cut into it with hairline rules, never floated on top of it with cards. The
accent is heat: it appears where something is actually happening, and its rarity
is what makes it read as heat rather than as branding.

The system is loud in scale and quiet in ornament. A wordmark can occupy the full
measure of the viewport at 238px; the paragraph beneath it is 13px monospace with
no decoration whatsoever. That gap is the entire aesthetic. Boldness is bought
with size, weight, and the accent, never with gradients, glows, or containers.

This explicitly rejects two neighbors. It is not a **corporate consultancy**:
nothing here is navy, nothing hedges, no surface exists to look expensive. It is
not a **generic Indian dev-shop site**: no stock photography, no technology logo
wall, no floating chat bubble, no grid of twelve identical service cards. Where
those sites use decoration to imply competence, this one uses restraint plus one
unmissable accent, and lets the interface itself be the evidence.

**Key Characteristics:**

- Warm paper ground, near-black ink, a single molten orange that is spent
  sparingly and never diluted.
- Sharp corners by default. Radius is 0 unless the element is depicting
  something physical (a phone, an app window).
- 1px rules carry all structure. Cards are a last resort, and never nest.
- Monospace is the body voice, not an accent. Sans is reserved for scale.
- Extreme scale contrast: a 238px display against 10.5px labels in the same
  viewport.
- Heavy and confident components: real fills, thick hit areas, no timidity in
  the primary action.
- Exactly one inversion, at the close, where the ground drops to ink and the
  accent stops being a tint and becomes light.

## 2. Colors

A worked-metal palette: one warm neutral ground, one near-black, one heat.

### Primary

- **Molten Pour** (#E8470A): the heat. Reserved for large display type
  (`em` inside act headings), the status-bar pulse, the scroll progress bar, and
  accent particles in the hero. Never used for anything the visitor must read at
  small sizes: it measures 3.64:1 on paper, which clears the 3:1 large-text bar
  and fails AA everywhere else.
- **Forged Deep** (#C23A05): the working accent. 4.98:1 on paper, 5.08:1 under
  the CTA label color. Every accent that appears below 18px uses this: mono
  eyebrows, active nav links, the primary button fill, inline emphasis in body
  copy.
- **Ember** (#FF8C40): a highlight tint only, for glow and shadow tinting
  under the primary CTA. Never a text color, never a fill.

### Secondary

- **Quench Blue** (#2B4FD0): currently unused in the interface. Its one job was
  the cold half of the chromatic-split hover on the Act 03 headings, which has
  been removed — decoration on type the visitor is reading, which is what the
  motion gate exists to catch. It survives in the 3D palette and in the "Live."
  panel's second radial. Do not give it a new job on the page: a colour looking
  for one is how a second brand accent gets in.

### Neutral

- **Cooled Steel** (#F8F6F1): the ground. Every page starts here. Set on `html`
  rather than `body` so the WebGL layers can sit behind a transparent body.
- **Cooled Steel Shade** (#EFEDE8): the second surface. Panel fills, hover
  washes on list rows, the status bar.
- **Cooled Steel Deep** (#E4E2DC): the third surface, for skeleton bars and
  mockup interiors inside illustrative frames.
- **Cast Ink** (#0A0B0F): all primary text, the dark inversion surface, and the
  particle color in the hero.
- **Slag** (#5A5E6D): secondary body copy. The answer column in Act 03, captions,
  supporting paragraphs.
- **Ash** (#6A6D7C): tertiary labels only. Sits at exactly 4.75:1, chosen because
  the more obvious #6E7180 measured 4.49:1 and missed AA at 10px.
- **Scribe Rule** (#D4D2CC) and **Scribe Rule Strong** (#C0BEB8): every divider,
  border, and structural line in the system.
- **Kiln White** (#FFF7F2): exists solely as the label color on the Forged Deep
  button. Not a surface.

### Named Rules

**The Heat Rule.** Molten Pour is spent, not applied. If more than roughly 10% of
a viewport is carrying the accent, something has been decorated rather than
marked. The one exception is a deliberate inversion surface (the "Live." panel),
where ink floods and the accent becomes ambient light.

**The Two-Orange Rule.** There are two oranges and they are not
interchangeable. Molten Pour is for type above 18px and for non-text marks.
Forged Deep is for everything a person has to read or click. Choosing by
appearance rather than by size is how this system fails accessibility.

**The No-Grey-Guessing Rule.** Every neutral in this palette has a measured
contrast ratio behind it. Never introduce a new grey by eye. Compute it against
Cooled Steel first, or reuse Slag or Ash.

**The Inverted Accent Rule.** The accent flips with the surface it sits on.
Forged Deep (#C23A05) is the small-text accent on paper at 4.98:1; on Cast Ink
it collapses to roughly 1.9:1 and disappears. On ink the accent is Molten Pour
(#E8470A), which reads 4.66:1 there. Never carry an accent across an inversion
unchanged: the token that was correct on one ground is wrong on the other.

**The One Inversion Rule.** Exactly one section of the site floods to ink, and
it is the close. The page spends twelve thousand pixels on paper so that the
ground dropping out means something. A second inverted section makes the first
one a pattern instead of an event, and the accent stops reading as heat.

## 3. Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui fallback)
**Body Font:** IBM Plex Mono (with ui-monospace fallback)
**Label Font:** IBM Plex Mono

**Character:** A wide, slightly eccentric grotesque doing all the shouting, and a
plain engineering monospace doing all the talking. The pairing is the brand
argument in miniature: the claim is bold, the evidence is set like a terminal
readout. Monospace as body copy is unusual and load-bearing here; it is what
keeps big type from reading as a marketing page.

### Hierarchy

- **Display** (800, `clamp(58px, 15.5vw, 238px)`, line-height 0.8, tracking
  -0.05em): the ABENOR wordmark only. Ships as real DOM text, is the LCP element,
  and hands its optical space to the WebGL particle mark once the canvas paints.
- **Headline** (800, `clamp(28px, 5.4vw, 72px)`, line-height 0.95, tracking
  -0.04em): act headings. Always paired with a mono eyebrow on the same baseline
  and a 1px rule beneath.
- **Title** (600, `clamp(19px, 2.6vw, 34px)`, line-height 1.08, tracking
  -0.03em): problem statements and step names. The largest thing that is a
  sentence rather than a label.
- **Body Lead** (400 Bricolage, `clamp(17px, 2.3vw, 30px)`, line-height 1.28):
  the hero paragraph and the single-sentence beats that deserve to be set like
  headings. Capped at 26ch.
- **Body** (400 mono, 13px to 15px, line-height 1.6 to 1.72): all supporting
  prose. Capped at 46ch, never past 54ch. Monospace at these widths is at the
  limit of comfort; do not stretch the measure to fill a column.
- **Label** (400 or 500 mono, 10.5px, tracking 0.22em, uppercase): eyebrows,
  status bar, nav links, captions, attributions. The connective tissue of the
  whole page.

### Named Rules

**The Two-Register Rule.** Bricolage shouts, Plex Mono explains. A sans paragraph
of running body copy is wrong here, and a monospace headline is wrong here. The
only sanctioned crossover is Body Lead, where a short sentence earns display
treatment.

**The Wide-Gap Rule.** Adjacent type steps should differ by far more than 1.25x.
This system routinely puts 238px next to 10.5px. If two elements are close in
size, one of them is undecided; resolve it by pushing them apart, not by
splitting the difference.

**The Measure Rule.** Monospace body copy is capped at 46ch. Uppercase mono
labels never wrap; if a label does not fit, the label is cut at that breakpoint
rather than allowed to run to a second line.

## 4. Elevation

Flat by default. Depth is drawn, not lit. Structure comes from 1px rules in
Scribe Rule and from three tonal steps of the paper surface; the vast majority of
this interface casts no shadow at all. A shadow appears only where an element is
genuinely meant to sit above the page, and there are exactly two such cases: the
primary call to action, and the mockup frames that depict physical or windowed
objects.

### Shadow Vocabulary

- **raised** (`box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 6px 20px -6px
  rgba(0,0,0,0.10), 0 16px 40px -18px rgba(0,0,0,0.08)`): the primary CTA and the
  mockup frame. Three layers because a single soft shadow on a warm paper ground
  reads as blur rather than as lift.
- **raised-lg** (`box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 32px -8px
  rgba(0,0,0,0.12), 0 32px 72px -28px rgba(0,0,0,0.14)`): reserved for the
  largest floating object on a screen. At most one per viewport.
- **CTA glow, on paper** (`0 2px 4px rgba(0,0,0,0.06), 0 8px 24px -6px
  rgba(194,58,5,0.28)`): the primary button only. Tinted with the accent so the
  lift reads as heat rather than as a generic drop shadow.
- **CTA glow, on ink** (`0 0 0 1px rgba(232,71,10,0.4), 0 10px 32px -6px
  rgba(232,71,10,0.5), 0 28px 80px -24px rgba(232,71,10,0.35)`): the same button
  on the inverted close. A black-based shadow is invisible on ink, so the lift
  has to be made of the accent itself. This is the one place in the system where
  a shadow emits rather than occludes, and it is what "the accent becomes light"
  means in practice.

### Named Rules

**The Drawn-Depth Rule.** If an element needs separating from what is around it,
the first answer is a rule, the second is a tonal step of paper, and the third is
nothing at all. A shadow is the fourth answer and requires a reason that survives
the sentence "this object is physically above the page."

**The One-Float Rule.** No more than one shadowed element per viewport. Two
competing floats collapse the whole flat system into a card layout.

## 5. Components

Heavy and confident. Fills are real, hit areas are generous, rules are structural
rather than decorative. Nothing here is hairline-precious; the system should feel
like it was made out of stock, not out of CSS.

### Buttons

- **Shape:** square (0 radius). No exceptions, including on mobile.
- **Primary:** Forged Deep fill with Kiln White mono label at 12px, tracking
  0.18em, uppercase, padding 20px 40px, plus the tinted CTA glow. The label is
  the literal email address, not a verb phrase, because naming the destination is
  cheaper for the reader than promising an outcome.
- **Hover / Focus:** the arrow glyph slides 6px right over 220ms on
  `ease-out-expo` (`.nudge` on the button, `.arrow` on the glyph). The button
  does not lift, tint, or scale. Movement inside the shape, not of the shape.
  This used to widen the flex `gap` instead, which re-ran layout and paint on
  every frame of the tween; the effect is identical and the transform is free.
- **Press:** `scale(0.975)` over 140ms on `:active` (`.press`). The one moment
  where any perceptible delay reads as breakage rather than as motion. Note
  that `.press` owns `transition-property` for the element, so it must not be
  combined with `.chrome-t`, which needs the same longhands for the surface
  handover.
- **Ghost:** 1px Cast Ink border, transparent fill, ink label. On hover it
  inverts completely to a Cast Ink fill with a paper label over 300ms. Used for
  the persistent nav CTA and the secondary inline CTA.
- **Minimum hit area:** 44px on any interactive element, enforced with `min-h-11`
  rather than assumed from padding.

### Cards / Containers

Cards are the exception in this system, not the layout unit. Two exist: the
testimonial panels and the illustrative mockup frames.

- **Corner Style:** square (0 radius) for content panels. 4px only on frames that
  depict a physical or windowed object.
- **Background:** Cooled Steel Shade at 40% over the paper ground, so the panel
  reads as a tonal step rather than as a separate object.
- **Shadow Strategy:** none on content panels. See Elevation.
- **Border:** 1px Scribe Rule on all sides. Never a thicker colored edge on one
  side.
- **Internal Padding:** `clamp(20px, 2.6vw, 32px)`.

### List Rows

The primary content pattern on this site, and the reason it needs so few cards.

- **Structure:** a 1px Scribe Rule bottom border, `clamp(20px, 2.6vw, 32px)`
  vertical padding, and a grid above 768px that collapses to one column below
  it. Act 03 runs three columns (problem, what we build, what you get) with a
  mono column header above the first row; below 768px each cell carries its own
  label, because a header three screens above the cell it describes is not a
  header.
- **Hover:** a Cooled Steel Shade wash scales in from the bottom edge over
  `--dur-ui` (220ms) on `ease-out-expo`, bleeding into the gutters via a
  negative inset so the highlight reaches the full width of the viewport.
  Nothing else moves. 500ms was the old figure and a pointer running down a
  five-row list outran it, so the wash kept arriving after the pointer had
  gone.
- **Prohibited:** revealing copy on hover. Text that only exists on pointerenter
  is invisible on touch and was already removed once from this codebase.

### Disclosure (FAQ)

The only component on the site whose content is hidden by default, which makes
it the only one where sloppy semantics remove information rather than merely
annoying.

- **Trigger:** a real `<button>` with `aria-expanded` and `aria-controls`,
  full-width, `clamp(16px, 2.2vw, 24px)` vertical padding.
- **Mark:** a plus that rotates one of its two bars 90 degrees into a minus over
  `--dur-ui`. One mark changing state, not two glyphs swapped.
- **Panel:** `grid-template-rows: 0fr → 1fr` over `--dur-panel` (320ms) on
  `ease-out-expo`. The grid trick rather than a measured pixel height, so
  nothing is read back from the DOM and the answer can rewrap freely. This is
  the one sanctioned place to animate layout: one small panel, one direction,
  no transform equivalent.
- **Behaviour:** single-open, keyed by id rather than index.

### Navigation

- **Style:** fixed, transparent, over a paper gradient scrim 110px tall so
  headings can pass under it without colliding. A 2px Molten Pour scroll-progress
  bar sits at the very top edge.
- **Typography:** mono 11px, tracking 0.16em, uppercase.
- **States:** default ink at 85% opacity, hover at 100%, active in Forged Deep
  with `aria-current`.
- **Mobile:** the act list collapses into a 44px square hamburger below 1024px,
  and the CTA button persists at every width. The contact action is never hidden
  behind a menu.

### Status Bar

The signature component. A fixed band directly beneath the nav carrying a pulsing
availability dot, a live IST clock in tabular figures, and a studio line. It
exists to prove the page is a place rather than a document.

- Sheds content as the viewport narrows instead of growing taller: the studio
  line drops below 768px and the clock's label drops below 640px. It must never
  wrap to a second row, because it is fixed and every row it takes is stolen from
  the viewport permanently.

### Adaptive Chrome

The nav and the status bar are fixed, so they sit over whatever section happens
to be under them, and one section is ink. Everything fixed reads four variables
rather than a literal color: `--chrome-fg`, `--chrome-fg-dim`, `--chrome-bg`,
`--chrome-rule`, plus `--chrome-accent` and the two scrim stops. A
`data-surface` attribute on the root element swaps the whole set, and the
handover is a 450ms cross-fade on `ease-out-expo`.

- **The flag is driven by the section's real position, never by scroll
  progress.** Act ranges come from each act's declared `vh`, but real heights
  diverge from that (Act 05 is a 500vh scroll track inside a 165vh act), so a
  progress-derived boundary lands hundreds of pixels from where the ink starts
  and paints a dark bar over a paper section. An IntersectionObserver watches a
  zero-height band at y=112px, the exact bottom edge of the nav plus the status
  bar.
- Do not add a blanket `transition` rule to chrome descendants. It sets the
  shorthand at the same specificity as Tailwind's own transition utilities and
  wins on source order, which silently kills the hamburger's transform
  animation. Chrome elements carry `chrome-t` individually.

### Particle Wordmark

The hero mark is measured off the DOM wordmark's own bounding box and rendered as
a WebGL particle field in its place. It inherits the responsive rules of the
element it replaces rather than re-deriving them. Dot pitch is held constant in
CSS pixels (2.6px on narrow marks, 3.4px on wide ones) so it never clogs into a
solid slab on a phone or thin out into a ghost.

## 6. Motion

Every effect carries an argument. That principle needs a mechanism, and this is
it: a scale to pick values from, a gate to pass before writing any, and a tiering
rule for visitors who have asked for less.

### The scale

Durations are tokens in `styles/tokens.css`, not numbers typed at the call site.

| Token | Value | Used for |
| --- | --- | --- |
| `--dur-press` | 140ms | pointer-down feedback |
| `--dur-ui` | 220ms | hover, colour, small state changes |
| `--dur-panel` | 320ms | disclosure, anything with height |
| `--dur-surface` | 450ms | the paper/ink chrome handover |

Two curves, and deliberately no third. `--ease-out-expo` for anything entering
or leaving; `--ease-in-out-quart` for something already on screen that moves.
There is no `ease-in` token: it starts slow, which delays the exact frame the
visitor is watching, so `ease-out` at 220ms reads faster than `ease-in` at
220ms.

**Nothing a pointer triggers may exceed 300ms.** Past that a hover stops reading
as response and starts reading as lag. Scrubbed scroll work is exempt — the
visitor sets its pace, not us.

### The gate

Four questions, in order, before any new motion is written. If a candidate fails
one, it does not get built.

1. **Frequency.** Seen a hundred times a day, it should never animate. Seen
   occasionally, standard animation. Rare or first-time, that is where a longer
   beat is allowed to live.
2. **Purpose.** Name it in one word: feedback, spatial consistency, state
   indication, preventing a jarring change, or explanation. "It looks good" is
   not on the list. The 200-hours counter passes on *explanation* — the argument
   of the sentence is that the number is bigger than it feels.
3. **Speed.** It has to work inside the scale above.
4. **Function.** Data the visitor is reading does not move for style.

### Never ship

`transition: all`. Animating `width`, `height`, `margin`, `top`, `left` or flex
`gap` — the arrow nudge and the Act 05 progress rule were both fixed for this.
`scale(0)` as an entrance. `ease-in` on interface motion. A `will-change`
declared in static CSS: GSAP sets it on tween start and clears it on complete,
because the hint costs a compositor layer for as long as it is present and is
worth paying for only while something is actually moving.

### Reduced motion is tiered, not off

The old rule flattened every duration on the page to 0.001ms, which is an
over-correction twice over: it removed the transitions that exist to stop things
teleporting, and it removed colour and opacity fades, which imply no self-motion
and were never the problem.

- **Tier 1, removed:** the camera timeline, parallax, the particle wordmark,
  Lenis (never instantiated), every keyframed loop.
- **Tier 2, softened:** reveals and nudges lose their travel and arrive as a
  short fade. Global cap of 150ms.
- **Tier 3, kept:** opacity, colour, focus rings. The chrome handover included —
  cutting it would invert the whole fixed chrome between one frame and the next,
  which is precisely the jarring change the setting exists to prevent.

Durations use 0.01ms rather than 0s: a zero-length animation fires no
`animationend`, and anything waiting on that event hangs forever. JS-driven
motion is gated with `gsap.matchMedia()` rather than a one-off query read, so
toggling the OS setting mid-visit takes effect and GSAP reverts the setup
instead of leaving orphaned nodes in the DOM.

## 7. Do's and Don'ts

### Do:

- **Do** use Forged Deep (#C23A05) for any accent below 18px, and Molten Pour
  (#E8470A) only for display type and non-text marks.
- **Do** separate content with a 1px Scribe Rule (#D4D2CC) or a tonal step of
  paper before reaching for a container.
- **Do** set running body copy in IBM Plex Mono at 13px to 15px, capped at 46ch.
- **Do** push adjacent type steps far apart. Extreme scale contrast is the
  system's main source of energy.
- **Do** keep every corner square. Radius above 0 is reserved for frames
  depicting physical objects.
- **Do** give the primary action a real fill, real padding (20px 40px), and the
  accent-tinted glow. The main ask should be the heaviest thing on the screen.
- **Do** enforce a 44px minimum hit area with `min-h-11`.
- **Do** label every mockup as illustrative, on the surface, in the interface.
  One invented number poisons the real ones.
- **Do** ship a working reduced-motion path: canvas unmounted, DOM wordmark
  retained, reveals resolved to rest state.
- **Do** swap the accent when a surface inverts: Forged Deep on paper, Molten
  Pour on ink. Re-measure, never re-use.
- **Do** make the close the biggest heading on the page after the wordmark. Five
  act headings open at the same size; arriving at the ask in that size says the ask is
  one more section.

### Don't:

- **Don't** build anything that could appear on a **corporate consultancy** site:
  navy and grey, stock gravitas, or a sentence that avoids committing to
  anything.
- **Don't** reach for the **generic Indian dev-shop** vocabulary: stock photos of
  teams at laptops, a technology logo wall, a floating WhatsApp button, or a grid
  of twelve identical service cards.
- **Don't** use `border-left` or `border-right` above 1px as a colored accent
  stripe. This was already removed once from the 200-hours callout; it is now a
  full `border-y`.
- **Don't** use gradient text, `background-clip: text`, or any glow on type.
- **Don't** add a second shadowed element to a viewport that already has one.
- **Don't** introduce a new grey by eye. Every neutral here has a measured ratio.
- **Don't** reveal copy on hover. It is invisible on touch.
- **Don't** reintroduce Quench Blue (#2B4FD0) into the interface. Its single job
  was the chromatic split on the Act 03 headings, and that effect is gone — it
  was decoration on type the visitor was trying to read, which is the one place
  the motion gate rejects outright. The token stays in the palette for the 3D
  layer; on the page it now has no job, and a colour looking for one is how a
  second accent gets in.
- **Don't** write em dashes in interface copy. Commas, colons, semicolons,
  periods, parentheses.
- **Don't** let a mono uppercase label wrap. Cut the content at that breakpoint
  instead.
- **Don't** add a second inverted section. One is an event, two is a pattern.
- **Don't** drive the chrome's surface flag off scroll progress or act index.
  Watch the section itself.

**Audit test:** if a screenshot of a new section could be dropped onto any
automation agency's site without anyone noticing, it has failed. The tell is
usually a card grid where list rows would do, or a second accent color appearing
because one did not feel like enough.
