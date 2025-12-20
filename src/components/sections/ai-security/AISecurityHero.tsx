import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function AISecurityHero() {
  return (
    <Section id="hero" width="wide" className="!py-8 md:!py-12">
      <div className="min-h-[85vh] flex flex-col md:flex-row items-center gap-16 lg:gap-20 relative">
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-accent/8 via-accent-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-accent-secondary/8 via-accent/10 to-transparent rounded-full blur-3xl -z-10" />
        
        {/* Decorative illustration */}
        <div className="relative flex-shrink-0 md:order-1 md:-mt-12 lg:-mt-16">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Subtle gradient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent-secondary/8 to-transparent blur-2xl"></div>
            
            {/* Security Shield illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5CC8E6" />
                    <stop offset="100%" stopColor="#8B7CFF" />
                  </linearGradient>
                </defs>
                
                {/* Central shield */}
                <path d="M 200 80 L 260 110 L 260 180 Q 260 220 200 280 Q 140 220 140 180 L 140 110 Z" 
                      fill="none" stroke="url(#securityGradient)" strokeWidth="3" opacity="0.8" />
                <path d="M 200 100 L 245 120 L 245 180 Q 245 210 200 260 Q 155 210 155 180 L 155 120 Z" 
                      fill="url(#securityGradient)" opacity="0.2" />
                
                {/* Lock symbol */}
                <rect x="185" y="160" width="30" height="35" rx="3" fill="#5CC8E6" opacity="0.6" />
                <path d="M 190 160 L 190 145 Q 190 135 200 135 Q 210 135 210 145 L 210 160" 
                      fill="none" stroke="#5CC8E6" strokeWidth="3" opacity="0.7" />
                
                {/* Animated security layers */}
                <g opacity="0.5">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const x = 200 + 110 * Math.cos((angle * Math.PI) / 180 - Math.PI / 2);
                    const y = 200 + 110 * Math.sin((angle * Math.PI) / 180 - Math.PI / 2);
                    return (
                      <circle key={i} cx={x} cy={y} r="6" fill="#8B7CFF">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                      </circle>
                    );
                  })}
                </g>
                
                {/* Threat detection waves */}
                <g opacity="0.4">
                  <circle cx="200" cy="180" r="80" fill="none" stroke="#5CC8E6" strokeWidth="1">
                    <animate attributeName="r" values="80;120;80" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="180" r="80" fill="none" stroke="#8B7CFF" strokeWidth="1">
                    <animate attributeName="r" values="80;120;80" dur="4s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" begin="1s" />
                  </circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 md:order-2 text-center md:text-left md:-mt-8">
          <Heading level={1} className="mb-6 text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="gradient-text">AI Security & Compliance Review</span>
          </Heading>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted mb-2 font-light">
            A systems-level review of AI-driven products to identify security risks, misuse vectors, and compliance gaps
          </p>
          
          <div className="section-divider mx-auto md:mx-0"></div>
          
          <p className="text-lg md:text-xl text-muted/80 mb-4 max-w-2xl mx-auto md:mx-0">
            This is not a penetration test or automated scan.<br />
            <strong className="text-foreground">This is architectural and systemic risk analysis for production AI systems.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center sm:items-start mt-10">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Button href="/request-review?type=ai-security" primary={true}>
                Request a Security Review →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
