/**
 * Architecture Review Landing Page
 * 
 * Primary paid-funnel destination for System & AI Architecture Review service.
 */

import type { Metadata } from 'next';
import { ArchitectureHero } from '@/components/sections/architecture/ArchitectureHero';
import { RealProblem } from '@/components/sections/architecture/RealProblem';
import { WhatItIs } from '@/components/sections/architecture/WhatItIs';
import { HowItWorks } from '@/components/sections/architecture/HowItWorks';
import { Deliverables } from '@/components/sections/architecture/Deliverables';
import { AfterReview } from '@/components/sections/architecture/AfterReview';
import { RightFit } from '@/components/sections/architecture/RightFit';
import { AISystemsCrossLink } from '@/components/sections/architecture/AISystemsCrossLink';
import { ArchitectureCTA } from '@/components/sections/architecture/ArchitectureCTA';

export const metadata: Metadata = {
  title: 'System & AI Architecture Review | Pranjal Pandey',
  description: 'A focused, senior-level engagement to identify what will break as you scale. Designed for teams building non-trivial products who want architecture and AI decisions that age well.',
  openGraph: {
    title: 'System & AI Architecture Review | Pranjal Pandey',
    description: 'A focused, senior-level engagement to identify what will break as you scale. Designed for teams building non-trivial products who want architecture and AI decisions that age well.',
    type: 'website',
    url: 'https://ipranjal.com/architecture-review',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'System & AI Architecture Review',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System & AI Architecture Review',
    description: 'Focused engagement to identify what will break as you scale.',
    images: ['/og-image.png'],
  },
};

export default function ArchitectureReview() {
  return (
    <>
      <ArchitectureHero />
      <RealProblem />
      <WhatItIs />
      <HowItWorks />
      <Deliverables />
      <AfterReview />
      <RightFit />
      <AISystemsCrossLink />
      <ArchitectureCTA />
    </>
  );
}
