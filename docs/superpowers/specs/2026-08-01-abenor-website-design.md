# ABENOR Website — Design Spec

**Date:** 2026-08-01
**Status:** Approved for planning
**Author:** Claude (with Abenor)

---

## 1. Context

Abenor is a software studio founded 2026, 2–10 people. Services: web design, end-to-end
websites, n8n automation workflows, iOS/Android apps, and custom software.
Tagline: *"The next generation of digital craftsmanship."*

The company's LinkedIn currently lists `https://abenor.vercel.app` as its website.
**That URL returns HTTP 404.** The public profile points at a dead link today, which makes
shipping this site the highest-value outstanding task for the business.

Four HTML prototypes were built and reviewed. The final one (`mockups/05-proof.html`,
rated 9/10) established the direction: a page that *demonstrates* the services rather than
describing them. This spec takes that principle into a real codebase, on a light theme,
with scroll treated as a film timeline.

### Goal

A site that reads as a technical demonstration, not a brochure. It should be plausible as a
reference build the studio shows to win work, and good enough that other startups copy it.

### Non-goals (v1)

- No blog / journal
- No careers page
- No client login or dashboard
- No i18n
- No e-commerce or payments

---

## 2. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15, App Router** | RSC, file routing, image optimisation, API route for contact. Deploys to Vercel, where the LinkedIn URL already points. The site doubles as a reference build in the studio's own sell stack. |
| Motion | **GSAP + ScrollTrigger + Lenis + React Three Fiber** | GSAP drives the scroll timeline; R3F provides real 3D scenes. This is the tier the brief ("watching a video", "masterpiece") requires. |
| Content | **MDX in-repo, zod-validated frontmatter** | No external service, no cost, version-controlled. Migratable to a CMS later without touching the front end. |
| Scope | **Home + `/work` index + `/work/[slug]` case studies** | Smallest scope that still reads as a real studio and gives each project its own SEO surface. The `/work` index is a plain, 3D-free list — it exists because `/work/[slug]` needs a parent route, and costs almost nothing. Contact is a section on home, not a page. |
| Styling | **Tailwind v4 + CSS custom properties** | Tokens live in CSS vars so the 3D layer and the DOM layer read from one source. |
| Hosting | **Vercel** | Matches the existing LinkedIn URL; fixes the 404 in place. |

### Licensing note

GSAP is **100% free for commercial use** as of the Webflow acquisition, including all
formerly Club-only plugins (SplitText, ScrollSmoother, MorphSVG, DrawSVG). Verified against
gsap.com/pricing on 2026-08-01. SplitText is therefore used directly; no custom text
splitter is needed.

Lenis is chosen over GSAP ScrollSmoother because it integrates more cleanly with the R3F
render loop. ScrollSmoother remains a viable swap if pinning proves fragile.

---

## 3. Aesthetic direction

Light theme. Contrast comes from type weight, negative space and shadow — not glow.
The 3D layer reads as physical objects lit in a white room, closer to a product film than
a demo reel. This is a deliberate inversion of the dark prototypes.

### Tokens

```css
--paper:  #F2F0EA;  /* base surface */
--paper2: #E8E5DD;  /* raised / inset surfaces */
--ink:    #0A0A0C;  /* primary text */
--ink2:   #55534E;  /* secondary text */
--rule:   #D5D1C6;  /* hairlines */
--molten: #FF4D0F;  /* accent — carried from prototypes */
--ice:    #1B3BFF;  /* secondary, used for 3D depth cueing */
```

### Type

- **Display:** Bricolage Grotesque (variable, 400/600/800)
- **Mono:** IBM Plex Mono (400/500) — labels, data, section indices

Self-hosted via `next/font/local` so no render-blocking third-party request and no FOUT
on the particle sampler, which reads rendered glyph pixels.

---

## 4. The camera concept

The defining constraint of this build:

> **One persistent R3F canvas for the entire home page. Scroll drives a single camera
> through one continuous 3D space. Sections are scenes the camera travels through, not
> stacked boxes with separate animations.**

DOM text overlays the canvas and is the accessible, indexable content. The canvas is
decoration and demonstration; it never holds text that matters for SEO or screen readers.

Implementation shape:

- `<Stage>` mounts one `<Canvas>` fixed to the viewport, `pointer-events: none` except
  where a scene is interactive.
- `<CameraRig>` owns a single GSAP timeline scrubbed by ScrollTrigger over the full page
  height. Camera position, target and FOV are keyframed per act.
- Each scene subscribes to normalised progress `0..1` for its own act window and animates
  its own contents. Scenes mount/unmount via distance culling, not per-section canvases.

---

## 5. Acts

Each act is a DOM overlay component plus a 3D scene. Act boundaries are defined as
scroll ranges on the master timeline.

| # | Name | DOM | 3D scene | Camera |
|---|---|---|---|---|
| 00 | Cold open | Preloader, real build-step log | none | black |
| 01 | Title | Wordmark (real `<h1>`), claim line | Particle field resolving into ABENOR | pushes through the wordmark |
| 02 | Position | One sentence, SplitText word scrub | Sparse drift, depth of field | pulls back; type occludes geometry |
| 03 | Capabilities | 5 service rows, chips, detail | 5 monoliths in space, one per service | tracks sideways past them |
| 04 | Automation | Caption + legend | 3D node graph, draggable, packets on edges | orbits the graph |
| 05 | The build | Stage labels 01–04 | Wireframe → design → built → live morph | dollies in as it resolves |
| 06 | Proof | Case study cards linking to `/work/[slug]` | Cards on a track passing camera | lateral travel |
| 07 | Close | Contact CTA, footer | Wordmark reassembles, wide | pulls out to wide |

Acts 04 and 05 are direct ports of the two strongest moments in `05-proof.html`
(draggable workflow graph, wireframe→live transformer), promoted from DOM/SVG into the
shared 3D space.

---

## 6. Architecture

```
abenor/
├── app/
│   ├── layout.tsx                 fonts, providers, metadata
│   ├── page.tsx                   home — composes acts 00–07
│   ├── work/
│   │   ├── page.tsx               work index (lightweight, no 3D)
│   │   └── [slug]/page.tsx        case study (no 3D bundle)
│   ├── api/contact/route.ts       form handler
│   ├── sitemap.ts
│   └── opengraph-image.tsx
├── components/
│   ├── canvas/
│   │   ├── Stage.tsx              the single persistent <Canvas>
│   │   ├── CameraRig.tsx          scroll → camera timeline
│   │   ├── useActProgress.ts      normalised 0..1 per act
│   │   └── scenes/
│   │       ├── TitleParticles.tsx
│   │       ├── Monoliths.tsx
│   │       ├── FlowGraph.tsx
│   │       ├── BuildMorph.tsx
│   │       └── WorkTrack.tsx
│   ├── acts/
│   │   ├── Act01Title.tsx  …  Act07Close.tsx
│   ├── ui/                        Button, Chip, SectionIndex, Cursor
│   └── mdx/                       MDX component overrides
├── lib/
│   ├── scroll/
│   │   ├── LenisProvider.tsx
│   │   └── gsap.ts                central plugin registration
│   ├── motion/tokens.ts           shared eases, durations, act ranges
│   └── content/
│       ├── work.ts                MDX loader
│       └── schema.ts              zod frontmatter schema
├── content/work/*.mdx
├── styles/tokens.css
└── docs/superpowers/specs/
```

### Case study frontmatter

```ts
const WorkSchema = z.object({
  title:     z.string(),
  slug:      z.string(),
  client:    z.string(),
  year:      z.number().int(),
  sector:    z.string(),
  services:  z.array(z.enum(['web','website','automation','mobile','software'])),
  summary:   z.string().max(200),
  cover:     z.string(),
  metrics:   z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  featured:  z.boolean().default(false),
})
```

Build fails on invalid frontmatter. A case study cannot ship half-described.

---

## 7. Performance budget

Hard limits. If a scene cannot meet these, the scene is cut, not the budget.

| Metric | Target |
|---|---|
| LCP (home, mobile 4G) | < 2.5s |
| CLS | < 0.05 |
| JS on `/work/[slug]` | < 120 KB gzipped, **zero R3F** |
| Home 3D bundle | lazy, below the fold of first paint |
| Frame rate, mid-tier mobile | ≥ 45 fps sustained |

Techniques: `dpr={[1, 1.75]}`, `frameloop="demand"` for idle scenes, distance culling of
inactive acts, instanced geometry for particles and monoliths, route-level code splitting
so 3D never reaches case study pages.

**The hero headline is real DOM text, never canvas.** LCP and indexing depend on it.

---

## 8. Accessibility

- `prefers-reduced-motion: reduce` → camera timeline locks to act keyframes, scenes hold
  static, scroll becomes ordinary. Every piece of content stays reachable.
- All content lives in DOM. The canvas is `aria-hidden`.
- The workflow graph is interactive decoration; its information is duplicated in adjacent
  text so nothing is conveyed by drag alone.
- Focus states are visible and not overridden by the custom cursor. Custom cursor is
  suppressed for `hover: none` and for keyboard navigation.
- Colour contrast: `--ink` on `--paper` and `--molten` on `--paper` both verified to
  WCAG AA before build.

---

## 9. Phasing

**Phase 1 — Shell.** Next.js scaffold, tokens, fonts, Lenis + GSAP providers, `Stage` with
an empty canvas, acts 01/02/07 with static DOM. Deployable and already replaces the 404.

**Phase 2 — Content spine.** Acts 03 and 06, MDX pipeline, `/work` index and `[slug]`
route, contact API. Site is functionally complete without the heavy 3D.

**Phase 3 — Signature scenes.** Acts 04 and 05 in 3D, particle title in act 01, full camera
timeline, cursor and micro-interaction pass.

**Phase 4 — Hardening.** Performance budget enforcement, reduced-motion pass, a11y audit,
OG images, sitemap, analytics.

Rationale: after Phase 2 the studio has a real site live. Phases 3–4 raise it without
blocking the 404 fix.

---

## 10. Open inputs (blocking Phase 2, not Phase 1)

These are inputs required from Abenor, not unresolved design questions:

1. **Case studies** — at least 3, with client name, sector, year, scope, outcome, imagery.
   Until these exist the Work section ships as clearly-marked placeholders.
2. **Contact destination** — email address for the form, or a Resend/Formspree account.
3. **Logo** — a real mark, or confirmation that the type-set wordmark is the identity.
4. **Tech stack** — the ticker currently guesses TypeScript, React, Next.js, Node, Postgres,
   Supabase, n8n, Swift, Kotlin, React Native, Tailwind, Vercel. Confirm or correct.
5. **Studio timezone** — the live clock assumes IST. Confirm.
6. **FAQ accuracy** — the prototypes assert a paid discovery week, client-owned code from
   first commit, and documented handover. These are currently invented defaults. They must
   match real policy before launch, or they are false claims on the studio's own site.
7. **Domain** — keep `abenor.vercel.app` or point a custom domain.

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| Seven bespoke 3D scenes overruns effort | Phasing — site is live and complete after Phase 2; scenes land incrementally |
| Scroll cinema tanks mobile performance | Hard budget in §7; scenes degrade to shader planes below `md` |
| Heavy motion harms conversion | Contact CTA reachable from fixed nav at all times, not only at act 07 |
| Empty Work section undermines credibility | Placeholders explicitly marked; Phase 2 gated on real case studies |
| Font-dependent particle sampler mis-renders | Self-hosted fonts via `next/font/local`, sampler waits on `document.fonts.ready` and re-samples on load |

---

## 12. Success criteria

1. `abenor.vercel.app` resolves to a working site — the LinkedIn 404 is gone.
2. Home page meets every number in §7 on a mid-tier Android device.
3. Full keyboard and reduced-motion traversal reaches 100% of content.
4. At least three real case studies live at `/work/[slug]`.
5. A visitor can describe what Abenor does, and how to hire them, after one scroll.
