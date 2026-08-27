"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";
import { MARKS } from "./marks";

const SOURCES = ["whatsapp", "gmail", "googleforms", "googlesheets"] as const;
const SINKS = ["hubspot", "airtable", "notion", "stripe"] as const;
const STAGES = ["Watch", "Check", "Write"];

const W = 1200;
const H = 480;
const MID = H / 2;

const NODE_W = 236;
const NODE_H = 56;
const GAP = 84;

const LEFT_X = 0;
const LEFT_BUS = 320;
const CORE_X = 452;
const CORE_W = 296;
const CORE_TOP = 132;
const CORE_H = 216;
const RIGHT_BUS = 880;
const RIGHT_X = W - NODE_W;

const rowY = (i: number, n: number) => MID - ((n - 1) * GAP) / 2 + i * GAP;

/** node edge -> bus -> core. The bus is drawn once, so it reads as a manifold. */
const inPath = (y: number) =>
  `M ${NODE_W} ${y} H ${LEFT_BUS} V ${MID} H ${CORE_X}`;
const outPath = (y: number) =>
  `M ${CORE_X + CORE_W} ${MID} H ${RIGHT_BUS} V ${y} H ${RIGHT_X}`;

function Mark({ id, x, y }: { id: string; x: number; y: number }) {
  const mark = MARKS[id];
  if (!mark) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(0.9)`}>
      <path d={mark.path} className="fill-ink" opacity={0.85} />
    </g>
  );
}

function Node({ id, x, y }: { id: string; x: number; y: number }) {
  const mark = MARKS[id];
  return (
    <g>
      <rect
        x={x}
        y={y - NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        fill="var(--color-paper)"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
      />
      <Mark id={id} x={x + 20} y={y - 11} />
      <text
        x={x + 60}
        y={y + 5}
        className="fill-ink font-mono text-[15px] uppercase tracking-[0.06em]"
      >
        {mark?.title}
      </text>
    </g>
  );
}

export function FlowDiagram() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) return;

      const pulses = svg.querySelectorAll<SVGCircleElement>("[data-pulse]");
      const stages = svg.querySelectorAll<SVGRectElement>("[data-stage]");

      if (reducedMotion()) {
        gsap.set(pulses, { opacity: 0 });
        gsap.set(stages, { opacity: 0 });
        return;
      }

      gsap.set(stages, { opacity: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.6,
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play pause resume pause",
        },
      });

      pulses.forEach((pulse, i) => {
        const path = pulse.previousElementSibling as SVGPathElement | null;
        if (!path) return;
        const len = path.getTotalLength();
        const at = i * 0.14;
        tl.to(pulse, { opacity: 1, duration: 0.12, ease: "none" }, at)
          .to(
            pulse,
            {
              duration: 1.15,
              ease: "power1.inOut",
              onUpdate: function () {
                const p = path.getPointAtLength(len * this.progress());
                pulse.setAttribute("cx", String(p.x));
                pulse.setAttribute("cy", String(p.y));
              },
            },
            at
          )
          .to(pulse, { opacity: 0, duration: 0.18 }, at + 1.05);
      });

      stages.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, duration: 0.28, ease: EASE }, 0.55 + i * 0.2)
          .to(stage, { opacity: 0, duration: 0.4, ease: EASE }, 1.35 + i * 0.2);
      });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="flow-title flow-desc"
    >
      <title id="flow-title">How one workflow runs without you</title>
      <desc id="flow-desc">
        WhatsApp, Gmail, Google Forms and Google Sheets feed into a single
        Abenor workflow that watches, checks and writes. It sends the result on
        to HubSpot, Airtable, Notion and Stripe, without anyone retyping
        anything.
      </desc>

      <path
        d={`M ${LEFT_BUS} ${rowY(0, SOURCES.length)} V ${rowY(SOURCES.length - 1, SOURCES.length)}`}
        stroke="var(--color-line-strong)"
        strokeWidth={1}
        fill="none"
      />
      <path
        d={`M ${RIGHT_BUS} ${rowY(0, SINKS.length)} V ${rowY(SINKS.length - 1, SINKS.length)}`}
        stroke="var(--color-line-strong)"
        strokeWidth={1}
        fill="none"
      />

      {SOURCES.map((id, i) => (
        <g key={`in-${id}`}>
          <path d={inPath(rowY(i, SOURCES.length))} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
          <circle data-pulse r={4} fill="var(--color-poster)" opacity={0} />
          <circle cx={LEFT_BUS} cy={rowY(i, SOURCES.length)} r={3} className="fill-ink" opacity={0.5} />
        </g>
      ))}
      {SINKS.map((id, i) => (
        <g key={`out-${id}`}>
          <path d={outPath(rowY(i, SINKS.length))} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
          <circle data-pulse r={4} fill="var(--color-poster)" opacity={0} />
          <circle cx={RIGHT_BUS} cy={rowY(i, SINKS.length)} r={3} className="fill-ink" opacity={0.5} />
        </g>
      ))}

      {SOURCES.map((id, i) => (
        <Node key={id} id={id} x={LEFT_X} y={rowY(i, SOURCES.length)} />
      ))}
      {SINKS.map((id, i) => (
        <Node key={id} id={id} x={RIGHT_X} y={rowY(i, SINKS.length)} />
      ))}

      <rect x={CORE_X} y={CORE_TOP} width={CORE_W} height={CORE_H} fill="var(--color-ink)" />
      <text
        x={CORE_X + CORE_W / 2}
        y={CORE_TOP + 36}
        textAnchor="middle"
        className="fill-paper font-mono text-[13px] uppercase tracking-[0.16em]"
        opacity={0.6}
      >
        One workflow
      </text>
      {STAGES.map((stage, i) => {
        const y = CORE_TOP + 66 + i * 46;
        return (
          <g key={stage}>
            <rect x={CORE_X + 28} y={y} width={CORE_W - 56} height={34} fill="none" stroke="var(--color-paper)" strokeWidth={1} opacity={0.25} />
            <rect data-stage x={CORE_X + 28} y={y} width={CORE_W - 56} height={34} fill="none" stroke="var(--color-poster)" strokeWidth={2} />
            <text x={CORE_X + CORE_W / 2} y={y + 22} textAnchor="middle" className="fill-paper font-mono text-[15px] uppercase tracking-[0.1em]">
              {stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
