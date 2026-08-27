import { Header } from "@/components/chrome/Header";
import { SurfaceWatcher } from "@/components/chrome/SurfaceWatcher";
import { FolioIndicator } from "@/components/chrome/FolioIndicator";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Leak } from "@/components/sections/Leak";
import { Ticker } from "@/components/sections/Ticker";
import { Work } from "@/components/sections/Work";
import { InlineCta } from "@/components/sections/InlineCta";
import { ImageBand } from "@/components/sections/ImageBand";
import { Process } from "@/components/sections/Process";
import { Receipts } from "@/components/sections/Receipts";
import { Studio } from "@/components/sections/Studio";
import { Answers } from "@/components/sections/Answers";
import { Close } from "@/components/sections/Close";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <FolioIndicator />
      <SurfaceWatcher />
      <main id="main">
        <Hero />
        <Leak />
        <Ticker />
        <Work />
        <InlineCta
          eyebrow="BY EMAIL"
          lead="Not sure which of these you need?"
          line="Describe the mess in five sentences."
          subject="The mess"
        />
        <ImageBand
          wide={{ name: "work/shipped", widths: [800, 1280, 1920], ratio: [2.4, 1] }}
          stack={{ name: "work/shipped-stack", widths: [450, 900], ratio: [900, 1144] }}
          fig="(FIG. 01)"
          caption="Two sites, shipped and live"
          note="Both unpaid"
          alt="Screenshots of two shipped portfolio sites: Harshith Varma's dark landing page with tilted project cards, and Manish Chetla's split layout with a heavy display headline beside a featured game build"
        />
        <Process />
        <Receipts />
        <InlineCta
          eyebrow="STILL READING"
          lead="You have seen how we work and what we have shipped."
          line="Send the one task that eats the most time."
          subject="One thing that wastes an afternoon"
        />
        <Studio />
        <Answers />
        <Close />
      </main>
    </>
  );
}
