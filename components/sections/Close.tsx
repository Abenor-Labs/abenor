import { Magnet } from "@/components/motion/Magnet";
import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";
import { CALENDLY_URL, CONTACT_EMAIL, mailto } from "@/lib/site";

const STRIP_ITEMS = [
  "Thirty minutes",
  "Bring the one task",
  "Leave with an answer",
  "No deck",
];

function StripRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {STRIP_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center font-mono text-xs uppercase tracking-[0.08em] text-paper/90"
        >
          <span className="whitespace-nowrap py-3">{item}</span>
          <span aria-hidden="true" className="mx-8 inline-block size-1.5 bg-paper/70" />
        </li>
      ))}
    </ul>
  );
}

function CropMarks() {
  const base = "crop-mark absolute size-4 border-paper/50";
  return (
    <>
      <span aria-hidden="true" className={`${base} left-4 top-24 border-l border-t md:left-8 md:top-28`} />
      <span aria-hidden="true" className={`${base} right-4 top-24 border-r border-t md:right-8 md:top-28`} />
      <span aria-hidden="true" className={`${base} bottom-24 left-4 border-b border-l md:bottom-20 md:left-8`} />
      <span aria-hidden="true" className={`${base} bottom-24 right-4 border-b border-r md:bottom-20 md:right-8`} />
    </>
  );
}

export function Close() {
  return (
    <footer id="contact" className="relative z-10 bg-poster text-paper">
      <div className="ticker overflow-hidden border-b border-paper/20" data-skew>
        <div className="ticker-track flex w-max [animation-duration:64s]">
          <StripRow />
          <StripRow hidden />
        </div>
      </div>
      <CropMarks />
      <div className="mx-auto flex min-h-[88svh] max-w-[76rem] flex-col justify-between px-4 pb-8 pt-24 md:px-8 md:pt-32">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-paper">
            (07) THE ASK
          </p>
          <div data-skew className="w-fit">
            <MaskedLines
              id="contact-title"
              lines={["Book the", "call."]}
              className="mt-8 text-[clamp(3.5rem,11vw,9.5rem)] font-light leading-[0.95] tracking-tight"
            />
          </div>
          <Reveal className="mt-10">
            <p className="max-w-[46ch] text-lg leading-relaxed md:text-xl">
              Thirty minutes. Bring the one task that eats the most time.
              Leave knowing whether it is worth fixing, even when the answer
              is no.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            <Magnet>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-type inline-flex min-h-[64px] items-center bg-paper px-10 font-mono text-xs uppercase text-poster transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                Book a call
              </a>
            </Magnet>
            <a
              href={mailto("Booking a call did not fit")}
              className="inline-flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.08em] underline decoration-paper/50 underline-offset-8 transition-opacity duration-150 hover:opacity-70"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
        <div className="mt-24 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-paper/25 pt-6 font-mono text-xs uppercase tracking-[0.08em] text-paper/90">
          <span>Abenor © 2026</span>
          <span>IST · UTC+5:30</span>
          <span>Set in IBM Plex</span>
        </div>
      </div>
    </footer>
  );
}
