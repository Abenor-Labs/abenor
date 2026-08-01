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
    default: 'Abenor — Digital craftsmanship',
    template: '%s — Abenor',
  },
  description:
    'Abenor is a software studio. Web design, end-to-end websites, n8n automation, iOS and Android apps, and custom software — designed, built and shipped by one team.',
  keywords: [
    'software studio',
    'web design',
    'n8n automation',
    'iOS app development',
    'Android app development',
    'custom software',
  ],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Abenor',
    title: 'Abenor — Digital craftsmanship',
    description:
      'Web design, end-to-end websites, n8n automation, mobile apps and custom software. One team, concept to production.',
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
