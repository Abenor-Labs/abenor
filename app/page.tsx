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
import { Act07Close } from '@/components/acts/Act07Close'
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
        <Act07Close />
      </main>
    </>
  )
}
