"use client";

import { useEffect, useRef, useState } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

export function RotatingWord({
  words,
  interval = 2200,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const rollRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const maxLen = Math.max(...words.map((w) => w.length));

  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words, interval]);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tl = gsap.timeline();
      tl.fromTo(
        rollRef.current,
        { yPercent: 115 },
        { yPercent: 0, duration: 0.5, ease: EASE },
        0
      ).fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.65, ease: EASE },
        0.08
      );
    },
    { dependencies: [index] }
  );

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span
        aria-hidden="true"
        className="relative inline-block overflow-hidden align-bottom font-mono text-poster"
        style={{ width: `${maxLen}ch` }}
      >
        <span ref={rollRef} className="block">
          {words[index]}
        </span>
        <span
          ref={lineRef}
          className="absolute bottom-[0.08em] left-0 h-px origin-left bg-poster/50"
          style={{ width: `${words[index].length}ch` }}
        />
      </span>
    </>
  );
}
