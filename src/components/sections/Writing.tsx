/**
 * Writing & Notes Section Component
 * 
 * Public thinking artifacts - essays, notes, and architecture writeups.
 * Not a blog, not case studies - intellectual depth.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { WritingSection } from '@/types/content';

interface WritingProps {
  data: WritingSection;
}

export function Writing({ data }: WritingProps) {
  return (
    <Section id="writing" width="wide">
      <Heading level={2} id="writing-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      {data.intro && (
        <p className="text-muted mb-12 text-lg max-w-3xl leading-relaxed">
          {data.intro}
        </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="group border border-border/40 p-6 md:p-7 rounded-xl bg-surface/20 hover:bg-surface/40 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {item.tag && (
              <span className="text-xs text-accent/70 uppercase tracking-wide mb-3 font-medium">
                {item.tag}
              </span>
            )}
            
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-xl text-foreground group-hover:gradient-text transition-all mb-3"
              >
                {item.title} →
              </a>
            ) : (
              <h3 className="font-semibold text-xl text-foreground mb-3">
                {item.title}
              </h3>
            )}
            
            <p className="text-muted/90 leading-relaxed">
              {item.premise}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
