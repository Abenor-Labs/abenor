"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export function CountUp({
  to,
  className,
}: {
  to: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.textContent = String(to);
      return;
    }
    const state = { v: 0 };
    gsap.to(state, {
      v: to,
      duration: 1.4,
      ease: EASE,
      onUpdate: () => {
        el.textContent = String(Math.round(state.v));
      },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }, { scope: ref });

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
