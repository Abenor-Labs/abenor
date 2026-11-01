"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import mistyValley from "@/public/photos/misty-valley.jpg";
import { scrollToY } from "@/lib/scroll/LenisProvider";
import { SectionHead } from "./primitives";

/**
 * Four chores on the left, the workflow that retires each one on the right.
 *
 * On a desktop with room for it the pair pins to the viewport, and the page
 * scroll walks through the chores one by one: the visitor reads each problem
 * next to its fix without hunting for a control. The bar under the active row
 * fills with the scroll, so it is always clear how much is left before the
 * page lets go. Smaller screens keep the plain tap-to-select list.
 */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 720px)";
const CHORES = [
  {
    chore:
      "Leads typed out of WhatsApp into a spreadsheet, then typed again into the CRM.",
    title: "Lead capture",
    steps: [
      "New WhatsApp message",
      "Pull name, number, need",
      "Create CRM contact, tag source",
    ],
    result: "Typed by nobody",
  },
  {
    chore: "An invoice sheet three people edit and nobody trusts by Thursday.",
    title: "Invoice ledger",
    steps: [
      "Invoice raised in one place",
      "Totals reconcile on save",
      "Every edit logged with a name",
    ],
    result: "One version of the truth",
  },
  {
    chore:
      "A sync that fails overnight and gets discovered at noon, after the damage.",
    title: "Nightly sync",
    steps: [
      "Sync runs at 2:00",
      "Retries the rows that failed",
      "Alerts a person with the exact row",
    ],
    result: "Known by 2:05, not noon",
  },
  {
    chore:
      "The same five fields copied into the same four tools, day after day.",
    title: "Fan-out",
    steps: [
      "Fields entered once",
      "Validated before they travel",
      "Pushed to all four tools",
    ],
    result: "Entered once, everywhere",
  },
];

export function Leak() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const item = CHORES[active];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mq = window.matchMedia(PIN_QUERY);
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const pos = p * CHORES.length;
      const i = Math.min(CHORES.length - 1, Math.floor(pos));
      el.style.setProperty("--step", String(p >= 1 ? 1 : pos - i));
      setActive(i);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  // While pinned, a row is a position in the scroll, so picking one scrolls
  // there and the scroll handler does the selecting.
  const pick = (i: number) => {
    const el = track.current;
    if (!el || !window.matchMedia(PIN_QUERY).matches) return setActive(i);
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    scrollToY(top + span * ((i + 0.05) / CHORES.length));
  };

  return (
    <section id="leak" className="pt-32 sm:pt-44">
      <div className="wrap">
        <SectionHead
          eyebrow="The leak"
          title={
            <>
              The work you keep <br className="hidden sm:block" />
              <em className="italic">doing twice.</em>
            </>
          }
          lede="It is not a big task. That is exactly the problem. Small enough that nobody stops it, heavy enough that it quietly eats the week."
        />
      </div>

      <div ref={track} className="mt-16 sm:mt-20 pin:mt-6 pin:h-[320vh]">
        <div className="wrap pin:sticky pin:top-0 pin:flex pin:h-screen pin:items-center pin:pt-[68px]">
          <div className="grid w-full items-stretch gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div className="reveal flex flex-col">
              <p className="mb-4 text-[14px] text-ink-3">
                Recognise one? Pick it
                <span className="hidden pin:inline">, or keep scrolling</span>.
              </p>
              <ol
                className="border-t border-rule"
                role="tablist"
                aria-label="Chores"
              >
                {CHORES.map((c, i) => {
                  const on = i === active;
                  return (
                    <li key={c.title} className="relative border-b border-rule">
                      <button
                        type="button"
                        role="tab"
                        id={`chore-tab-${i}`}
                        aria-selected={on}
                        aria-controls="chore-panel"
                        onClick={() => pick(i)}
                        className="group flex w-full gap-4 py-5 text-left"
                      >
                        <span
                          className={`pt-[3px] font-mono text-[12px] transition-colors duration-150 ${
                            on ? "text-ember" : "text-ink-3"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`text-[17px] leading-[1.5] transition-colors duration-150 ${
                            on
                              ? "text-ink"
                              : "text-ink-3 group-hover:text-ink-2"
                          }`}
                        >
                          {c.chore}
                        </span>
                      </button>
                      {on && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-px left-0 hidden h-px w-full origin-left bg-ink pin:block"
                          style={{ transform: "scaleX(var(--step, 0))" }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
              <p className="mt-6 text-[15px] leading-[1.6] text-ink-2">
                Four hours a week is two hundred hours a year. That is the
                number we go after.
              </p>
            </div>

            <div className="reveal photo-edge relative isolate flex min-h-[520px] items-center pin:h-[min(640px,calc(100vh-140px))] pin:min-h-0 justify-center overflow-hidden rounded-[24px] p-5 sm:p-10">
              <Image
                src={mistyValley}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 720px, 100vw"
                className="-z-10 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/10"
              />

              <div
                id="chore-panel"
                role="tabpanel"
                aria-labelledby={`chore-tab-${active}`}
                className="float w-full max-w-[400px] rounded-[20px] bg-white p-2"
              >
                <div className="flex items-center justify-between px-3 pt-2 pb-3">
                  <p className="text-[15px] font-medium text-ink">
                    {item.title}
                  </p>
                  <p className="font-mono text-[11px] text-ink-3">
                    {active + 1}/4
                  </p>
                </div>

                <ol key={active} className="flex flex-col gap-1">
                  {item.steps.map((s, i) => (
                    <li
                      key={s}
                      className="stage-in is-in flex items-center gap-3 rounded-[12px] bg-paper px-3 py-3 text-[14px] text-ink"
                      style={{
                        animationDuration: "450ms",
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white font-mono text-[10.5px] text-ink-2 shadow-[0_0_0_1px_rgba(17,17,16,0.08)]">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>

                <div className="mt-2 flex items-center justify-between rounded-[12px] px-3 py-3">
                  <span className="inline-flex items-center gap-2 text-[14px] text-ink">
                    <span
                      aria-hidden="true"
                      className="live-dot size-1.5 rounded-full bg-live"
                    />
                    {item.result}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-3 uppercase">
                    Illustrative
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
