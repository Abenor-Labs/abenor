import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Section } from "./Section";

type Row = {
  n: string;
  name: string;
  what: string;
  status: string;
  role?: string;
  href?: string;
  hrefLabel?: string;
  shot?: string;
  shotAlt?: string;
  face?: string;
  quote?: string;
};

const ROWS: Row[] = [
  {
    n: "01",
    name: "Harshith Varma",
    role: "Game developer",
    what: "Portfolio site. Designed, built, deployed, handed over.",
    href: "https://harshithvarma.vercel.app/",
    hrefLabel: "harshithvarma.vercel.app",
    shot: "work/harshith-site",
    shotAlt:
      "Harshith Varma's portfolio site: a dark landing page with a large wordmark and tilted project cards",
    face: "people/harshith-varma",
    quote:
      "I am extremely happy with the final result and would highly recommend you to anyone looking for a talented and reliable web designer. I look forward to working with you again in the future.",
    status: "Unpaid",
  },
  {
    n: "02",
    name: "Manish Chetla",
    role: "Gameplay programmer",
    what: "Portfolio site. Design, build, animation.",
    href: "https://manish-chetla.vercel.app/",
    hrefLabel: "manish-chetla.vercel.app",
    shot: "work/manish-site",
    shotAlt:
      "Manish Chetla's portfolio site: a dark split layout with a heavy display headline beside a featured game build",
    face: "people/manish-chetla",
    quote:
      "You created a clean, modern, and responsive website that perfectly matches my style. The smooth animations, great performance, and attention to detail really stand out.",
    status: "Unpaid",
  },
  {
    n: "03",
    name: "This website",
    what: "Designed, written and built in-house. Motion and all.",
    status: "Portfolio",
  },
];

function ReceiptRow({ row }: { row: Row }) {
  return (
    <li className="grid gap-x-10 gap-y-6 py-10 md:grid-cols-[3.5rem_17rem_1fr] md:py-14">
      <div className="flex items-baseline justify-between md:block">
        <span className="font-mono text-sm text-poster">({row.n})</span>
        <span
          className={`font-mono text-xs uppercase tracking-[0.08em] md:hidden ${
            row.status === "Unpaid" ? "text-poster" : "text-ink/70"
          }`}
        >
          {row.status}
        </span>
      </div>

      {row.shot && row.shotAlt && (
        <a
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative aspect-[16/10] overflow-hidden border border-line">
            <Picture
              name={row.shot}
              widths={[420, 840]}
              ratio={[16, 10]}
              sizes="(min-width: 768px) 17rem, 100vw"
              alt={row.shotAlt}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
            />
          </div>
        </a>
      )}

      <div className={row.shot ? undefined : "md:col-span-2"}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h3 className="text-xl font-normal md:text-2xl">
            {row.name}
            {row.role && (
              <span className="ml-3 font-mono text-xs uppercase tracking-[0.08em] text-ink/70">
                {row.role}
              </span>
            )}
          </h3>
          <span
            className={`hidden font-mono text-xs uppercase tracking-[0.08em] md:inline ${
              row.status === "Unpaid" ? "text-poster" : "text-ink/70"
            }`}
          >
            {row.status}
          </span>
        </div>

        <p className="mt-2 max-w-[52ch] leading-relaxed text-ink/70">
          {row.what}
        </p>

        {row.href && row.hrefLabel && (
          <a
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link mt-3 inline-flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 hover:text-poster"
          >
            {row.hrefLabel}
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}

        {row.quote && row.face && (
          <figure className="mt-6 border-l-0 border-t border-line pt-6">
            <blockquote className="max-w-[54ch] text-pretty leading-relaxed text-ink">
              {row.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Picture
                name={row.face}
                widths={[64, 128]}
                ratio={[1, 1]}
                sizes="32px"
                alt=""
                className="size-8 shrink-0 rounded-full border border-line object-cover"
              />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink/70">
                {row.name}
                {row.role && ` · ${row.role}`}
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </li>
  );
}

export function Receipts() {
  return (
    <Section
      id="proof"
      index="04"
      label="Receipts"
      title={["Receipts.", "Weakness included."]}
      intro={
        "Straight answer about our track record before you have to ask: two clients so far, and both projects were unpaid. That reads better here than it would during due diligence. Both sites are still live — open them."
      }
    >
      <ul className="mt-14 divide-y divide-line border-y border-line">
        {ROWS.map((row) => (
          <ReceiptRow key={row.n} row={row} />
        ))}
      </ul>
      <Reveal className="mt-12">
        <p className="max-w-[62ch] text-pretty leading-relaxed text-ink/70 md:text-lg">
          Both clients got working software and paid nothing for it. We state
          that here because trust starts with someone volunteering the thing
          you would rather hide. What we charge today gets named on the first
          call, before any work begins.
        </p>
      </Reveal>
    </Section>
  );
}
