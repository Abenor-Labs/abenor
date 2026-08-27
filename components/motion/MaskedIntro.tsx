"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

type MaskedIntroProps = {
  children: React.ReactNode;
};

export function MaskedIntro({ children }: MaskedIntroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion()) return;
    const target = ref.current?.querySelector<HTMLElement>(".masked-intro");
    if (!target) return;
    gsap.from(target, {
      yPercent: 112,
      duration: 1,
      delay: 0.1,
      ease: EASE,
    });
  }, { scope: ref });

  return (
    <div ref={ref}>
      <div className="-mb-[0.1em] overflow-hidden pb-[0.1em]">
        <div className="masked-intro">{children}</div>
      </div>
    </div>
  );
}
