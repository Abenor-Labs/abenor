import { ActSection } from '@/components/ui/ActSection'

/**
 * Act 01 — Title.
 *
 * The visible wordmark here is real DOM text and ships in the server HTML.
 * Once the canvas reports ready it fades out and the particle wordmark takes
 * over the same optical space. Without JS or WebGL the visitor still sees a
 * properly set masthead, and LCP never depends on three.js.
 */
export function Act01Title() {
  return (
    <ActSection id="title" className="pb-[clamp(28px,5vw,64px)]">
      <div className="wrap">
        <h1 className="sr-only">Abenor — a software studio</h1>

        <div
          aria-hidden="true"
          className="wordmark-fallback font-display flex text-ink leading-[0.8] font-extrabold tracking-[-0.05em]"
          style={{ fontSize: 'clamp(58px, 15.5vw, 238px)' }}
        >
          ABENOR
        </div>

        <p
          className="font-display border-rule text-ink mt-[clamp(20px,3vw,38px)] max-w-[22ch] border-t pt-[clamp(16px,2.2vw,26px)] leading-[1.28] font-normal"
          style={{ fontSize: 'clamp(17px, 2.3vw, 30px)' }}
        >
          We design and build the software a business actually{' '}
          <strong className="text-molten font-semibold">runs on.</strong>
        </p>
      </div>

      <div className="wrap mt-[clamp(20px,3vw,40px)]">
        <dl className="text-ink-2 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[10.5px] tracking-[0.22em] uppercase">
          <div className="flex gap-2">
            <dt className="text-ink-3">Surfaces</dt>
            <dd className="text-ink">Web · iOS · Android</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">Studio</dt>
            <dd className="text-ink">Est. 2026</dd>
          </div>
        </dl>
      </div>
    </ActSection>
  )
}
