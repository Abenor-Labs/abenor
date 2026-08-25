# Product

## Register

brand

## Users

Three audiences read the same page, and the copy has to clear all three without
narrowing to any one of them.

- **Non-technical SMB owners.** Operations people whose day contains real manual
  work: re-typing leads into a CRM, reconciling a sheet, chasing a sync that
  failed overnight. They do not know what n8n is and should not need to. They
  arrive skeptical of anyone who says "digital transformation".
- **Technical founders and startup teams.** They can evaluate the stack and will
  check it. Specificity is credibility here: repository handover, store review,
  what happens at 11pm when it breaks.
- **Agencies and other studios.** Scouting overflow or subcontract capacity.
  They are buying reliability and process, not ideas.

Context of use: a laptop or a phone, mid-workday, probably arriving from a
referral or a search for automation help. Attention is short and the default
assumption is that this is another dev shop.

The job to be done: decide, quickly, whether these people can take one specific
painful thing off their plate, and whether they can be trusted with it.

## Product Purpose

Abenor is a software studio (started 2026, IST timezone, contact is Mahamad
Suhail personally). It builds workflow automation, websites, iOS and Android
apps, and the internal tools that replace the spreadsheet holding a company
together.

The site is the entire top of funnel. It is one scroll-driven page, eight acts,
one continuous camera.

**Success is a booked call.** Not traffic, not time on page, not an email that
turns into a thread.

### Resolved: graduated commitment, call at the close

The page used to argue the opposite of its own success metric: email was the
primary CTA everywhere and Calendly was a secondary link, on the reasoning that
a one-paragraph email answered free in two days is a much smaller commitment
than a scheduled call.

That reasoning was right about mid-page and wrong about the close. The current
hierarchy is graduated:

- **Nav** (reachable at every scroll position): book a call. It is the one
  control always on screen, so it carries the outcome the site is measured on.
- **Mid-page InlineCTAs** (after Act 03, after Act 04): email. A visitor still
  scrolling has not read the process or seen the receipts, and has not earned a
  calendar commitment. The cheap ask catches them.
- **Act 07 close**: book a call as the filled primary, email as a link
  underneath. This is the one point where a visitor has read everything,
  including the offer to be told "not worth it".

Email is never removed, only demoted. Someone who will not put a slot in a
calendar is earlier in the funnel, not lost.

If this is revisited, the thing to preserve is the graduation itself. A blanket
swap to calls everywhere raises the cost of the first interaction on a page
whose entire argument is that the first ask should be cheap.

## Brand Personality

**Plain-spoken. Technical. Bold.**

Voice:

- Says the uncomfortable thing first. The page volunteers that both client
  projects were unpaid, and offers to answer "not worth it". That candor is the
  single strongest differentiator against both anti-references below, and it is
  load-bearing, not decoration.
- Concrete over abstract. "Four hours a week is two hundred hours a year" beats
  any sentence containing "efficiency". Never claim a number that does not
  exist; the absence of a price is stated as a shape (one workflow, two weeks,
  fixed fee) rather than hidden.
- Second person, active voice, short sentences. No hedging, no "we strive to".
- Wants to be remembered, not merely tasteful.

### Execution gap: partly closed

The stated personality includes **bold and energetic**; "editorial and composed"
was explicitly not chosen. The build was the composed end of that range: warm
paper, near-black ink, a single accent used sparingly, large restrained type.
Well-made but quiet.

The close now inverts. The ground drops to ink for the final section, the accent
becomes light rather than a tint, and the heading is the biggest type on the
page after the wordmark. The fixed chrome inverts with it. That is the page
raising its voice exactly once, at the ask.

What remains quiet, and is fair game for the next pass: the six paper acts still
share one rhythm (eyebrow, headline, rule, content) at one heading size, and the
accent inside them never commits beyond a single word of emphasis. The
constraint is that any further boldness must not turn the one inversion into a
pattern. See the One Inversion Rule in DESIGN.md.

## Anti-references

Named explicitly by the owner:

- **Corporate consultancy.** Navy and grey, stock gravitas, case-study PDFs,
  language engineered to avoid committing to anything. Any sentence that could
  appear on a Big Four site is wrong here.
- **Generic Indian dev-shop site.** Stock photos of teams at laptops, "We
  deliver excellence", a wall of technology logos, a floating WhatsApp button,
  a services grid of twelve identical cards. This is the closest neighbor in
  search results and the most important thing not to resemble.

Considered and deliberately **not** flagged as anti-references:

- Generic SaaS landing pages.
- Awwwards-style motion showcases. Heavy visual effects are acceptable here
  (the site already runs a WebGL particle wordmark, a custom cursor, and
  scroll-scrubbed sequences). The bar is that each effect carries an argument,
  not that effects are avoided.

## Design Principles

1. **Volunteer the weakness.** Two clients, both unpaid, stated on the page
   before a visitor can discover it. A buyer told up front reads it as
   confidence; a buyer who finds out later stops believing everything else.
   Applies to every claim on the site: if it needs a caveat, the caveat ships
   with it.

2. **Show it, do not claim it.** The site is the portfolio. Craft in the
   interface is the argument for craft in the work, which means responsiveness,
   accessibility, and performance are sales collateral rather than hygiene.
   Mockups are labeled as mockups (the phone panel says "illustrative"), because
   one invented number poisons the real ones.

3. **Every effect carries an argument.** Motion and 3D are permitted, and are
   the reason this does not read as a template. Each one must survive the
   question "what does this make the visitor understand?" The particle wordmark
   dispersing on scroll is the page handing attention forward. A logo that spins
   because it can is the dev-shop site with a bigger budget.

4. **Concrete beats impressive.** Name the specific painful thing (re-typing a
   lead into a CRM at 3am) rather than the category (workflow orchestration).
   Losses framed as already happening move people harder than gains framed as
   available.

5. **Bold enough to be remembered, precise enough to be believed.** The two
   halves are in tension on purpose. Boldness with sloppy execution reads as a
   demo; precision without boldness reads as a competent nobody. Neither alone
   passes.

## Accessibility & Inclusion

**WCAG 2.1 AA**, treated as a floor that already exists in the codebase and must
not regress.

Currently in place and to be maintained:

- Contrast is computed, not guessed. `--color-ink-3` sits at #6A6D7C
  specifically because #6E7180 measured 4.49:1 on paper and missed AA for the
  10px mono labels. `--color-molten-deep` (#C23A05, 4.98:1) exists because
  `--color-molten` fails AA at small sizes and as a button fill, and is
  restricted to large headings.
- `prefers-reduced-motion` is a real path, not a class toggle: the canvas does
  not mount, the DOM wordmark stays visible, the camera holds keyframes, and
  every scroll reveal resolves to its rest state. Nothing becomes unreachable.
- The page is fully readable with no JavaScript and no WebGL. The hero wordmark
  ships as server-rendered DOM text and is the LCP element; three.js never gates
  content.
- Custom cursor hides itself for keyboard users and on touch. Focus outlines are
  never suppressed. Skip link present.
- Copy that only appears on hover is banned. Act 03 answers previously sat at
  0.4 opacity until pointerenter, which made half the page invisible on touch
  and unreadable everywhere else.

Known user needs: assume mobile-first traffic on mid-range Android over Indian
mobile networks. Assume many visitors are non-technical and read English as a
second or third language, so plain vocabulary is an accessibility requirement,
not only a voice choice.
