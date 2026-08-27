"use client";

import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const FOLIOS: Array<[string, string, string]> = [
  ["#top", "(00)", "The set page"],
  ["#leak", "(01)", "The leak"],
  ["#work", "(02)", "What we build"],
  ["#process", "(03)", "How it goes"],
  ["#proof", "(04)", "Receipts"],
  ["#studio", "(05)", "The studio"],
  ["#answers", "(06)", "Straight answers"],
  ["#contact", "(07)", "The ask"],
];

export function FolioIndicator() {
  const [current, setCurrent] = useState(0);

  useGSAP(() => {
    const triggers = FOLIOS.map(([selector], i) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setCurrent(i);
        },
      });
    }).filter((st): st is ScrollTrigger => st !== null);

    return () => triggers.forEach((st) => st.kill());
  }, []);

  const [, folio, label] = FOLIOS[current];

  return (
    <div
      aria-hidden="true"
      className="chrome-text pointer-events-none fixed bottom-4 left-4 z-40 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] md:flex"
    >
      <span className="inline-block size-1.5 bg-poster" />
      <span>{folio}</span>
      <span className="opacity-60">{label}</span>
    </div>
  );
}
