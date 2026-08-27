"use client";

import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export function Magnet({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    // Measuring inside the pointer handler forces a layout read on every mouse
    // move. Cache it and only re-read after something could have moved it.
    let rect: DOMRect | null = null;
    const invalidate = () => {
      rect = null;
    };

    const move = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        xTo(dx * 0.25);
        yTo(dy * 0.25);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    el.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      el.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}
