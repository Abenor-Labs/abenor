"use client";

import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export function ProcessRule() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) {
        gsap.set(ref.current, { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#process",
            start: "top 65%",
            end: "top 15%",
            scrub: 0.4,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-poster"
    />
  );
}
