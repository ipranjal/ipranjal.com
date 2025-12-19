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
  description: 'Helping teams build products, strong systems, and practical AI integrations. Research-backed thinking. Real-world execution. Decisions that age well.',
  keywords: ['systems architecture', 'engineering leadership', 'technical consulting', 'AI integration', 'IIT'],
  authors: [{ name: 'Pranjal Pandey' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ipranjal.com',
    title: 'Pranjal Pandey – Systems Architect & Engineering Leader',
    description: 'Research-backed thinking. Real-world execution. Decisions that age well.',
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
    title: 'Pranjal Pandey – Systems Architect',
    description: 'Helping teams build scalable systems and practical AI',
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TYBVMJLK06');
          `}
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

