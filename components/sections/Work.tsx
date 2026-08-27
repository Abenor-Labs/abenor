import { Section } from "./Section";

const SERVICES = [
  {
    n: "01",
    title: "Workflow automation",
    body: "The sync that used to fail overnight simply stops failing. The handoff happens without the hands.",
    tag: "Integrations",
  },
  {
    n: "02",
    title: "Websites",
    body: "Fast, findable, and yours to edit without calling anyone for typos.",
    tag: "Next.js",
  },
  {
    n: "03",
    title: "Apps for iOS and Android",
    body: "The tool leaves the desk with you, because the work already did.",
    tag: "Mobile",
  },
  {
    n: "04",
    title: "Internal tools",
    body: "Built for the spreadsheet currently holding the whole company together.",
    tag: "Databases",
  },
];

export function Work() {
  return (
    <Section
      id="work"
      index="02"
      label="What we build"
      title={["Software that", "does the chore."]}
    >
      <ul className="mt-14 divide-y divide-line border-y border-line">
        {SERVICES.map((service) => (
          <li key={service.n} className="group">
            <article className="grid gap-x-8 gap-y-2 px-4 py-8 transition-colors duration-200 group-hover:bg-paper-2 md:-mx-8 md:grid-cols-[4rem_1fr_auto] md:px-8 md:py-10">
              <span className="font-mono text-sm text-ink/60 transition-colors duration-200 group-hover:text-poster">
                ({service.n})
              </span>
              <div>
                <h3 className="relative w-fit text-xl font-normal after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-poster after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100 md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-ink/70">
                  {service.body}
                </p>
              </div>
              <span className="hidden items-center font-mono text-xs uppercase tracking-[0.08em] text-ink/70 transition-opacity duration-200 group-hover:opacity-100 sm:flex sm:opacity-60">
                {service.tag}
              </span>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
