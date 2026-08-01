import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/scroll/LenisProvider'
import { Preloader } from '@/components/ui/Preloader'
import { Cursor } from '@/components/ui/Cursor'
import './globals.css'

/**
 * next/font downloads and self-hosts these at build time — no request to
 * Google at runtime, no FOUT, and critically: the glyphs are guaranteed
 * present before TitleParticles samples them.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
})

const SITE = 'https://abenor.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Abenor — We build the software that stops the copy-pasting',
    template: '%s — Abenor',
  },
  description:
    'Right now someone in your business is copying data between two tabs. Abenor is a software studio that automates it away — n8n workflows, websites, iOS and Android apps, and the internal tools that replace the spreadsheet holding everything together.',
  keywords: [
    'n8n automation agency',
    'workflow automation',
    'internal tools development',
    'software studio',
    'web development',
    'iOS and Android apps',
  ],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Abenor',
    title: 'Abenor — We build the software that stops the copy-pasting',
    description:
      'Send us one job somebody does by hand every week. Within two working days we will tell you whether it can be automated, and what it would take.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#07070a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body className="grain">
        <a
          href="#problems"
          className="bg-molten text-paper sr-only font-mono text-[12px] tracking-[0.16em] uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
