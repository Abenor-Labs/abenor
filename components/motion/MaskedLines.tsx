"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

type MaskedLinesProps = {
  lines: string[];
  className?: string;
  id?: string;
};

export function MaskedLines({ lines, className, id }: MaskedLinesProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const targets =
        ref.current?.querySelectorAll<HTMLElement>(".masked-line");
      if (!targets?.length) return;
      gsap.from(targets, {
        yPercent: 115,
        duration: 0.8,
        stagger: 0.09,
        ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <h2 ref={ref} id={id} className={className}>
      {lines.map((line) => (
        <span
          key={line}
          className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
        >
          <span className="masked-line block">{line}</span>
        </span>
      ))}
    </h2>
  );
}
