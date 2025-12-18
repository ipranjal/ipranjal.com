/**
 * Hero Section Component
 * 
 * Primary positioning statement with headline, subheadline, and CTAs.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import type { HeroSection } from '@/types/content';

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  return (
    <Section id="hero" ariaLabel="Hero section" width="wide">
      <div className="min-h-[85vh] flex flex-col justify-center relative">
        {/* Decorative gradient orb - glow as signal leakage (8-12% max) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/8 via-accent-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl">
          <Heading level={1} className="mb-6 text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="gradient-text">{data.headline}</span>
          </Heading>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted mb-2 font-light">
            {data.subheadline}
          </p>
          
          <div className="section-divider"></div>
          
          <p className="text-lg md:text-xl text-muted/80 mb-10 max-w-2xl">
            {data.supportingLine}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {data.ctas.map((cta) => (
              <Button
                key={cta.href}
                href={cta.href}
                primary={cta.primary}
                ariaLabel={cta.ariaLabel}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
