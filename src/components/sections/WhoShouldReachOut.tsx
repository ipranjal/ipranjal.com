/**
 * Who Should Reach Out Section Component
 * 
 * Self-qualification filter displaying good fit and not fit criteria.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { WhoShouldReachOutSection } from '@/types/content';

interface WhoShouldReachOutProps {
  data: WhoShouldReachOutSection;
}

export function WhoShouldReachOut({ data }: WhoShouldReachOutProps) {
  return (
    <Section id="who-should-reach-out" width="wide">
      <Heading level={2} id="who-should-reach-out-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      {data.intro && (
        <p className="text-lg text-muted mb-12 max-w-3xl">
          {data.intro}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Good Fit - Visually Dominant */}
        <div className="p-10 rounded-xl border-l-4 border-accent bg-accent/8 shadow-lg shadow-accent/5">
          <Heading level={3} className="mb-6 text-2xl md:text-3xl text-accent font-semibold">
            {data.goodFit.heading}
          </Heading>
          <ul className="space-y-5">
            {data.goodFit.criteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 flex-shrink-0 font-bold text-xl">✓</span>
                <span className="text-foreground leading-relaxed text-lg">{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Not Fit - Reduced Visual Weight */}
        <div className="p-8 rounded-xl border-l-2 border-muted/30 bg-surface/10 opacity-75">
          <Heading level={3} className="mb-6 text-2xl text-muted/80">
            {data.notFit.heading}
          </Heading>
          <ul className="space-y-4">
            {data.notFit.criteria.map((criterion, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-muted/60 mt-1.5 flex-shrink-0 text-lg">×</span>
                <span className="text-muted/70 leading-relaxed">{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
