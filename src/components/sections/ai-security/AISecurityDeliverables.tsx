import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function AISecurityDeliverables() {
  return (
    <Section id="deliverables" width="wide" className="!py-16 bg-surface/5">
      <div className="relative">
        {/* Decorative report icon */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-15">
          <svg viewBox="0 0 100 100">
            <rect x="25" y="10" width="50" height="70" rx="4" fill="none" stroke="#5CC8E6" strokeWidth="2" />
            <path d="M 35 25 L 65 25" stroke="#8B7CFF" strokeWidth="2" opacity="0.6" />
            <path d="M 35 35 L 60 35" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
            <path d="M 35 45 L 65 45" stroke="#8B7CFF" strokeWidth="2" opacity="0.6" />
            <path d="M 35 55 L 55 55" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
            <circle cx="40" cy="68" r="3" fill="#5CC8E6" opacity="0.6" />
            <circle cx="50" cy="68" r="3" fill="#8B7CFF" opacity="0.6" />
            <circle cx="60" cy="68" r="3" fill="#5CC8E6" opacity="0.6" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          What you get
        </Heading>
        
        <div className="section-divider mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Security review document
            </Heading>
            <p className="text-muted text-sm">risk-prioritized findings with remediation steps</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Threat surface analysis
            </Heading>
            <p className="text-muted text-sm">AI-specific attack vectors and misuse scenarios</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Compliance gap assessment
            </Heading>
            <p className="text-muted text-sm">logging, traceability, and governance requirements</p>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-surface/30 hover:bg-surface/50 transition-colors">
            <Heading level={3} className="text-xl mb-3 text-foreground font-semibold">
              Live walkthrough session
            </Heading>
            <p className="text-muted text-sm">with security and technical leadership</p>
          </div>
        </div>
        
        <p className="text-center text-lg text-muted italic">
          All findings are actionable, risk-prioritized, and specific to your system—no generic recommendations.
        </p>
      </div>
    </Section>
  );
}
