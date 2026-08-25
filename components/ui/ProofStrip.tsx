/**
 * The meta band directly under the hero.
 *
 * One job now: put a real client sentence on the first screen, because the
 * visitor who never scrolls past the fold otherwise leaves having seen a claim
 * and no evidence for it.
 *
 * It used to carry a stack row and a delivery row as well, moved down out of
 * the hero on the grounds that specs three seconds in answer a question nobody
 * has asked yet. That reasoning holds and goes one step further: the FAQ
 * answers both — "what do you build with" and "who owns it when you are done"
 * — at the point where a visitor is actually asking. Under the hero they were
 * two rows of uppercase mono that a stranger has no way to evaluate.
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
    </div>
  )
}
