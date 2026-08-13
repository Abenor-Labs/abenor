/**
 * The meta band directly under the hero.
 *
 * Two jobs, in this order. First it puts a real client sentence on the first
 * screen, because the visitor who never scrolls past the fold currently
 * leaves having seen a claim and no evidence for it. Second it carries the
 * stack and delivery lines that used to sit in the hero itself — specs three
 * seconds in are answering a question nobody has asked yet, and they belong
 * below the thing that makes someone want to ask it.
 */
export function ProofStrip() {
  return (
    <div className="relative z-10">
      <div className="wrap border-rule flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-t py-[clamp(14px,2vw,20px)]">
        <p className="text-ink max-w-[46ch] text-[13.5px] leading-[1.6]">
          &ldquo;Smooth animations, great performance, and attention to detail.&rdquo;{' '}
          <a
            href="#proof"
            className="text-ink-3 hover:text-ink font-mono text-[10.5px] tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-300"
          >
            — Manish Chetla
          </a>
        </p>
        <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.22em] uppercase">
          Two projects shipped
        </span>
      </div>

      <div className="wrap border-rule border-t py-[clamp(12px,1.8vw,18px)]">
        {/* Each pair takes a full row until there is width for two: at 375px
            the values wrapped mid-list ("… NEXT.JS ·" / "PYTHON"), and a
            hanging indent at 10.5px with 0.22em tracking reads as broken. */}
        <dl className="text-ink-2 flex flex-col gap-x-10 gap-y-2 font-mono text-[10.5px] tracking-[0.22em] uppercase sm:flex-row sm:flex-wrap">
          <div className="flex gap-2">
            <dt className="text-ink-3">Stack</dt>
            <dd className="text-ink">TypeScript · React · Next.js · Python</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">Delivery</dt>
            <dd className="text-ink">Weekly builds · Your repo · Full handover</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
