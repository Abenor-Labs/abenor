import type { Metadata } from "next";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[100svh] max-w-[76rem] flex-col justify-center px-4 py-24 md:px-8"
    >
      <p className="font-mono text-xs uppercase tracking-[0.08em]">
        <span className="text-poster">(404)</span>{" "}
        <span className="text-ink/70">Nothing filed here</span>
      </p>
      <h1 className="mt-8 max-w-[16ch] text-balance text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1.02] tracking-tight">
        This page does not exist
        <span className="text-poster">.</span>
      </h1>
      <p className="mt-8 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink/70">
        The address is wrong or the page was never here. Everything Abenor has
        published lives on one page.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/"
          className="press cta-type flex min-h-[56px] items-center bg-ink px-8 font-mono text-xs uppercase text-paper transition-colors duration-200 hover:bg-poster"
        >
          Back to the start
        </Link>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={`/${link.href}`}
            className="nav-link flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 hover:text-poster"
          >
            {link.label}
          </a>
        ))}
      </div>
    </main>
  );
}
