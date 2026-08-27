"use client";

import { useRef } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/gsap";

const SOURCES = ["WhatsApp", "Spreadsheet", "Email", "Web form"];
const STAGES = ["Watch", "Check", "Write"];
const SINKS = ["CRM", "Sheet", "Slack", "Invoice"];

const W = 1200;
const H = 460;
const NODE_W = 190;
const NODE_H = 46;
const LEFT_X = 0;
const RIGHT_X = W - NODE_W;
const CORE_X = 452;
const CORE_W = 296;
const CORE_TOP = 128;
const CORE_H = 204;
const MID = H / 2;

const rowY = (i: number, n: number) => {
  const span = (n - 1) * 78;
  return MID - span / 2 + i * 78 - NODE_H / 2;
};

/** Orthogonal three-segment connector: out, across, in. Swiss, not a bezier. */
const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;
};

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
        repeatDelay: 0.5,
        scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 15%", toggleActions: "play pause resume pause" },
      });

      pulses.forEach((pulse, i) => {
        const path = pulse.previousElementSibling as SVGPathElement | null;
        if (!path) return;
        const len = path.getTotalLength();
        tl.fromTo(
          pulse,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.14,
            ease: "none",
            onStart: () => {
              gsap.set(pulse, { attr: { r: 4 } });
            },
          },
          i * 0.16
        ).to(
          pulse,
          {
            duration: 1.1,
            ease: "power1.inOut",
            onUpdate: function () {
              const p = path.getPointAtLength(len * this.progress());
              pulse.setAttribute("cx", String(p.x));
              pulse.setAttribute("cy", String(p.y));
            },
          },
          i * 0.16
        ).to(pulse, { opacity: 0, duration: 0.2 }, i * 0.16 + 1.0);
      });

      stages.forEach((stage, i) => {
        tl.to(stage, { opacity: 1, duration: 0.3, ease: EASE }, 0.5 + i * 0.22).to(
          stage,
          { opacity: 0, duration: 0.4, ease: EASE },
          1.3 + i * 0.22
        );
      });
    },
    { scope: root }
  );

  const inPaths = SOURCES.map((_, i) =>
    elbow(NODE_W, rowY(i, SOURCES.length) + NODE_H / 2, CORE_X, MID)
  );
  const outPaths = SINKS.map((_, i) =>
    elbow(CORE_X + CORE_W, MID, RIGHT_X, rowY(i, SINKS.length) + NODE_H / 2)
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
        Four sources — WhatsApp, a spreadsheet, email and a web form — feed into
        a single Abenor workflow that watches, checks and writes. It sends the
        result out to a CRM, a sheet, Slack and an invoice, without anyone
        retyping anything.
      </desc>

      {inPaths.map((d, i) => (
        <g key={`in-${i}`}>
          <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
          <circle data-pulse r={4} fill="var(--color-poster)" opacity={0} />
        </g>
      ))}
      {outPaths.map((d, i) => (
        <g key={`out-${i}`}>
          <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth={1} />
          <circle data-pulse r={4} fill="var(--color-poster)" opacity={0} />
        </g>
      ))}

      {SOURCES.map((label, i) => {
        const y = rowY(i, SOURCES.length);
        return (
          <g key={label}>
            <rect x={LEFT_X} y={y} width={NODE_W} height={NODE_H} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1} />
            <text x={LEFT_X + 16} y={y + NODE_H / 2 + 4} className="fill-ink font-mono text-[15px] uppercase tracking-[0.08em]">
              {label}
            </text>
          </g>
        );
      })}

      <rect x={CORE_X} y={CORE_TOP} width={CORE_W} height={CORE_H} fill="var(--color-ink)" />
      <text x={CORE_X + CORE_W / 2} y={CORE_TOP + 34} textAnchor="middle" className="fill-paper font-mono text-[13px] uppercase tracking-[0.16em]" opacity={0.65}>
        One workflow
      </text>
      {STAGES.map((stage, i) => {
        const y = CORE_TOP + 62 + i * 44;
        return (
          <g key={stage}>
            <rect x={CORE_X + 28} y={y} width={CORE_W - 56} height={32} fill="none" stroke="var(--color-paper)" strokeWidth={1} opacity={0.28} />
            <rect data-stage x={CORE_X + 28} y={y} width={CORE_W - 56} height={32} fill="none" stroke="var(--color-poster)" strokeWidth={2} />
            <text x={CORE_X + CORE_W / 2} y={y + 21} textAnchor="middle" className="fill-paper font-mono text-[15px] uppercase tracking-[0.1em]">
              {stage}
            </text>
          </g>
        );
      })}

      {SINKS.map((label, i) => {
        const y = rowY(i, SINKS.length);
        return (
          <g key={label}>
            <rect x={RIGHT_X} y={y} width={NODE_W} height={NODE_H} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1} />
            <text x={RIGHT_X + 16} y={y + NODE_H / 2 + 4} className="fill-ink font-mono text-[15px] uppercase tracking-[0.08em]">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
