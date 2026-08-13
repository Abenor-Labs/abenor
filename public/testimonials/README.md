# Testimonial photos

Client photos, referenced from `components/acts/Act06Proof.tsx`:

| File                   | Person         | Source     |
| ---------------------- | -------------- | ---------- |
| `harshith-varma.png`   | Harshith Varma | 800×800    |
| `manish_chetla.jpeg`   | Manish Chetla  | 460×460    |

Originals go in as-supplied — no need to pre-crop or convert. `Avatar` renders
them through `next/image`, which resizes and re-encodes to WebP at request
time, so a 629 KB PNG still serves as a few KB at 56 px.

Two requirements for anything added here:

- **Square.** The avatar is a circle and crops with `object-cover`; a
  non-square source loses the sides or the chin.
- **Written OK to publish** from the person, before the file lands.

If a file is missing or 404s, `Avatar` falls back to an initials monogram
rather than rendering a broken image next to a client's name.
