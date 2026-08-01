import { Stage } from '@/components/canvas/Stage'
import { Nav } from '@/components/ui/Nav'
import { Act01Title } from '@/components/acts/Act01Title'
import { Act02Position } from '@/components/acts/Act02Position'
import { Act03Capabilities } from '@/components/acts/Act03Capabilities'
import { ActPlaceholder } from '@/components/acts/ActPlaceholder'
import { Act06Proof } from '@/components/acts/Act06Proof'
import { Act07Close } from '@/components/acts/Act07Close'

/**
 * The home page is a film.
 *
 * <Stage/> is the projector — one canvas, fixed, alive for the whole route.
 * Each Act is a DOM overlay occupying its slice of the scroll track defined
 * in lib/motion/acts.ts. Adding an act means declaring it there and mounting
 * it here; the camera picks it up automatically.
 *
 * Acts 04 and 05 are held open by placeholders so the camera timeline stays
 * correctly proportioned while their scenes are built.
 */
export default function HomePage() {
  return (
    <>
      <Stage />
      <Nav />

      <main>
        <Act01Title />
        <Act02Position />
        <Act03Capabilities />

        <ActPlaceholder
          id="automation"
          index="02"
          title="Automation"
          note="Scene in build — the draggable n8n graph moves into the shared 3D space here."
        />

        <ActPlaceholder
          id="build"
          index="03"
          title="The build"
          note="Scene in build — wireframe resolves to design, to built, to live, as the camera dollies in."
        />

        <Act06Proof />
        <Act07Close />
      </main>
    </>
  )
}
