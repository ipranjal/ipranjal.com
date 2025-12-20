import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function Deliverables() {
  return (
    <Section id="deliverables" width="wide" className="!py-16">
      <div className="relative">
        {/* Decorative checklist icon */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-15">
          <svg viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="#5CC8E6" strokeWidth="2" />
            <path d="M 25 30 L 35 30" stroke="#8B7CFF" strokeWidth="2" />
            <path d="M 45 30 L 75 30" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
            <path d="M 25 50 L 35 50" stroke="#8B7CFF" strokeWidth="2" />
            <path d="M 45 50 L 75 50" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
            <path d="M 25 70 L 35 70" stroke="#8B7CFF" strokeWidth="2" />
            <path d="M 45 70 L 75 70" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          What you get
        </Heading>
        
        <div className="section-divider mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Architecture critique document
            </Heading>
            <p className="text-muted text-sm">(what breaks, when, and why)</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              System evolution roadmap
            </Heading>
            <p className="text-muted text-sm">grounded in current constraints</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Decision framework
            </Heading>
            <p className="text-muted text-sm">for future architecture and AI choices</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Live walkthrough session
            </Heading>
            <p className="text-muted text-sm">with founders and technical leadership</p>
          </div>
        </div>
        
        <p className="text-center text-lg text-muted italic">
          These are meant to be used, not archived.
        </p>
      </div>
    </Section>
  );
}
