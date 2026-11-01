import type { Metadata, Viewport } from 'next'
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/scroll/LenisProvider'
import { Cursor } from '@/components/ui/Cursor'
import { Reveals } from '@/components/site/Reveals'
import './globals.css'

const serif = Newsreader({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const SITE = 'https://abenor.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Abenor · Software that does the chore for you',
    template: '%s · Abenor',
  },
  description:
    'Abenor is a software studio. We take the one task still eating your week and turn it into software that runs without you: workflow automation, websites, iOS and Android apps, internal tools.',
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
    title: 'Abenor · Software that does the chore for you',
    description:
      'Thirty minutes. Bring the one task that eats the most time, leave knowing whether it is worth fixing.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#F7F7F5',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS before first paint so `.reveal` can start hidden. No JS,
            no flag, and every section simply renders in place. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-[14px] text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <Cursor />
        <Reveals />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
