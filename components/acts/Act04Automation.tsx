import { ActSection } from '@/components/ui/ActSection'
import { FlowGraph } from '@/components/ui/FlowGraph'
import { PhonePanel } from '@/components/ui/PhonePanel'

const CHANGES: [string, string][] = [
  ['Lead lands in a form', 'and never gets typed into the CRM again'],
  ['Invoice is paid', 'and the ops sheet, the CRM and the channel all know'],
  ['A sync fails at 3am', 'and you are told before the customer notices'],
  ['Someone leaves', 'and the process survives them, because it was never in their head'],
]

/**
 * Act 04 — Automation.
 *
 * The lead offer, and the cheapest thing for a stranger to test us on.
 * The graph shows what gets built; the phone shows what it looks like once it
 * is running — which doubles as the only place on the page that demonstrates
 * the mobile work rather than claiming it.
 */
export function Act04Automation() {
  return (
    <ActSection id="automation" align="center">
      <div className="wrap">
        <div className="border-rule mb-[clamp(26px,4vw,50px)] flex flex-wrap items-baseline gap-4 border-b pb-4">
          <span className="text-ink-3 font-mono text-[10.5px] tracking-[0.24em] uppercase">
            [ <b className="text-molten font-medium">02</b> ] Start here
          </span>
          <h2
            className="font-display leading-[0.95] font-extrabold tracking-[-0.04em]"
            style={{ fontSize: 'clamp(28px, 5.4vw, 72px)' }}
          >
            The <em className="text-molten not-italic">cheapest</em> way to test us
          </h2>
        </div>

        <div className="flex flex-col gap-[clamp(28px,5vw,72px)] lg:flex-row lg:items-start">
          <div className="flex-1">
            <p className="text-ink max-w-[46ch] text-[15px] leading-[1.72]">
              Automation is the fastest work to prove. There is no six-week design phase and no
              taste argument — either the thing that ate your Tuesday afternoons runs by itself
              now, or it does not.
            </p>
            <p className="text-ink-2 mt-4 max-w-[46ch] text-[15px] leading-[1.72]">
              So that is where we would rather start. Give us one workflow that wastes real hours
              every week. You will know inside a fortnight whether we are worth more of your money,
              and you will not have bet a website on the answer.
            </p>

            <ul className="border-rule mt-8 border-t">
              {CHANGES.map(([a, b]) => (
                <li key={a} className="border-rule border-b py-[clamp(14px,2vw,20px)]">
                  <span className="font-display block text-[clamp(15px,1.8vw,20px)] leading-[1.2] font-semibold tracking-[-0.02em]">
                    {a}
                  </span>
                  <span className="text-ink-2 mt-1 block text-[13px] leading-[1.6]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <PhonePanel />
            <p className="text-ink-3 max-w-[26ch] text-center font-mono text-[10px] tracking-[0.18em] uppercase lg:text-left">
              Scroll it, switch the tabs — the same discipline we ship to the stores
            </p>
          </div>
        </div>

        <div className="mt-[clamp(32px,5vw,64px)]">
          <FlowGraph />
          <div className="mt-3 flex flex-wrap justify-between gap-4">
            <p className="text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase">
              Drag any node — the connections and the traffic re-route live
            </p>
            <p className="text-ink-3 font-mono text-[10px] tracking-[0.18em] uppercase">
              An enquiry-to-CRM flow, roughly as we would build it
            </p>
          </div>
        </div>
      </div>
    </ActSection>
  )
}
