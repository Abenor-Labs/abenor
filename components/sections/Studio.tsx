import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "./Section";
import { CONTACT_EMAIL, mailto } from "@/lib/site";

const FACTS = [
  { label: "Founded", value: "2026" },
  { label: "Timezone", value: "IST · UTC+5:30" },
  { label: "Email", value: CONTACT_EMAIL, href: mailto("Hello Abenor") },
  { label: "Calls", value: "Calendly, by appointment" },
];

export function Studio() {
  return (
    <Section id="studio" index="05" label="The studio" title={["One person", "answers."]}>
      <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
        <Reveal>
          <p className="max-w-[46ch] text-lg leading-relaxed md:text-xl">
            Abenor is Mahamad Suhail. The person who scopes your workflow is
            the person who writes it and the person who replies when something
            looks off. There is no account manager between you and the
            keyboard.
          </p>
          <p className="mt-6 max-w-[46ch] leading-relaxed text-ink/70">
            Your morning there is evening here, IST. Async by default keeps
            everyone honest. Calls happen when they are worth
            everyone&rsquo;s calendar.
          </p>
          <dl
            className="mt-10 divide-y divide-line border-y border-line font-mono text-xs uppercase tracking-[0.08em]"
          >
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-4"
              >
                <dt className="text-ink/70">{fact.label}</dt>
                <dd>
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="underline decoration-poster decoration-2 underline-offset-4 transition-opacity duration-150 hover:opacity-60"
                    >
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1}>
          <figure>
            <div className="relative aspect-[4/5] border border-line">
              <Picture
                name="studio-desk"
                widths={[600, 1200]}
                ratio={[4, 5]}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Overhead view of a minimal wooden desk with a keyboard, grid notebook, pen and coffee"
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-ink/70">
              <span className="text-poster">(FIG. 03)</span> The desk ·
              Illustrative
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
