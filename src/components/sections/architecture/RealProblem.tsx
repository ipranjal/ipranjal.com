import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function RealProblem() {
  return (
    <Section id="problem" width="wide" className="!py-16">
      <div className="relative">
        {/* Decorative warning icon */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FF6B6B" strokeWidth="2" />
            <path d="M 50 25 L 50 55" stroke="#FF6B6B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="65" r="3" fill="#FF6B6B" />
          </svg>
        </div>
        
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">
          The real problem
        </Heading>
        
        <div className="section-divider mb-8"></div>
      
      <div className="space-y-6 mb-8 max-w-3xl">
        <p className="text-lg text-muted">
          Most architecture problems don't show up in logs.<br />
          They show up as lost velocity, fragile systems, and expensive rewrites.
        </p>
        
        <p className="text-lg text-foreground">
          Teams move fast early on, but as the system grows, everything starts to slow down:
        </p>
        
        <ul className="space-y-5">
          {[
            'Adding features takes 3x longer than it should',
            'AI usage drives unpredictable costs or unreliable behavior',
            'Scaling isn\'t just "add more servers"—it\'s broken abstractions and tight coupling',
            'The team debates fundamental decisions instead of shipping'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
              <span className="text-foreground/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
        <p className="text-lg text-muted italic border-l-4 border-accent/30 pl-6 py-2 max-w-3xl">
          These problems don't show up in logs.<br />
          They show up as lost velocity, fragile systems, and expensive rewrites.
        </p>
      </div>
    </Section>
  );
}
