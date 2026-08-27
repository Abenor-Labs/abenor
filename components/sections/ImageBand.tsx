type ImageBandProps = {
  /** Wide plate, shown from sm up. */
  wide: { name: string; widths: number[]; ratio: [number, number] };
  /** Stacked plate for phones, where the wide crop would be unreadable. */
  stack: { name: string; widths: number[]; ratio: [number, number] };
  fig: string;
  caption: string;
  note: string;
  alt: string;
};

const set = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");

/**
 * Art-directed rather than cropped: the same two screens run side by side on a
 * wide viewport and stack on a narrow one. A 2.4:1 crop at phone width would
 * render both sites about 150px across, which is texture, not evidence.
 */
export function ImageBand({
  wide,
  stack,
  fig,
  caption,
  note,
  alt,
}: ImageBandProps) {
  const widest = wide.widths[wide.widths.length - 1];

  return (
    <figure className="border-t border-line">
      <picture>
        <source
          media="(min-width: 640px)"
          type="image/webp"
          srcSet={set(wide.name, wide.widths, "webp")}
          sizes="100vw"
        />
        <source
          media="(min-width: 640px)"
          srcSet={set(wide.name, wide.widths, "jpg")}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={set(stack.name, stack.widths, "webp")}
          sizes="100vw"
        />
        <img
          src={`/images/${wide.name}-${widest}.jpg`}
          srcSet={set(stack.name, stack.widths, "jpg")}
          sizes="100vw"
          width={widest}
          height={Math.round((widest * wide.ratio[1]) / wide.ratio[0])}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full"
        />
      </picture>
      <figcaption className="mx-auto flex max-w-[76rem] items-baseline justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink/70 md:px-8">
        <span>
          <span className="text-poster">{fig}</span> {caption}
        </span>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}
