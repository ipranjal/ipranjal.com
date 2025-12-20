import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function AISecurityHowItWorks() {
  const phases = [
    {
      number: '1',
      title: 'Intake',
      duration: '~30 minutes',
      description: 'You share: architecture, where AI sits, what models/tools you use, what data they touch.'
    },
    {
      number: '2',
      title: 'Review',
      duration: '~1 week',
      description: 'I review your architecture, analyze AI threat surface, evaluate system boundaries, compliance gaps, and operational risks.'
    },
    {
      number: '3',
      title: 'Delivery',
      duration: '~1 hour',
      description: 'You get: written report with prioritized findings, walkthrough call, clear next steps.'
    }
  ];
  
  return (
    <Section id="how-it-works" width="wide" className="!py-16">
      <Heading level={2} className="mb-4 text-4xl md:text-5xl">
        How it works
      </Heading>
      
      <div className="section-divider mb-12"></div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {phases.map((phase, index) => (
          <div 
            key={index}
            className="relative"
          >
            {/* Arrow between phases */}
            {index < phases.length - 1 && (
              <div className="hidden md:block absolute top-16 -right-4 text-accent/30 text-2xl">
                →
              </div>
            )}
            
            <div className="border border-accent/20 rounded-lg p-6 bg-surface/20 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/30">
                  <span className="text-2xl font-bold text-accent">{phase.number}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-foreground/60">{phase.duration}</p>
                </div>
              </div>
              
              <p className="text-foreground/80 leading-relaxed">
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-lg text-foreground/70 mt-12 text-center max-w-3xl mx-auto">
        Simple, focused, no fluff. You walk away with a clear understanding of your AI security posture and concrete steps to improve it.
      </p>
    </Section>
  );
}
