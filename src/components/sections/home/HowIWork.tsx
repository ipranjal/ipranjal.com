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
        <p className="text-foreground/90 mb-12 text-lg max-w-4xl leading-relaxed">
          {data.intro}
        </p>
      )}

      {/* Engagement Model */}
      {data.engagementModel && (
        <div className="max-w-5xl">
          {data.engagementModel.heading && (
            <Heading level={3} className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
              {data.engagementModel.heading}
            </Heading>
          )}
          <p className="text-foreground/80 mb-10 leading-relaxed max-w-3xl">
            {data.engagementModel.intro}
          </p>
          
          {/* Two Review Tracks */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.engagementModel.reviewTracks.map((track, index) => (
              <div key={index} className="border border-accent/20 rounded-lg p-6 bg-surface/10">
                <h4 className="text-lg font-semibold text-foreground mb-1">
                  {track.title}
                </h4>
                <p className="text-sm text-foreground/70 mb-4">
                  {track.subtitle}
                </p>
                <ul className="space-y-3 mb-4">
                  {track.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                      <span className="text-foreground/90 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={track.cta.href}
                  className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  → {track.cta.label}
                </a>
              </div>
            ))}
          </div>
          
          {/* Beyond Review */}
          {data.engagementModel.beyondReview && (
            <div className="max-w-3xl">
              <p className="text-foreground/80 leading-relaxed">
                <strong className="text-foreground">Beyond the Review (When Needed):</strong> {data.engagementModel.beyondReview.text?.replace('Beyond the Review (When Needed): ', '')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Legacy Engagement Path - Keep for backwards compatibility */}
      {data.engagementPath && !data.engagementModel && (
        <>
          <div className="grid gap-12 md:grid-cols-2 items-start mb-16">
            <div>
              <Heading level={3} className="text-2xl md:text-3xl mb-8 text-foreground font-semibold">
                {data.principlesHeading || 'Principles'}
              </Heading>
              <ul className="space-y-5">
                {data.principles?.map((principle, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                    <span className="text-foreground/90 leading-relaxed">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          </div>
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
        </>
      )}
    </Section>
  );
}
