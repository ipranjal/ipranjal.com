/**
 * Homepage - Personal Positioning Website
 * 
 * Narrative flow: Position → Method → Thinking → Proof → History → Filter → Action
 */

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/home/Hero';
import { LiveSignal } from '@/components/sections/home/LiveSignal';
import { WhatIDo } from '@/components/sections/home/WhatIDo';
import { HowIWork } from '@/components/sections/home/HowIWork';
import { WritingNotes } from '@/components/sections/home/WritingNotes';
import { SelectedWork } from '@/components/sections/home/SelectedWork';
import { loadSectionContent } from '@/lib/content';

// Lazy load below-fold sections for better performance
const Background = dynamic(() => import('@/components/sections/home/Background').then(mod => ({ default: mod.Background })), {
  loading: () => <div className="min-h-[400px]" />,
});
const Research = dynamic(() => import('@/components/sections/home/Research').then(mod => ({ default: mod.Research })), {
  loading: () => <div className="min-h-[400px]" />,
});
const WhoShouldReachOut = dynamic(() => import('@/components/sections/home/WhoShouldReachOut').then(mod => ({ default: mod.WhoShouldReachOut })), {
  loading: () => <div className="min-h-[400px]" />,
});
const Contact = dynamic(() => import('@/components/sections/home/Contact'), {
  loading: () => <div className="min-h-[400px]" />,
});
import type {
  HeroSection,
  WhatIDoSection,
  HowIWorkSection,
  SelectedWorkSection,
  BackgroundSection,
  ResearchEducationSection,
  WhoShouldReachOutSection,
  ContactSection,
} from '@/types/content';

export default async function Home() {
  // Load all sections
  const heroResult = await loadSectionContent<HeroSection>('hero');
  const whatIDoResult = await loadSectionContent<WhatIDoSection>('what-i-do');
  const howIWorkResult = await loadSectionContent<HowIWorkSection>('how-i-work');
  const selectedWorkResult = await loadSectionContent<SelectedWorkSection>('selected-work');
  const backgroundResult = await loadSectionContent<BackgroundSection>('background');
  const researchResult = await loadSectionContent<ResearchEducationSection>('research-education');
  const whoShouldReachOutResult = await loadSectionContent<WhoShouldReachOutSection>('who-should-reach-out');
  const contactResult = await loadSectionContent<ContactSection>('contact');

  // Handle loading errors
  if (!heroResult.success) throw new Error(heroResult.error);
  if (!whatIDoResult.success) throw new Error(whatIDoResult.error);
  if (!howIWorkResult.success) throw new Error(howIWorkResult.error);
  if (!selectedWorkResult.success) throw new Error(selectedWorkResult.error);
  if (!backgroundResult.success) throw new Error(backgroundResult.error);
  if (!researchResult.success) throw new Error(researchResult.error);
  if (!whoShouldReachOutResult.success) throw new Error(whoShouldReachOutResult.error);
  if (!contactResult.success) throw new Error(contactResult.error);

  return (
    <>
      <Hero data={heroResult.data} />
      <LiveSignal />
      <WhatIDo data={whatIDoResult.data} />
      <HowIWork data={howIWorkResult.data} />
      <WritingNotes />
      <SelectedWork data={selectedWorkResult.data} />
      <Background data={backgroundResult.data} />
      <Research data={researchResult.data} />
      <WhoShouldReachOut data={whoShouldReachOutResult.data} />
      <Contact data={contactResult.data} />
    </>
  );
}
