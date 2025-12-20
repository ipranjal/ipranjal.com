import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function ArchitectureCTA() {
  return (
    <Section id="cta" width="wide" className="!py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="max-w-3xl">
          <Heading level={2} className="mb-4 text-4xl md:text-5xl">
            Ready to see where your system is heading?
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
                <p className="text-sm text-muted/80">Share your system context and concerns</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-xl">2</span>
              </div>
              <div>
                <p className="text-base text-foreground font-medium mb-1">Exploratory call</p>
                <p className="text-sm text-muted/80">We'll determine if this engagement makes sense</p>
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
          
          <Button href="/request-review?type=architecture" primary={true}>
            Request a Review Conversation →
          </Button>
          
          <p className="text-sm text-muted/60 italic mt-4">
            This is a paid, senior-level engagement
          </p>
          
          <p className="text-sm text-muted/70 mt-4">
            I typically take on a limited number of reviews at a time to stay deeply involved.
          </p>
        </div>
        
        {/* Conversation illustration */}
        <div className="relative h-[400px] flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5CC8E6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#5CC8E6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ctaMessageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5CC8E6" />
                <stop offset="100%" stopColor="#8B7CFF" />
              </linearGradient>
            </defs>
            
            <circle cx="200" cy="200" r="180" fill="url(#ctaGlow)" />
            
            {/* Two figures - representing review conversation */}
            <g transform="translate(120, 180)">
              {/* Person 1 */}
              <circle cx="0" cy="0" r="25" fill="none" stroke="#5CC8E6" strokeWidth="2.5" opacity="0.8" />
              <path d="M -20,30 L -20,70 L 20,70 L 20,30" fill="none" stroke="#5CC8E6" strokeWidth="2.5" opacity="0.6" />
              <line x1="-20" y1="45" x2="-40" y2="35" stroke="#5CC8E6" strokeWidth="2.5" opacity="0.6" />
              <line x1="20" y1="45" x2="40" y2="55" stroke="#5CC8E6" strokeWidth="2.5" opacity="0.6" />
            </g>
            
            <g transform="translate(280, 180)">
              {/* Person 2 */}
              <circle cx="0" cy="0" r="25" fill="none" stroke="#8B7CFF" strokeWidth="2.5" opacity="0.8" />
              <path d="M -20,30 L -20,70 L 20,70 L 20,30" fill="none" stroke="#8B7CFF" strokeWidth="2.5" opacity="0.6" />
              <line x1="-20" y1="45" x2="-40" y2="55" stroke="#8B7CFF" strokeWidth="2.5" opacity="0.6" />
              <line x1="20" y1="45" x2="40" y2="35" stroke="#8B7CFF" strokeWidth="2.5" opacity="0.6" />
            </g>
            
            {/* Communication waves/messages between people */}
            <g opacity="0.5">
              <path d="M 160,200 Q 200,180 240,200" fill="none" stroke="url(#ctaMessageGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M 160,210 Q 200,230 240,210" fill="none" stroke="url(#ctaMessageGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="-10" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
            
            {/* Message bubbles */}
            <g opacity="0.6">
              <path d="M 140,140 L 180,140 L 180,165 L 165,165 L 160,172 L 160,165 L 140,165 Z" fill="#5CC8E6" opacity="0.3" stroke="#5CC8E6" strokeWidth="1" />
              <rect x="220" y="245" width="40" height="25" rx="4" fill="#8B7CFF" opacity="0.3" stroke="#8B7CFF" strokeWidth="1" />
            </g>
            
            {/* Decorative elements - representing ideas being exchanged */}
            <g opacity="0.4">
              <circle cx="200" cy="120" r="4" fill="#5CC8E6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="190" cy="105" r="3" fill="#8B7CFF">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="210" cy="110" r="3.5" fill="#5CC8E6">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>
      </div>
    </Section>
  );
}
