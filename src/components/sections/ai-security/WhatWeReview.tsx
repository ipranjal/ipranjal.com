import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function WhatWeReview() {
  const lenses = [
    {
      title: 'AI Threat Surface',
      description: 'Model misuse, prompt injection, data leakage, adversarial inputs, unsafe outputs'
    },
    {
      title: 'System Boundaries',
      description: 'Trust boundaries, permissions, auth flows, data access patterns around AI components'
    },
    {
      title: 'Compliance & Governance',
      description: 'Logging, traceability, audit trails, model versioning, policy enforcement'
    },
    {
      title: 'Operational Safety',
      description: 'Monitoring, rollback mechanisms, guardrails, rate limits, fallback behavior'
    }
  ];
  
  return (
    <Section id="what-we-review" width="wide" className="!py-16 bg-surface/5">
      <div className="relative">
        {/* Decorative security icon */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-15">
          <svg viewBox="0 0 100 100">
            <path d="M 50 10 L 70 20 L 70 45 Q 70 65 50 80 Q 30 65 30 45 L 30 20 Z" fill="none" stroke="#5CC8E6" strokeWidth="2" />
            <circle cx="50" cy="45" r="12" fill="none" stroke="#8B7CFF" strokeWidth="2" />
            <rect x="46" y="50" width="8" height="10" fill="#8B7CFF" opacity="0.5" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          What we review
        </Heading>
        
        <div className="section-divider mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {lenses.map((lens, index) => (
            <div 
              key={index}
              className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors"
            >
              <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
                {lens.title}
              </Heading>
              <p className="text-muted text-sm">{lens.description}</p>
            </div>
          ))}
        </div>
        
        <p className="text-center text-lg text-muted italic">
          This is not a penetration test or automated scan—it's a systems-level review of how your AI components fit into your architecture.
        </p>
      </div>
    </Section>
  );
}
