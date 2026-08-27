const ITEMS = [
  "Leads typed twice",
  "Sheets nobody trusts",
  "Syncs failing overnight",
  "Copy-paste joins",
  "Reports rebuilt weekly",
  "Status chased by hand",
  "Invoices re-created",
  "Follow-ups forgotten",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center font-mono text-xs uppercase tracking-[0.08em] text-ink/70"
        >
          <span className="whitespace-nowrap py-4">{item}</span>
          <span aria-hidden="true" className="mx-8 inline-block size-1.5 bg-poster" />
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <div className="ticker relative z-10 overflow-hidden border-t border-line" data-skew>
      <div className="ticker-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
