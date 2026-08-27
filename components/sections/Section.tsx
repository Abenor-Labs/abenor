import type { ReactNode } from "react";
import { MaskedLines } from "@/components/motion/MaskedLines";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title?: string[];
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="relative z-10 mx-auto max-w-[76rem] px-4 py-20 md:px-8 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.08em]">
          <span className="text-poster">({index})</span>{" "}
          <span className="text-ink/70">{label}</span>
        </p>
        {title && (
          <MaskedLines
            id={`${id}-title`}
            lines={title}
            className="mt-10 max-w-[18ch] text-balance text-[clamp(2.125rem,5vw,3.75rem)] font-light leading-[1.05] tracking-tight"
          />
        )}
        {intro && (
          <p className="mt-8 max-w-[62ch] text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
