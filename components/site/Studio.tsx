import { EMAIL, MAILTO, SectionHead } from './primitives'

const FACTS = [
  { k: 'Founded', v: '2026' },
  { k: 'Timezone', v: 'IST · UTC+5:30' },
  { k: 'Email', v: EMAIL, href: MAILTO },
  { k: 'Calls', v: 'Calendly, by appointment' },
]

export function Studio() {
  return (
    <section id="studio" className="pt-32 sm:pt-44">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            align="left"
            eyebrow="The studio"
            title={
              <>
                One person <em className="italic">answers.</em>
              </>
            }
          />
          <div className="reveal mt-8 flex max-w-[32rem] flex-col gap-5 text-[17px] leading-[1.65] text-ink-2">
            <p>
              Abenor is Mahamad Suhail. The person who scopes your workflow is the person who
              writes it, and the person who replies when something looks off. There is no account
              manager between you and the keyboard.
            </p>
            <p>
              Your morning is evening here. Async by default keeps everyone honest; calls happen
              when they are worth everyone’s calendar.
            </p>
          </div>
        </div>

        <dl className="reveal self-end border-t border-rule">
          {FACTS.map((f) => (
            <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-rule py-5">
              <dt className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">{f.k}</dt>
              <dd className="text-right text-[16px] text-ink">
                {f.href ? (
                  <a href={f.href} className="underline decoration-ink/25 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-ink">
                    {f.v}
                  </a>
                ) : (
                  f.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
