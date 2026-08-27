"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    // Font swap changes layout height, which moves every "top 85%" start and
    // the header progress bar. Recalculate once the real faces are in.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        cancelled = true;
      };
    }

    const lenis = new Lenis({ duration: 1.05 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let lastY = window.scrollY;
    let skew = 0;
    let written = 0;
    const skewTick = () => {
      const y = window.scrollY;
      const target = gsap.utils.clamp(-8, 8, (y - lastY) * 0.12);
      lastY = y;
      skew += (target - skew) * 0.1;
      // The easing never reaches zero on its own, so without this the property
      // is rewritten every frame forever and invalidates style document-wide
      // while the page sits perfectly still.
      if (Math.abs(skew) < 0.01) skew = 0;
      if (skew === written) return;
      written = skew;
      document.documentElement.style.setProperty(
        "--skew",
        `${skew.toFixed(3)}deg`
      );
    };
    gsap.ticker.add(skewTick);

    return () => {
      cancelled = true;
      gsap.ticker.remove(raf);
      gsap.ticker.remove(skewTick);
      lenis.destroy();
      document.documentElement.style.removeProperty("--skew");
    };
  }, []);

  return null;
}
