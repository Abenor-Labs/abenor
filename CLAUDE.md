# Abenor

Marketing site for a software studio. Next.js 15 App Router, React 19, Tailwind
v4, GSAP + Lenis for scroll, react-three-fiber for the hero. One scroll-driven
page, eight acts, one continuous camera.

## Design Context

Two root files govern all design work. Read them before changing anything
visual.

- **[PRODUCT.md](PRODUCT.md)** answers who and why: register, audiences,
  personality, anti-references, principles, accessibility floor.
- **[DESIGN.md](DESIGN.md)** answers how it looks: palette with contrast
  reasoning, type hierarchy, elevation, components, do's and don'ts.
  Machine-readable extensions live in `.impeccable/design.json`.

**Register: brand.** Design is the product here, not a service to it.

**North star: "The Foundry Floor."** Cooled metal is the ground, molten metal is
the event.

**The five principles:**

1. Volunteer the weakness. Caveats ship with the claims they qualify.
2. Show it, do not claim it. The site is the portfolio, so accessibility and
   performance are sales collateral.
3. Every effect carries an argument. Motion and 3D are allowed; each must answer
   "what does this make the visitor understand?"
4. Concrete beats impressive. Name the painful thing, not the category.
5. Bold enough to be remembered, precise enough to be believed.

**Fastest ways to get it wrong:** a card grid where list rows would do; a second
accent color because one did not feel like enough; `border-left` as a colored
stripe; an em dash in interface copy; grey picked by eye instead of by measured
contrast ratio.

**The close is the one inverted surface.** It floods to ink and the fixed chrome
inverts with it via `data-surface` on the root element. Do not add a second
inversion, and do not carry an accent across one unchanged: Forged Deep on
paper, Molten Pour on ink.

**CTA hierarchy is graduated and deliberate.** Nav and the Act 07 close ask for
a booked call; the two mid-page InlineCTAs ask for an email. Do not flatten this
to one ask in either direction without reading the PRODUCT.md section on it.

## Commands

```bash
npm run dev        # next dev
npm run build      # next build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```
