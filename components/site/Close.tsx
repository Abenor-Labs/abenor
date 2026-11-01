import Image from 'next/image'
import nightSky from '@/public/photos/night-sky.jpg'
import { Button, CALENDLY, EMAIL, Eyebrow, MAILTO } from './primitives'

/** The one full ask on the page: a booked call, on the darkest surface. */
export function Close() {
  return (
    <section id="book" className="pt-32 sm:pt-44">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-6">
        <div className="photo-edge relative isolate flex min-h-[640px] flex-col items-center justify-center overflow-hidden rounded-[24px] px-5 py-24 text-center sm:rounded-[28px]">
          <Image
            src={nightSky}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1440px) 1392px, 100vw"
            className="-z-10 object-cover object-bottom"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />

          <div className="flex flex-col items-center" data-stagger>
            <div className="reveal">
              <Eyebrow tone="light">Book the call</Eyebrow>
            </div>
            <h2 className="reveal mt-6 font-serif text-[clamp(46px,7vw,96px)] leading-[0.98] tracking-[-0.025em] text-white">
              Bring the one task.
              <br />
              <em className="italic">Leave with an answer.</em>
            </h2>
            <p className="reveal mt-7 max-w-[30rem] text-[17px] leading-[1.65] text-white/80">
              Thirty minutes, no deck. You leave knowing whether it is worth fixing, even
              when the answer is no.
            </p>
            <div className="reveal mt-9 flex flex-col items-center gap-4">
              <Button href={CALENDLY} external variant="light" className="h-12 px-6 text-[16px]">
                Book a call
              </Button>
              <p className="text-[14px] text-white/75">
                Rather write?{' '}
                <a href={MAILTO} className="text-white underline decoration-white/40 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-white">
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
