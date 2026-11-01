import Image from 'next/image'
import seaOfClouds from '@/public/photos/sea-of-clouds.jpg'
import { Arrow, Button, CALENDLY } from './primitives'

/**
 * The panel tells the whole pitch in three beats before a word of the page
 * has been read: the chore, the software taking it, the time it hands back.
 * The cards arrive in that order, once, and then sit still.
 */
export function Hero() {
  return (
    <section id="top" className="pt-[128px] sm:pt-[148px]">
      <div className="wrap flex flex-col items-center text-center" data-stagger>
        <a
          href="#proof"
          className="reveal press nudge group inline-flex h-8 items-center gap-2.5 rounded-full bg-paper-2 pr-3 pl-3.5 font-mono text-[11px] font-medium tracking-[0.12em] text-ink uppercase shadow-[inset_0_0_0_1px_rgba(17,17,16,0.06)] hover:bg-[#e7e7e3]"
        >
          <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-live" />
          Taking new work · IST
          <Arrow className="size-3 text-ink-3" />
        </a>

        <h1 className="reveal mt-7 font-serif text-[clamp(48px,7.4vw,100px)] leading-[0.98] tracking-[-0.025em] text-ink">
          Software that does
          {' '}<br className="hidden sm:block" />
          the chore <em className="italic">for you.</em>
        </h1>

        <p className="reveal mt-7 max-w-[30rem] text-[17px] leading-[1.65] text-ink-2 sm:text-[18px]">
          We take the one task still eating your week and turn it into software that runs
          without you.
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-2">
          <Button href={CALENDLY} external>
            Book a call
          </Button>
          <Button href="#leak" variant="ghost">
            See how it works <Arrow />
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-3 sm:mt-20 sm:px-6">
        <div
          data-stage
          className="photo-edge relative isolate h-[clamp(520px,58vw,760px)] overflow-hidden rounded-[24px] sm:rounded-[28px]"
        >
          <Image
            src={seaOfClouds}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1440px) 1392px, 100vw"
            className="-z-10 object-cover object-[50%_62%]"
          />
          {/* softens the sky so white cards hold their edge */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

          <p className="stage-in absolute top-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 font-mono text-[11px] text-white/90 backdrop-blur-md" style={{ ['--i' as string]: 2 }}>
            <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-live" />
            workflow running
          </p>

          <div className="absolute inset-x-4 bottom-12 mx-auto flex max-w-[460px] flex-col gap-3 sm:bottom-14">
            <figure
              className="stage-in float-dark self-start rounded-[18px] bg-[#111110]/92 p-4 pr-6 text-left text-white backdrop-blur-md sm:ml-[-48px]"
              style={{ ['--i' as string]: 0 }}
            >
              <figcaption className="mb-1.5 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-white/60 uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ember-bright" />
                The chore
              </figcaption>
              <p className="text-[15px] leading-[1.5]">
                Every lead from WhatsApp gets typed into a sheet. Then typed again into the CRM.
              </p>
            </figure>

            <figure
              className="stage-in float self-end rounded-[18px] bg-white p-4 pr-6 text-left sm:mr-[-48px]"
              style={{ ['--i' as string]: 1 }}
            >
              <figcaption className="mb-1.5 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-ink-3 uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-live" />
                Handled
              </figcaption>
              <p className="text-[15px] leading-[1.5] text-ink">
                Now each lead lands in the CRM on its own, tagged with where it came from.
                Nobody types it.
              </p>
            </figure>
          </div>

          <p className="absolute bottom-4 left-5 font-mono text-[10.5px] tracking-[0.1em] text-white/75 uppercase">
            Illustrative workflow
          </p>
        </div>
      </div>

      <div className="wrap mt-14 flex flex-col items-center gap-5 sm:mt-16">
        <p className="text-center text-[14px] text-ink-3">Four kinds of software, one person who writes all of it</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-serif text-[clamp(22px,2.4vw,30px)] tracking-[-0.01em] text-ink/70">
          <li>Workflow automation</li>
          <li>Websites</li>
          <li>iOS &amp; Android</li>
          <li>Internal tools</li>
        </ul>
      </div>
    </section>
  )
}
