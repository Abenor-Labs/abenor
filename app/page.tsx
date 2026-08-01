import { Stage } from '@/components/canvas/Stage'
import { Nav } from '@/components/ui/Nav'
import { Act01Title } from '@/components/acts/Act01Title'
import { Act02Position } from '@/components/acts/Act02Position'
import { Act03Problems } from '@/components/acts/Act03Problems'
import { Act04Automation } from '@/components/acts/Act04Automation'
import { Act05Build } from '@/components/acts/Act05Build'
import { Act06Terms } from '@/components/acts/Act06Terms'
import { Act07Close } from '@/components/acts/Act07Close'

/**
 * The home page is a film.
 *
 * <Stage/> is the projector — one canvas, fixed, alive for the whole route.
 * Each Act is a DOM overlay occupying its slice of the scroll track defined
 * in lib/motion/acts.ts. Adding an act means declaring it there and mounting
 * it here; the camera picks it up automatically.
 *
 * Structure is problem-first on purpose: nobody searches for "end-to-end web
 * development", they search for the thing that is broken. Acts 03 to 06 lead
 * with the symptom and let the service follow.
 */
export default function HomePage() {
  return (
    <>
      <Stage />
      <Nav />

      <main>
        <Act01Title />
        <Act02Position />
        <Act03Problems />
        <Act04Automation />
        <Act05Build />
        <Act06Terms />
        <Act07Close />
      </main>
    </>
  )
}
