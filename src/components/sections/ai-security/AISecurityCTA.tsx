import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function AISecurityCTA() {
  return (
    <Section id="cta" width="wide" className="!py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="max-w-3xl">
          <Heading level={2} className="mb-4 text-4xl md:text-5xl">
            Ready to secure your AI system?
          </Heading>
          
          <div className="section-divider mb-8"></div>
          
          <p className="text-lg md:text-xl text-muted mb-10">
            The first step is a short exploratory call to confirm fit. If it's not a good match, I'll say so directly.
          </p>
          
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">1</span>
              </div>
              <div>
                <p className="text-base text-foreground font-medium mb-1">Request a conversation</p>
                <p className="text-sm text-muted/80">Share your AI system context and security concerns</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">2</span>
              </div>
              <div>
                <p className="text-base text-foreground font-medium mb-1">Exploratory call</p>
                <p className="text-sm text-muted/80">We'll determine if this security review makes sense</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">3</span>
              </div>
              <div>
                <p className="text-base text-foreground font-medium mb-1">Review begins</p>
                <p className="text-sm text-muted/80">If we're aligned, we'll schedule the engagement</p>
              </div>
            </div>
          </div>
          
          <p className="text-base text-foreground/80 mb-8 italic">
            This is not a sales call — it's a fit check.
          </p>
          
          <Button href="/request-review?type=ai-security" primary={true}>
            Request a Security Review →
          </Button>
          
          <p className="text-sm text-muted/60 italic mt-4">
            This is a paid, senior-level engagement
          </p>
          
          <p className="text-sm text-muted/70 mt-4">
            I typically take on a limited number of reviews at a time to stay deeply involved.
          </p>
        </div>
        
        {/* Security conversation illustration */}
        <div className="relative h-[400px] flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="securityCtaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5CC8E6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#5CC8E6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5CC8E6" />
                <stop offset="100%" stopColor="#8B7CFF" />
              </linearGradient>
            </defs>
            
            <circle cx="200" cy="200" r="180" fill="url(#securityCtaGlow)" />
            
            {/* Central security shield */}
            <g transform="translate(200, 180)">
              <path d="M 0,-60 L 30,-50 L 30,-10 Q 30,20 0,40 Q -30,20 -30,-10 L -30,-50 Z" 
                fill="none" stroke="url(#securityGradient)" strokeWidth="3" opacity="0.8" />
              {/* Lock symbol */}
              <circle cx="0" cy="0" r="12" fill="none" stroke="#5CC8E6" strokeWidth="2.5" />
              <rect x="-5" y="5" width="10" height="12" fill="#8B7CFF" opacity="0.6" />
            </g>
            
            {/* Security layers - expanding circles */}
            <g opacity="0.4">
              <circle cx="200" cy="180" r="80" fill="none" stroke="#5CC8E6" strokeWidth="1.5">
                <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="180" r="100" fill="none" stroke="#8B7CFF" strokeWidth="1.5">
                <animate attributeName="r" values="100;110;100" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </g>
            
            {/* Threat detection points */}
            <g opacity="0.5">
              <circle cx="120" cy="120" r="6" fill="#5CC8E6">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="280" cy="140" r="6" fill="#8B7CFF">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="240" cy="260" r="6" fill="#5CC8E6">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="150" cy="240" r="6" fill="#8B7CFF">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
            
            {/* Connecting lines to shield */}
            <g opacity="0.3">
              <line x1="120" y1="120" x2="180" y2="160" stroke="url(#securityGradient)" strokeWidth="1" strokeDasharray="3,3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="280" y1="140" x2="220" y2="165" stroke="url(#securityGradient)" strokeWidth="1" strokeDasharray="3,3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.3s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        </div>
      </div>
    </Section>
  );
}
