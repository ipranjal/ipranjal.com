import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function AfterReview() {
  return (
    <Section id="after" width="wide" className="!py-16">
      <div className="relative">
        {/* Decorative forward path icon */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-15">
          <svg viewBox="0 0 100 100">
            <path d="M 10 50 L 60 50" stroke="#5CC8E6" strokeWidth="3" strokeLinecap="round" />
            <path d="M 45 35 L 60 50 L 45 65" stroke="#5CC8E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="70" cy="30" r="6" fill="#8B7CFF" opacity="0.6" />
            <circle cx="80" cy="50" r="6" fill="#8B7CFF" opacity="0.8" />
            <circle cx="70" cy="70" r="6" fill="#8B7CFF" opacity="0.6" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          After the Review
        </Heading>
        
        <div className="section-divider mb-8"></div>
      
      <p className="text-lg text-muted mb-8 max-w-3xl">
        Once the review is complete, teams typically take one of two paths:
      </p>
      
      <div className="space-y-8 max-w-3xl">
        <div>
          <p className="text-lg text-foreground font-semibold mb-4">
            Path 1: Clarity is enough
          </p>
          <ul className="space-y-4">
            {[
              'Use the roadmap to guide internal execution for the next 6–12 months',
              'Ongoing architecture consulting (monthly or quarterly)',
              'Technical advising for founders or leadership'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="text-lg text-foreground font-semibold mb-4">
            Path 2: Execution support (optional)
          </p>
          <p className="text-muted mb-4">
            In some cases, teams need short-term execution support to unblock delivery or stabilize a system. When this happens, I offer a focused <strong className="text-foreground">Execution Rescue</strong> engagement to:
          </p>
          <ul className="space-y-4 mb-6">
            {[
              'Unblock a specific architectural or AI bottleneck',
              'Ship a critical feature that\'s stuck',
              'Stabilize a production issue without a full rewrite'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-foreground font-medium">
            Only if it makes sense.
          </p>
        </div>
      </div>
      
      <p className="text-lg text-muted mt-8 max-w-3xl">
        The review stands on its own and does not obligate further work. Both paths are good outcomes.
      </p>
      </div>
    </Section>
  );
}
