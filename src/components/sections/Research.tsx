/**
 * Research & Education Section Component
 * 
 * Academic credentials and research background.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { ResearchEducationSection } from '@/types/content';

interface ResearchProps {
  data: ResearchEducationSection;
}

export function Research({ data }: ResearchProps) {
  return (
    <Section id="research-education">
      <Heading level={2} id="research-education-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      {data.intro && (
        <p className="text-foreground/80 mb-10 text-lg max-w-[65ch] leading-loose">
          {data.intro}
        </p>
      )}
      
      <div className="space-y-10 max-w-[65ch]">
        {data.credentials.map((credential, index) => (
          <div key={index} className="border-l-4 border-accent-secondary/30 pl-8 py-2">
            <div className="mb-4">
              <p className="font-semibold text-foreground text-xl">
                {credential.degree} in {credential.field}
              </p>
              <p className="text-muted mt-1">
                {credential.institution} · {credential.period}
              </p>
            </div>
            
            <ul className="space-y-2">
              {credential.focus.map((item, focusIndex) => (
                <li key={focusIndex} className="text-foreground/80 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
