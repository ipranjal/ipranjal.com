import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function ArchitectureHero() {
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
            
            {/* Architecture/System illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="archGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5CC8E6" />
                    <stop offset="100%" stopColor="#8B7CFF" />
                  </linearGradient>
                </defs>
                
                {/* Central system node */}
                <circle cx="200" cy="200" r="40" fill="none" stroke="url(#archGradient)" strokeWidth="3" opacity="0.8" />
                <circle cx="200" cy="200" r="30" fill="url(#archGradient)" opacity="0.2" />
                
                {/* Connecting nodes */}
                <g opacity="0.7">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const x = 200 + 120 * Math.cos((angle * Math.PI) / 180);
                    const y = 200 + 120 * Math.sin((angle * Math.PI) / 180);
                    return (
                      <g key={i}>
                        <line x1="200" y1="200" x2={x} y2={y} stroke="#5CC8E6" strokeWidth="2" opacity="0.4" />
                        <circle cx={x} cy={y} r="20" fill="none" stroke="#5CC8E6" strokeWidth="2" />
                        <circle cx={x} cy={y} r="12" fill="#5CC8E6" opacity="0.3" />
                      </g>
                    );
                  })}
                </g>
                
                {/* Animated connections */}
                <g opacity="0.5">
                  {[0, 120, 240].map((angle, i) => {
                    const x = 200 + 120 * Math.cos((angle * Math.PI) / 180);
                    const y = 200 + 120 * Math.sin((angle * Math.PI) / 180);
                    return (
                      <circle key={i} cx={x} cy={y} r="4" fill="#8B7CFF">
                        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
                      </circle>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 md:order-2 text-center md:text-left md:-mt-8">
          <Heading level={1} className="mb-6 text-5xl md:text-6xl lg:text-7xl leading-tight">
            <span className="gradient-text">System & AI Architecture Review</span>
          </Heading>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted mb-2 font-light">
            A focused, senior-level engagement to identify what will break as you scale
          </p>
          
          <div className="section-divider mx-auto md:mx-0"></div>
          
          <p className="text-lg md:text-xl text-muted/80 mb-10 max-w-2xl mx-auto md:mx-0">
            Designed for teams building non-trivial products who want architecture and AI decisions that age well.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center sm:items-start">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Button href="/request-review?type=architecture" primary={true}>
                Request a Review Conversation →
              </Button>
              <p className="text-sm text-muted/70 italic max-w-xs text-center sm:text-left">
                This is a paid, senior-level engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
