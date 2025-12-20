import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function HowItWorks() {
  return (
    <Section id="how-it-works" width="wide" className="!py-16">
      <div className="relative">
        {/* Decorative process timeline icon */}
        <div className="absolute top-0 right-0 w-28 h-28 opacity-12">
          <svg viewBox="0 0 100 100">
            <circle cx="20" cy="20" r="8" fill="#5CC8E6" opacity="0.6" />
            <circle cx="50" cy="20" r="8" fill="#5CC8E6" opacity="0.8" />
            <circle cx="80" cy="20" r="8" fill="#5CC8E6" />
            <line x1="28" y1="20" x2="42" y2="20" stroke="#5CC8E6" strokeWidth="2" opacity="0.5" />
            <line x1="58" y1="20" x2="72" y2="20" stroke="#5CC8E6" strokeWidth="2" opacity="0.5" />
            <path d="M 20 28 L 20 80" stroke="#8B7CFF" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.4" />
            <path d="M 50 28 L 50 80" stroke="#8B7CFF" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.4" />
            <path d="M 80 28 L 80 80" stroke="#8B7CFF" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.4" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          How the review runs (2–3 weeks)
        </Heading>
        
        <div className="section-divider mb-12"></div>
      
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-6 bg-surface/30">
          <Heading level={3} className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
            Phase 1 – System Understanding
          </Heading>
          <ul className="space-y-4">
            {[
              'Deep-dive on current architecture, system boundaries, and AI integrations',
              'Review decision history and team context',
              'Explore upcoming product plans and growth expectations'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-surface/30">
          <Heading level={3} className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
            Phase 2 – Analysis & Stress-Testing
          </Heading>
          <ul className="space-y-4">
            {[
              'Independent review of architectural risks and coupling',
              'Evaluate scalability, AI correctness, and system fragility',
              'Model future breakpoints under realistic scenarios'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-surface/30">
          <Heading level={3} className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
            Phase 3 – Decision & Evolution Plan
          </Heading>
          <ul className="space-y-4">
            {[
              'What to fix now',
              'What can be safely deferred',
              'What to explicitly avoid',
              'A clear 3–6 month system evolution roadmap'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </Section>
  );
}
