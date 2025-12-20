import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function WhatItIs() {
  return (
    <Section id="what-it-is" width="wide" className="!py-16">
      <div className="relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#5CC8E6" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#8B7CFF" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#5CC8E6" strokeWidth="1" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          What this review actually is
        </Heading>
        
        <div className="section-divider mb-8"></div>
        
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg text-muted">
            This isn't a code audit or a generic consulting report.
          </p>
          
          <p className="text-lg text-foreground">
            This is a <strong className="gradient-text">working architecture review</strong>—designed to surface fragility, hidden coupling, and scaling risks before they slow execution or force rewrites.
          </p>
          
          <ul className="space-y-5">
            {[
              'Map the current system architecture and understand its decision history',
              'Stress-test your design against realistic growth and complexity scenarios',
              'Identify hidden coupling, fragility, and bottlenecks before they cause problems',
              'Evaluate AI integration for correctness, cost efficiency, and reliability',
              'Distinguish necessary complexity from accidental complexity that slows you down',
              'Define a clear evolution path grounded in your team\'s constraints and goals'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-lg text-muted/80 pt-4">
            The goal isn't perfection. The goal is <strong className="text-foreground">clarity and leverage</strong>—knowing what to fix, what to keep, and what to ignore.
          </p>
        </div>
      </div>
    </Section>
  );
}
