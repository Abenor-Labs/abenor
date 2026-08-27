"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

const LETTERS = "Abenor".split("");

export function WordmarkIntro() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const targets = ref.current?.querySelectorAll<HTMLElement>(".wm-letter");
      if (!targets?.length) return;
      gsap.from(targets, {
        yPercent: 118,
        duration: 0.9,
        stagger: 0.05,
        delay: 0.15,
        ease: EASE,
      });
    },
    { scope: ref }
  );

  return (
    <h1 className="text-[clamp(4.25rem,15vw,13rem)] font-light leading-[0.85] tracking-[-0.04em]">
      <span
        ref={ref}
        className="-mb-[0.08em] inline-flex overflow-hidden pb-[0.08em]"
      >
        {LETTERS.map((letter, i) => (
          <span key={`${letter}-${i}`} className="wm-letter inline-block">
            {letter}
          </span>
        ))}
        <span className="wm-letter inline-block text-poster">.</span>
      </span>
    </h1>
  );
}
