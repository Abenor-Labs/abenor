/**
 * The meta band directly under the hero.
 *
 * One job now: put a real client sentence on the first screen, because the
 * visitor who never scrolls past the fold otherwise leaves having seen a claim
 * and no evidence for it.
 *
 * The delivery row that sat beside the stack is gone: weekly builds, your repo,
 * full handover are all answered by the FAQ, at the point where somebody is
 * actually asking rather than three seconds in.
 *
 * The stack row stays, and the reason is in PRODUCT.md rather than in this
 * file. Three audiences read this page and the second one, technical founders,
 * can evaluate a stack and will check it. It was briefly cut on the grounds
 * that an SMB owner does not know what n8n is, which is true and is not the
 * point: the line is not there to inform audience one, it is there to be
 * verified by audience two. One row of eight words buys that.
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
        {/* Label above the values below sm, beside them from sm up. Inline at
            375px the values wrapped mid-list and the second line hung under
            the label, which at 10.5px with 0.22em tracking reads as broken
            rather than as an indent. */}
        <dl className="text-ink-2 flex flex-col gap-y-1 font-mono text-[10.5px] tracking-[0.22em] uppercase sm:flex-row sm:gap-x-2">
          <dt className="text-ink-3">Stack</dt>
          <dd className="text-ink">TypeScript · React · Next.js · Python</dd>
        </dl>
      </div>
    </div>
  )
}
