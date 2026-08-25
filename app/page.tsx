import { Stage } from '@/components/canvas/Stage'
import { Nav } from '@/components/ui/Nav'
import { StatusBar } from '@/components/ui/StatusBar'
import { ScrollReveals } from '@/components/ui/ScrollReveals'
import { Act01Title } from '@/components/acts/Act01Title'
import { Act02Position } from '@/components/acts/Act02Position'
import { Act03Problems } from '@/components/acts/Act03Problems'
import { Act04Automation } from '@/components/acts/Act04Automation'
import { Act05Build } from '@/components/acts/Act05Build'
import { Act06Proof } from '@/components/acts/Act06Proof'
import { Act07FAQ } from '@/components/acts/Act07FAQ'
import { Act08Close } from '@/components/acts/Act08Close'
import { InlineCTA } from '@/components/ui/InlineCTA'
import { ProofStrip } from '@/components/ui/ProofStrip'

export default function HomePage() {
  return (
    <>
      <Stage />
      <Nav />
      <StatusBar />

      <ScrollReveals />
      <main>
        <Act01Title />
        <ProofStrip />
        <Act02Position />
        <Act03Problems />
        <InlineCTA />
        <Act04Automation />
        <InlineCTA variant="alt" />
        <Act05Build />
        {/*
          Evidence sits between the process and the ask on purpose: an
          experience is judged by its peak and its ending, so the last thing
          read before the ask should be proof, not a diagram. The third
          InlineCTA is gone — it used to fire here, before anything had been
          proved, and Act06 now hands straight to the real close.
        */}
        <Act06Proof />
        {/*
          Questions land between the receipts and the ask. By the time someone
          has read the evidence they have stopped being sold to and started
          doing diligence, and diligence is the moment to answer what it
          costs, who owns the code and how many clients there have actually
          been — before the ask, not in a footer after it.
        */}
        <Act07FAQ />
        <Act08Close />
      </main>
    </>
  )
}
