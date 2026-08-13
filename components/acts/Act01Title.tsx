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
  /*
    Centred on small screens, bottom-aligned from lg up.

    The act is a full 100vh and the block only needs about a third of it, so
    hanging it off the bottom leaves the rest as dead paper — on a phone that
    is most of the first screen showing nothing at all. Wide viewports are
    short enough relative to the mark that the low anchor still reads as
    composition rather than a gap, so the bottom alignment is kept there.

    The 112px top pad is the fixed nav plus the status bar. Centring has to
    discount that strip or the block sits visibly high in the space it is
    supposed to be centred in.
  */
  return (
    <ActSection
      id="title"
      align="center"
      className="overflow-hidden pt-[112px] pb-[clamp(28px,5vw,64px)] lg:justify-end lg:pt-0"
    >
      {/*
        Legibility veil over the flow field.

        Deliberately NOT full-strength at the top and bottom only: this sits
        inside the section's stacking context, above both canvases, so if a
        canvas ever misbehaves this is the layer that decides what the hero
        looks like. It therefore has to be dark on its own, not merely a tint
        that assumes something dark underneath.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(248,246,241,0.65) 0%, rgba(248,246,241,0) 28%, rgba(248,246,241,0) 60%, rgba(248,246,241,0.88) 100%)',
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
          <strong className="text-molten-deep font-semibold">We build the software that stops that.</strong>
        </p>
      </div>
    </ActSection>
  )
}
