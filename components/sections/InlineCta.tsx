import { CONTACT_EMAIL, mailto } from "@/lib/site";

type InlineCtaProps = {
  eyebrow: string;
  lead: string;
  line: string;
  subject: string;
};

export function InlineCta({ eyebrow, lead, line, subject }: InlineCtaProps) {
  return (
    <section className="border-t border-line">
      <div className="relative z-10 mx-auto flex max-w-[76rem] flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-poster">
            {eyebrow}
          </p>
          <p className="mt-4 max-w-[34ch] text-xl font-light leading-snug md:text-2xl">
            {lead} {line}
          </p>
        </div>
        <div className="shrink-0">
          <a
            href={mailto(subject)}
            className="inline-flex min-h-[56px] items-center gap-3 bg-ink px-8 font-mono text-xs uppercase tracking-[0.08em] text-paper transition-colors duration-200 hover:bg-poster"
          >
            Write an email <span aria-hidden="true">→</span>
          </a>
          <p className="mt-3 font-mono text-xs text-ink/70">{CONTACT_EMAIL}</p>
        </div>
      </div>
    </section>
  );
}
