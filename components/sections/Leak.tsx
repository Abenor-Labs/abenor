import { Picture } from "@/components/ui/Picture";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "./Section";
import { PainStrikes } from "./PainStrikes";

export function Leak() {
  return (
    <Section
      id="leak"
      index="01"
      label="The leak"
      title={["The work you", "keep doing twice."]}
      intro={
        "It is not a big task. That is exactly the problem. It is small enough that nobody stops it, and heavy enough that it quietly eats the week."
      }
    >
      <PainStrikes />
      <figure className="mt-16 grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/3] border border-line">
            <Picture
              name="leak-desk"
              widths={[400, 800]}
              ratio={[4, 3]}
              sizes="(min-width: 768px) 33vw, 100vw"
              alt="A desk buried under scattered printed spreadsheets and tangled cables"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
          </div>
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-ink/70">
            <span className="text-poster">(FIG. 02)</span> The desk it happens
            on · Illustrative
          </figcaption>
        </div>
        <Reveal className="md:col-span-8 md:flex md:justify-end">
          <p className="max-w-[22ch] text-balance text-2xl font-light leading-tight md:text-4xl">
            Four hours a week is <CountUp to={200} /> hours a year
            <span className="text-poster">.</span>
          </p>
        </Reveal>
      </figure>
    </Section>
  );
}
