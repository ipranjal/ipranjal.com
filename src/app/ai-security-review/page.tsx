import { Metadata } from 'next';
import { AISecurityHero } from '@/components/sections/ai-security/AISecurityHero';
import { WhoThisIsFor } from '@/components/sections/ai-security/WhoThisIsFor';
import { WhatWeReview } from '@/components/sections/ai-security/WhatWeReview';
import { AISecurityHowItWorks } from '@/components/sections/ai-security/AISecurityHowItWorks';
import { AISecurityDeliverables } from '@/components/sections/ai-security/AISecurityDeliverables';
import { AISecurityCTA } from '@/components/sections/ai-security/AISecurityCTA';

export const metadata: Metadata = {
  title: 'AI Security & Compliance Review | Pranjal Pandey',
  description: 'A systems-level review of AI-driven products to identify security risks, misuse vectors, and compliance gaps.',
  openGraph: {
    title: 'AI Security & Compliance Review | Pranjal Pandey',
    description: 'A systems-level review of AI-driven products to identify security risks, misuse vectors, and compliance gaps.',
    type: 'website',
    url: 'https://ipranjal.com/ai-security-review',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'AI Security & Compliance Review',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Security & Compliance Review',
    description: 'Systems-level review to identify security risks and compliance gaps.',
    images: ['/og-image.png'],
  },
};

export default function AISecurityReviewPage() {
  return (
    <>
      <AISecurityHero />
      <WhoThisIsFor />
      <WhatWeReview />
      <AISecurityHowItWorks />
      <AISecurityDeliverables />
      <AISecurityCTA />
    </>
  );
}
