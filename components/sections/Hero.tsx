import { DecodeText } from "@/components/motion/DecodeText";
import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { WordmarkIntro } from "@/components/motion/WordmarkIntro";
import { CALENDLY_URL } from "@/lib/site";
import { GridInk } from "./GridInk";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <GridInk />
      <div className="relative z-10 mx-auto flex w-full max-w-[76rem] flex-1 flex-col justify-end px-4 pb-14 pt-32 md:px-8 md:pb-20">
        <DecodeText
          text="Software studio · Est 2026 · IST"
          className="font-mono text-xs uppercase tracking-[0.08em] text-ink/70"
        />
        <WordmarkIntro />
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal delay={0.35} className="md:col-span-6">
            <p className="max-w-[42ch] text-pretty text-lg leading-relaxed text-ink/70 md:text-xl">
              We take the one{" "}
              <RotatingWord words={["task", "sheet", "sync", "report"]} />{" "}
              still eating your week and turn it into software that runs
              without you.
            </p>
          </Reveal>
          <Reveal
            delay={0.45}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end"
          >
            <Magnet>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="press cta-type flex min-h-[56px] items-center bg-ink px-8 font-mono text-xs uppercase text-paper transition-colors duration-200 hover:bg-poster"
              >
                Book a call
              </a>
            </Magnet>
            <a
              href="#leak"
              className="nav-link flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 hover:text-poster"
            >
              Start where it hurts ↓
            </a>
          </Reveal>
        </div>
        <div className="mt-16 hidden justify-between border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.08em] text-ink/70 sm:flex">
          <span>Workflow automation</span>
          <span>Websites</span>
          <span>iOS &amp; Android apps</span>
          <span>Internal tools</span>
        </div>
      </div>
    </section>
  );
}
