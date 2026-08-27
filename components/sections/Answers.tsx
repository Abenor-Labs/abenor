"use client";

import { useRef, useCallback, useId, useState } from "react";
import { gsap, EASE, reducedMotion } from "@/lib/gsap";
import { Section } from "./Section";

const QA = [
  {
    q: "Two shipped projects and neither was paid. Why would I trust you?",
    a: "Because you just read that in our own writing, before we knew you were looking. Ask for the walkthrough of either project on the call. We would rather show unfinished honesty than polished fiction.",
  },
  {
    q: "What does it cost?",
    a: "One workflow, two weeks, a fixed fee agreed before anything starts. The number depends on the task, so it gets named on the call instead of hidden until the invoice.",
  },
  {
    q: "What if it turns out not to be worth automating?",
    a: "Then the first call ends with that answer and you have lost fifteen minutes. We would rather be useful than busy.",
  },
  {
    q: "Who owns what gets built?",
    a: "You do. Source code, repository, credentials, documentation. Handover is part of the fee, not an upsell.",
  },
  {
    q: "What happens when it breaks at 11pm?",
    a: "Automation runs without supervision, which is the point of building it. When something does need hands, you email a person who knows the system, not a ticket queue.",
  },
];

function AccordionItem({ item }: { item: (typeof QA)[number] }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  const toggle = useCallback(() => {
    const content = contentRef.current;
    const grid = gridRef.current;
    if (!content || !grid) return;

    const isOpen = grid.dataset.open === "true";
    const instant = reducedMotion();

    if (isOpen) {
      grid.dataset.open = "false";
      setOpen(false);
      if (instant) {
        gsap.set(grid, { gridTemplateRows: "0fr" });
        gsap.set(content, { opacity: 0 });
      } else {
        gsap.to(grid, {
          gridTemplateRows: "0fr",
          duration: 0.35,
          ease: EASE,
        });
        gsap.to(content, {
          opacity: 0,
          duration: 0.2,
          ease: EASE,
        });
      }
    } else {
      grid.dataset.open = "true";
      setOpen(true);
      if (instant) {
        gsap.set(grid, { gridTemplateRows: "1fr" });
        gsap.set(content, { opacity: 1 });
      } else {
        gsap.to(grid, {
          gridTemplateRows: "1fr",
          duration: 0.4,
          ease: EASE,
        });
        gsap.to(content, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: EASE,
        });
      }
    }
  }, []);

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        id={buttonId}
        onClick={toggle}
        className="flex w-full min-h-[44px] cursor-pointer items-baseline justify-between gap-4 py-7 text-left md:gap-8"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="max-w-[48ch] text-lg font-normal md:text-xl">
          {item.q}
        </span>
        <span
          aria-hidden="true"
          className={`select-none font-mono text-xl leading-none text-poster transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        ref={gridRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className="grid"
        style={{ gridTemplateRows: "0fr" }}
        data-open="false"
      >
        <div ref={contentRef} className="min-h-0 overflow-hidden opacity-0">
          <div className="max-w-[62ch] pb-8 pr-8 leading-relaxed text-ink/70 md:pr-16 md:text-lg">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Answers() {
  return (
    <Section
      id="answers"
      index="06"
      label="Straight answers"
      title={["Asked before", "you ask."]}
    >
      <div className="mt-14 border-y border-line">
        {QA.map((item) => (
          <AccordionItem key={item.q} item={item} />
        ))}
      </div>
    </Section>
  );
}
