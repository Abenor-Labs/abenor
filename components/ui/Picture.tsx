type PictureProps = {
  /** Basename in /public/images, without width suffix or extension. */
  name: string;
  /** Generated variant widths, ascending. Largest doubles as the fallback. */
  widths: number[];
  sizes: string;
  /** Intrinsic aspect of the source, so the box is reserved before decode. */
  ratio: [number, number];
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * The site exports statically, so next/image runs unoptimized — no srcset, no
 * modern formats, full desktop JPEGs on phones. This emits the srcset by hand
 * against variants generated at build prep time instead.
 */
export function Picture({
  name,
  widths,
  sizes,
  ratio,
  alt,
  className,
  priority,
}: PictureProps) {
  const srcSet = (ext: string) =>
    widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/${name}-${largest}.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        width={largest}
        height={Math.round((largest * ratio[1]) / ratio[0])}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}
