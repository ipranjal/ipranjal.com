/**
 * Hero Section Component
 * 
 * Primary positioning statement with headline, subheadline, and CTAs.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import type { HeroSection } from '@/types/content';

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  return (
    <Section id="hero" ariaLabel="Hero section" width="wide" className="!py-8 md:!py-12">
      <div className="min-h-[85vh] flex flex-col md:flex-row items-center gap-16 lg:gap-20 relative">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-accent/8 via-accent-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-accent-secondary/8 via-accent/10 to-transparent rounded-full blur-3xl -z-10" />
        
        {/* Profile Image - Left Side */}
        {data.profileImage && (
          <div className="relative flex-shrink-0 md:order-1 md:-mt-12 lg:-mt-16">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Subtle gradient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent-secondary/8 to-transparent blur-2xl"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-accent/20 shadow-xl shadow-black/20">
                <div className="absolute inset-0 bg-gradient-to-br from-background/15 to-transparent z-10"></div>
                <Image
                  src={data.profileImage}
                  alt={data.profileAlt || 'Profile photo'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Content - Right Side */}
        <div className="flex-1 md:order-2 text-center md:text-left md:-mt-8">
          <Heading level={1} className="mb-6 text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="gradient-text">{data.headline}</span>
          </Heading>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted mb-2 font-light">
            {data.subheadline}
          </p>
          
          <div className="section-divider mx-auto md:mx-0"></div>
          
          <p className="text-lg md:text-xl text-muted/80 mb-10 max-w-2xl mx-auto md:mx-0">
            {data.supportingLine}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
