import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Leak } from '@/components/site/Leak'
import { Build } from '@/components/site/Build'
import { EmailRow } from '@/components/site/EmailRow'
import { Process } from '@/components/site/Process'
import { Proof } from '@/components/site/Proof'
import { Studio } from '@/components/site/Studio'
import { Answers } from '@/components/site/Answers'
import { Close } from '@/components/site/Close'
import { Footer } from '@/components/site/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Leak />
        <Build />
        <EmailRow lead="Not sure which of these you need? Describe the mess in five sentences." />
        <Process />
        <Proof />
        <EmailRow lead="Seen enough to have a task in mind? Send the one that eats the most time." />
        <Studio />
        <Answers />
        <Close />
      </main>
      <Footer />
    </>
  )
}
