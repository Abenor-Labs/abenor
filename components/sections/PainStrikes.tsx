"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, reducedMotion, EASE, useGSAP } from "@/lib/gsap";

export const PAINS = [
  "Leads typed out of WhatsApp into a spreadsheet, then typed again into the CRM.",
  "An invoice sheet three people edit and nobody trusts by Thursday.",
  "A sync that fails overnight and gets discovered at noon, after the damage.",
  "The same five fields copied into the same four tools, day after day.",
];

export function PainStrikes() {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const items = root.current?.querySelectorAll<HTMLElement>("[data-pain]");
      if (!items?.length) return;

      items.forEach((item, i) => {
        const strike = item.querySelector<HTMLElement>("[data-strike]");
        const label = item.querySelector<HTMLElement>("[data-label]");
        if (!strike) return;

        if (reducedMotion()) {
          gsap.set(strike, { scaleX: 1 });
          gsap.set(item.querySelector<HTMLElement>("[data-text]"), {
            color: "#a8a29e",
          });
          if (label) gsap.set(label, { opacity: 1 });
          return;
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top 82%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ delay: i * 0.18 });

            tl.fromTo(
              strike,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: EASE }
            );

            tl.to(
              item.querySelector<HTMLElement>("[data-text]"),
              { color: "#a8a29e", duration: 0.4, ease: EASE },
              "-=0.2"
            );

            if (label) {
              tl.fromTo(
                label,
                { opacity: 0 },
                { opacity: 1, duration: 0.35, ease: EASE },
                "-=0.15"
              );
            }
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <ul ref={root} className="mt-14 divide-y divide-line border-y border-line">
      {PAINS.map((pain, i) => (
        <li
          key={pain}
          data-pain
          className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[4rem_1fr_auto] md:py-8"
        >
          <span className="font-mono text-sm text-poster">
            ({String(i + 1).padStart(2, "0")})
          </span>
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl">
            <span className="pain-strike">
              <span data-text className="pain-text">
                {pain}
              </span>
              <span data-strike className="pain-strike-line" />
            </span>
          </p>
          <span
            data-label
            className="font-mono text-xs uppercase tracking-[0.08em] text-poster opacity-0"
          >
            Handled
          </span>
        </li>
      ))}
    </ul>
  );
}
