import { Stage } from '@/components/canvas/Stage'
import { Nav } from '@/components/ui/Nav'
import { StatusBar } from '@/components/ui/StatusBar'
import { Ticker } from '@/components/ui/Ticker'
import { Act01Title } from '@/components/acts/Act01Title'
import { Act02Position } from '@/components/acts/Act02Position'
import { Act03Problems } from '@/components/acts/Act03Problems'
import { Act04Automation } from '@/components/acts/Act04Automation'
import { Act05Build } from '@/components/acts/Act05Build'
import { Act06Terms } from '@/components/acts/Act06Terms'
import { Act07Close } from '@/components/acts/Act07Close'

const STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Node',
  'Postgres',
  'Supabase',
  'n8n',
  'Swift',
  'Kotlin',
  'React Native',
  'Tailwind',
  'Vercel',
]

/**
 * The home page is a film.
 *
 * <Stage/> is the projector — one canvas, fixed, alive for the whole route.
 * Each Act is a DOM overlay occupying its slice of the scroll track defined
 * in lib/motion/acts.ts.
 *
 * The bands between acts (status bar, ticker) are the joins: they break up
 * long stretches of one colour and keep something moving between the set
 * pieces, which is what stops a long scroll reading as an empty one.
 */
export default function HomePage() {
  return (
    <>
      <Stage />
      <Nav />

      <main>
        <Act01Title />
        <StatusBar />
        <Act02Position />
        <Act03Problems />
        <Act04Automation />
        <Act05Build />
        <Ticker items={STACK} label="What we build with" />
        <Act06Terms />
        <Act07Close />
      </main>
    </>
  )
}
