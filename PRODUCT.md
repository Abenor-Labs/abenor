# Abenor v2 · Product

## Register

brand.

## What changed from v1

v1 was "The Foundry Floor": dark cooled metal, molten orange, ink inversion.
v2 is **The Set Page**: Swiss editorial print. Warm paper ground, near-black
ink set as type, one poster red used like a compositor's registration mark,
hairline rules everywhere. The metaphor is typesetting, not metallurgy: the
visitor arrives with scattered manual work and watches it get set into a grid.

## Users

Same three audiences read the same page:

- **Non-technical SMB owners** doing real manual work: re-typing leads,
  reconciling sheets, chasing failed syncs. Skeptical of the phrase
  "digital transformation".
- **Technical founders** who will check the stack, the repo handover story,
  and what happens when it breaks at 11pm.
- **Agencies and studios** scouting overflow capacity. They buy process.

Arriving mid-workday on laptop or phone, probably from referral or search.
Default assumption: another dev shop.

Job to be done: decide quickly whether we can take one specific painful thing
off their plate, and whether we can be trusted with it.

## Success metric

A booked call (Calendly). Not traffic, not replies.

### CTA graduation (preserved from v1, non-negotiable)

- **Nav**: book a call. Always on screen, carries the outcome metric.
- **Two mid-page InlineCTAs** (after Work, after Receipts): email. A visitor
  still scrolling has not earned a calendar commitment yet.
- **Close**: book a call primary, email underneath.

Email is demoted, never removed.

## Voice

Plain-spoken. Technical. Bold.

- Says the uncomfortable thing first: two clients so far, both projects
  unpaid. Stated in Receipts before a visitor can discover it elsewhere.
- Concrete beats abstract. "Four hours a week is two hundred hours a year."
- No invented numbers. Price appears only as a shape: one workflow, two weeks,
  fixed fee, number named on the call.
- Second person, active voice, short sentences. Interface copy never contains
  an em dash.

## Anti-references

- Corporate consultancy: navy, grey, stock gravitas, sentences engineered to
  commit to nothing.
- Generic dev-shop site: stock laptops, "we deliver excellence", twelve-card
  services grid, floating WhatsApp button.

Heavy effects are allowed if each one answers "what does this make the visitor
understand?"

## Concept-specific rules

1. **One Poster Rule.** The page floods to poster red exactly once, at the
   close. Fixed chrome inverts with it via `data-surface`. No second flood.
2. **Opacity makes hierarchy, hue does not.** Ink at /70 /60 for softer text;
   no second color ever introduced for emphasis.
3. **Rows beat cards.** Services, receipts, objections are list rows on a
   hairline grid, never card grids.
4. **Every effect argues.** The hero composition scatters plates and sets them
   into a strict grid on scroll: chaos of manual work becoming system. The
   ticker enumerates the actual tasks being taken away.

## Accessibility floor

WCAG 2.1 AA, computed contrasts:

- Poster red `#C8102E` on paper `#FAFAF9`: 5.6:1 (AA normal text)
- Paper on poster red: 5.9:1 (AA normal text)
- Ink `/60` floor for meaningful small mono text; `/40` decorative only
- `prefers-reduced-motion` real path: Lenis never mounts, canvas never mounts
  (static server-rendered plate grid stays), reveals resolve instantly
- Fully readable with JS off and WebGL off. Hero wordmark is server-rendered
  DOM text and the LCP element
- Skip link, visible focus outlines (currentColor), 44px touch targets,
  native `details/summary` for the answers section
