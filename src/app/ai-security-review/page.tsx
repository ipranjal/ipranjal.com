import { Metadata } from 'next';
import { AISecurityHero } from '@/components/sections/ai-security/AISecurityHero';
import { WhoThisIsFor } from '@/components/sections/ai-security/WhoThisIsFor';
import { WhatWeReview } from '@/components/sections/ai-security/WhatWeReview';
import { AISecurityHowItWorks } from '@/components/sections/ai-security/AISecurityHowItWorks';
import { AISecurityDeliverables } from '@/components/sections/ai-security/AISecurityDeliverables';
import { AISecurityCTA } from '@/components/sections/ai-security/AISecurityCTA';

export const metadata: Metadata = {
  title: 'AI Security & Compliance Review | Pranjal Nadhani',
  description: 'Expert systems-level security review for AI/ML systems. Identify prompt injection risks, data leakage, compliance gaps, and operational safety issues before they become problems.',
  openGraph: {
    title: 'AI Security & Compliance Review | Pranjal Nadhani',
    description: 'Expert systems-level security review for AI/ML systems. Identify prompt injection risks, data leakage, compliance gaps, and operational safety issues before they become problems.',
    type: 'website',
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
