import type { Metadata } from "next";
import localFont from 'next/font/local';
import Script from 'next/script';
import "./globals.css";
import Navigation from '@/components/Navigation';

const inter = localFont({
  src: '../../public/fonts/inter-var.ttf',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: '100 900',
});

const jetbrainsMono = localFont({
  src: '../../public/fonts/jetbrains-mono.ttf',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ipranjal.com'),
  title: 'Pranjal Pandey – Systems Architect & Engineering Leader',
  description: 'Engineering leader and systems architect shaping systems and practical AI. IIT Jodhpur alumnus and ex-founder.',
  keywords: ['Pranjal Pandey', 'Pranjal Pandey IIT', 'engineering leader', 'systems architect', 'AI systems'],
  authors: [{ name: 'Pranjal Pandey' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ipranjal.com',
    title: 'Pranjal Pandey – Systems Architect & Engineering Leader',
    description: 'Engineering leader and systems architect shaping systems and practical AI. IIT Jodhpur alumnus and ex-founder.',
    siteName: 'Pranjal Pandey',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Pranjal Pandey – Systems Architect & Engineering Leader',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranjal Pandey – Engineering Leader & Systems Architect',
    description: 'Engineering leader and systems architect shaping systems and practical AI. IIT Jodhpur alumnus and ex-founder.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TYBVMJLK06"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TYBVMJLK06');
          `}
        </Script>
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://ipranjal.com/#person",
            "name": "Pranjal Pandey",
            "alternateName": [
              "Pranjal Pandey IIT",
              "Pranjal Pandey Engineer",
              "Pranjal Pandey Systems Architect"
            ],
            "url": "https://ipranjal.com",
            "image": "https://ipranjal.com/og-image.png",
            "jobTitle": "Engineering Leader and Systems Architect",
            "worksFor": {
              "@type": "Organization",
              "name": "Independent / Advisory"
            },
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Indian Institute of Technology Jodhpur"
            },
            "founderOf": [
              {
                "@type": "Organization",
                "name": "Corpusvision Technologies Pvt. Ltd.",
                "url": "https://corpusvision.com"
              },
              {
                "@type": "Product",
                "name": "Ordercoro",
                "url": "https://ordercoro.com"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/in/its-pranjalpandey/",
              "https://github.com/ipranjal"
            ],
            "knowsAbout": [
              "Systems Architecture",
              "Engineering Leadership",
              "Artificial Intelligence",
              "Distributed Systems",
              "Software Architecture",
              "AI Systems"
            ],
            "description": "Pranjal Pandey is an engineering leader and systems architect, founder of Corpusvision Technologies and Ordercoro, focused on building resilient systems and practical AI. IIT Jodhpur alumnus and ex-founder."
          })}
        </Script>

      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}

