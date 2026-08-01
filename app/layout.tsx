import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/scroll/LenisProvider'
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
  themeColor: '#f2f0ea',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body className="grain">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
