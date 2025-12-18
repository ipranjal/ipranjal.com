/**
 * What I Do Section Component
 * 
 * Four pillars of expertise display.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { WhatIDoSection } from '@/types/content';

interface WhatIDoProps {
  data: WhatIDoSection;
}

export function WhatIDo({ data }: WhatIDoProps) {
  // Use cyan accent consistently for this section
  const accentColor = 'border-accent';
  const textColor = 'text-accent';

  return (
    <Section id="what-i-do" width="wide">
      <Heading level={2} id="what-i-do-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {data.pillars.map((pillar) => (
          <div 
            key={pillar.id} 
            className={`group p-6 md:p-8 rounded-xl border-l-4 ${accentColor} bg-surface/30 hover:bg-surface/50 transition-all duration-300 hover:translate-x-2 flex flex-col h-full`}
          >
            <Heading level={3} className="text-foreground mb-4 text-2xl">
              {pillar.title}
            </Heading>
            
            <p className="text-muted mb-6 text-lg leading-relaxed">
              {pillar.description}
            </p>
            
            <ul className="space-y-3">
              {pillar.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-muted/90 text-[0.95rem] leading-loose flex items-start gap-3">
                  <span className={`${textColor} mt-1.5 text-xs flex-shrink-0`}>▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
