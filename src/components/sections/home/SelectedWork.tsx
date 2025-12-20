/**
 * Selected Work Section Component
 * 
 * Representative engagements and work types.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { SelectedWorkSection } from '@/types/content';

interface SelectedWorkProps {
  data: SelectedWorkSection;
}

export function SelectedWork({ data }: SelectedWorkProps) {
  return (
    <Section id="selected-work" width="wide">
      <Heading level={2} id="selected-work-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      {data.intro && (
        <p className="text-muted mb-12 text-lg max-w-3xl">
          {data.intro}
        </p>
      )}
      
      
      <div className="mb-16">
        <Heading level={3} className="text-2xl md:text-3xl mb-8 text-foreground font-semibold">
          Types of Work
        </Heading>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.workTypes.map((type, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground/90 p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors border border-border/30 hover:border-accent/30">
              <span className="text-accent mt-1 text-sm">●</span>
              <span className="leading-relaxed">{type}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <Heading level={3} className="text-2xl mb-8 text-muted">
          Representative Engagements
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.engagements.map((engagement) => (
            <div
              key={engagement.name}
              className="group border border-border p-7 rounded-xl bg-surface hover:bg-surface/80 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
            >
              {engagement.url ? (
                <a
                  href={engagement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lg text-foreground group-hover:gradient-text transition-all"
                >
                  {engagement.name} →
                </a>
              ) : (
                <p className="font-semibold text-lg text-foreground">{engagement.name}</p>
              )}
              <p className="text-muted mt-3 leading-relaxed">{engagement.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {data.socialProof && (
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-wider text-muted/80 mb-4">
            {data.socialProof.heading}
          </p>
          <p className="text-lg text-foreground/80">
            {data.socialProof.companies.join(' · ')}
          </p>
        </div>
      )}
    </Section>
  );
}
