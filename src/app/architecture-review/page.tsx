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
import { ArchitectureCTA } from '@/components/sections/architecture/ArchitectureCTA';

export const metadata: Metadata = {
  title: 'System & AI Architecture Review | Pranjal Pandey',
  description: 'A focused, senior-level engagement to identify what will break in your system—and how to fix it—before scale, AI, or team growth makes it expensive.',
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
      <ArchitectureCTA />
    </>
  );
}
