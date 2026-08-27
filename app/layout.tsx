import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const TITLE = "Abenor · Software that takes the repetitive part of your job";
const DESCRIPTION =
  "Abenor builds workflow automation, websites, apps and internal tools for people still doing the same clicks every week. One workflow, two weeks, a fixed fee.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Abenor",
  },
  description: DESCRIPTION,
  applicationName: "Abenor",
  authors: [{ name: "Mahamad Suhail" }],
  keywords: [
    "workflow automation",
    "internal tools",
    "software studio",
    "web development",
    "app development",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Abenor",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#studio`,
  name: "Abenor",
  url: SITE_URL,
  description:
    "Software studio building workflow automation, websites, mobile apps and internal tools.",
  email: CONTACT_EMAIL,
  founder: { "@type": "Person", name: "Mahamad Suhail" },
  foundingDate: "2026",
  areaServed: "Worldwide",
  serviceType: [
    "Workflow automation",
    "Web development",
    "Mobile app development",
    "Internal tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-surface="paper">
      <body className={`${plexSans.variable} ${plexMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
