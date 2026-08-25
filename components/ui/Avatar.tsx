'use client'

import Image from 'next/image'
import { useState } from 'react'

/**
 * A testimonial face, with a monogram underneath it.
 *
 * The photo is the point — a face outperforms any sentence of copy for trust —
 * but the monogram is not a placeholder to be removed later. It is the state
 * this renders in whenever the file is missing, still uploading, or 404s from
 * the CDN, and a broken-image icon next to a client's name is worse than no
 * photo at all. So the initials are painted first and the photo lands on top.
 *
 * Routed through next/image deliberately: the source files are whatever the
 * client happened to send (one is an 800px 629KB PNG), and at 56px on screen
 * a raw <img> would ship every one of those bytes. next/image resizes and
 * re-encodes to WebP at request time, so the originals can stay untouched in
 * the repo without the page paying for them.
 */
export function Avatar({
  src,
  name,
  size = 56,
}: {
  src: string
  name: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      /*
        Not the Scribe Rule border every other surface uses. That grey is warm
        and tinted, and a tinted hairline around a photograph picks up whatever
        is behind it and reads as dirt on the image edge rather than as an
        outline. Photographs get a neutral black at 10 percent instead — the
        only place on the site that does not take its border from the palette.
      */
      className="bg-paper-3 text-ink-2 relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border font-mono font-medium select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
        borderColor: 'oklch(0 0 0 / 0.1)',
      }}
    >
      {initials}
      {!failed && (
        <Image
          src={src}
          alt=""
          width={size * 2}
          height={size * 2}
          quality={82}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  )
}
