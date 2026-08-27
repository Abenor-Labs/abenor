"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIKLMNOPRSTUVXYZ·/#*+";

const isFixed = (ch: string) => ch === " " || ch === "·";

/**
 * Scrambles into place once, on first sight. The animation writes textContent
 * on pre-built spans rather than driving React state — at a 34ms tick, state
 * would re-render and reconcile the whole string thirty times a second.
 */
export function DecodeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fx = fxRef.current;
    if (!el || !fx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id: number | undefined;

    const start = () => {
      const chars = [...text];
      const steps = chars.length + 6;
      let frame = 0;

      const spans = chars.map(() => document.createElement("span"));
      fx.replaceChildren(...spans);

      const paint = () => {
        for (let i = 0; i < chars.length; i++) {
          const span = spans[i];
          if (i < frame - 3) {
            if (span.textContent !== chars[i]) span.textContent = chars[i];
            if (span.className) span.className = "";
          } else if (i < frame) {
            span.textContent = chars[i];
            span.className = "text-poster";
          } else {
            span.textContent = isFixed(chars[i])
              ? chars[i]
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            span.className = "text-ink/40";
          }
        }
      };

      paint();
      id = window.setInterval(() => {
        frame++;
        if (frame >= steps) {
          if (id) clearInterval(id);
          fx.replaceChildren(text);
          return;
        }
        paint();
      }, 34);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={fxRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
