/**
 * How I Work Section Component
 * 
 * Displays working principles and engagement approach.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import type { HowIWorkSection } from '@/types/content';

interface HowIWorkProps {
  data: HowIWorkSection;
}

export function HowIWork({ data }: HowIWorkProps) {
  return (
    <Section id="how-i-work" width='wide'>
      {/* Shared Section Header */}
      <Heading level={2} className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      {data.intro && (
        <p className="text-muted mb-12 text-lg max-w-3xl">
          {data.intro}
        </p>
      )}

      {/* Two Columns with Sub-headings */}
      <div className={`grid gap-12 ${data.engagementPath ? 'md:grid-cols-2' : 'grid-cols-1'} items-start mb-16`}>
        {/* Principles Column */}
        <div>
          <Heading level={3} className="text-2xl md:text-3xl mb-8 text-foreground font-semibold">
            {data.principlesHeading || 'Principles'}
          </Heading>
          <ul className="space-y-5">
            {data.principles.map((principle, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engagement Model Column */}
        {data.engagementPath && (
          <div>
            <Heading level={3} className="text-2xl md:text-3xl mb-8 text-foreground font-semibold">
              {data.engagementPath.heading}
            </Heading>
            <ul className="space-y-5">
              {data.engagementPath.points?.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                  <span className="text-foreground/90 leading-relaxed">{point.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Centered CTA Below Both Columns */}
      {data.engagementPath && (
        <div className="flex flex-col items-center text-center">
          <Button
            href={data.engagementPath.cta.href}
            primary={true}
            ariaLabel={data.engagementPath.cta.ariaLabel}
          >
            {data.engagementPath.cta.label}
          </Button>
          {data.engagementPath.ctaSubtext && (
            <p className="text-sm text-muted/60 mt-3">
              {data.engagementPath.ctaSubtext}
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
