/**
 * Background Section Component
 * 
 * Coherent narrative (not timeline) of experience and positioning.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { BackgroundSection } from '@/types/content';

interface BackgroundProps {
  data: BackgroundSection;
}

export function Background({ data }: BackgroundProps) {
  return (
    <Section id="background">
      <Heading level={2} id="background-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      <div className="max-w-[65ch] space-y-6 border-l-4 border-accent/20 pl-8">
        {data.narrative.map((paragraph, index) => (
          <p key={index} className="text-foreground/85 leading-loose text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
