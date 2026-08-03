import { Stage } from '@/components/canvas/Stage'
import { Nav } from '@/components/ui/Nav'
import { StatusBar } from '@/components/ui/StatusBar'
import { ScrollReveals } from '@/components/ui/ScrollReveals'
import { Act01Title } from '@/components/acts/Act01Title'
import { Act02Position } from '@/components/acts/Act02Position'
import { Act03Problems } from '@/components/acts/Act03Problems'
import { Act04Automation } from '@/components/acts/Act04Automation'
import { Act05Build } from '@/components/acts/Act05Build'
import { Act07Close } from '@/components/acts/Act07Close'
import { InlineCTA } from '@/components/ui/InlineCTA'

export default function HomePage() {
  return (
    <>
      <Stage />
      <Nav />
      <StatusBar />

      <ScrollReveals />
      <main>
        <Act01Title />
        <Act02Position />
        <Act03Problems />
        <InlineCTA />
        <Act04Automation />
        <InlineCTA variant="alt" />
        <Act05Build />
        <InlineCTA />
        <Act07Close />
      </main>
    </>
  )
}
