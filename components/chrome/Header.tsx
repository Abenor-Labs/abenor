"use client";

import { NAV_LINKS, CALENDLY_URL } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

export function Header() {
  const barRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const setScaleX = gsap.quickSetter(barRef.current, "scaleX") as (
      value: number
    ) => void;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScaleX(self.progress),
    });

    return () => st.kill();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <span
        ref={barRef}
        aria-hidden="true"
        className="progress-rule absolute inset-x-0 top-0 h-[2px] scale-x-0"
      />
      <div className="header-bg border-b chrome-line">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[76rem] items-center justify-between px-4 md:px-8"
        >
          <a
            href="#main"
            className="chrome-text flex min-h-[44px] items-center font-mono text-sm font-medium uppercase tracking-[0.08em]"
          >
            Abenor
            <span aria-hidden="true" className="ml-1.5 inline-block size-2 bg-poster" />
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link chrome-text flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.08em] transition-opacity duration-150 hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-btn press cta-type flex min-h-[44px] items-center px-4 font-mono text-xs uppercase hover:opacity-90"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
