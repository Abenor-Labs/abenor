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
    <ActSection id="title" className="overflow-hidden pb-[clamp(28px,5vw,64px)]">
      {/* keeps the copy legible over the flow field without flattening it */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,7,10,0.62) 0%, rgba(7,7,10,0) 34%, rgba(7,7,10,0.93) 100%)',
        }}
      />

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
          className="font-display border-rule text-ink mt-[clamp(20px,3vw,38px)] max-w-[26ch] border-t pt-[clamp(16px,2.2vw,26px)] leading-[1.28] font-normal"
          style={{ fontSize: 'clamp(17px, 2.3vw, 30px)' }}
        >
          Right now, someone in your business is copying data between two tabs.{' '}
          <strong className="text-molten font-semibold">We build the software that stops that.</strong>
        </p>
      </div>

      <div className="wrap mt-[clamp(20px,3vw,40px)]">
        <dl className="text-ink-2 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[10.5px] tracking-[0.22em] uppercase">
          <div className="flex gap-2">
            <dt className="text-ink-3">We build</dt>
            <dd className="text-ink">Automations · Websites · Apps · Internal tools</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">Studio</dt>
            <dd className="text-ink">Started 2026</dd>
          </div>
        </dl>
      </div>
    </ActSection>
  )
}
