/**
 * How I Work Section Component
 * 
 * Displays working principles and engagement approach.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { HowIWorkSection } from '@/types/content';

interface HowIWorkProps {
  data: HowIWorkSection;
}

export function HowIWork({ data }: HowIWorkProps) {
  return (
    <Section id="how-i-work">
      <Heading level={2} id="how-i-work-heading" className="mb-4">
        {data.heading}
      </Heading>
      
      {data.intro && (
        <p className="text-lg text-muted mb-8">
          {data.intro}
        </p>
      )}
      
      <ul className="space-y-4">
        {data.principles.map((principle, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-accent mt-1 flex-shrink-0">→</span>
            <span className="text-foreground leading-relaxed">{principle}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
