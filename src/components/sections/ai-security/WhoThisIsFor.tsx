import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function WhoThisIsFor() {
  return (
    <Section id="who-this-is-for" width="wide" className="!py-16">
      <Heading level={2} className="mb-4 text-4xl md:text-5xl">
        Is This the Right Fit?
      </Heading>
      
      <div className="section-divider mb-12"></div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Good Fit Column - Emphasized */}
        <div className="border-l-4 border-accent bg-accent/5 pl-8 pr-6 py-8 rounded-r-lg">
          <div className="mb-6">
            <span className="text-accent text-4xl mb-4 block">✓</span>
            <Heading level={3} className="text-2xl md:text-3xl">
              Good Fit If:
            </Heading>
          </div>
          <ul className="space-y-4 text-base md:text-lg">
            {[
              "You're deploying LLMs, ML models, or AI workflows in production",
              'AI features are used by real users or enterprises',
              'You care about prompt injection, data leakage, or model misuse',
              'Future regulatory or enterprise scrutiny is a real concern'
            ].map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span><span className="text-white font-medium">{item.split(' ').slice(0, 3).join(' ')}</span>{item.split(' ').slice(3).join(' ').length > 0 ? ' ' + item.split(' ').slice(3).join(' ') : ''}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Not a Fit Column */}
        <div className="pl-8 pr-6 py-8">
          <div className="mb-6">
            <span className="text-muted/40 text-4xl mb-4 block">✗</span>
            <Heading level={3} className="text-2xl md:text-3xl text-muted/75">
              Not a Fit If:
            </Heading>
          </div>
          <ul className="space-y-4 text-base md:text-lg text-muted/70">
            {[
              'Products with no AI components',
              'Early prototypes with no real users',
              'You want automated vulnerability scans only',
              'You want penetration testing or bug bounty work'
            ].map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-muted/40 mt-1.5 text-xs flex-shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <p className="text-center text-lg text-muted/70 italic mt-12">
        This review is for teams with production AI systems facing real security, misuse, or compliance pressure.
      </p>
    </Section>
  );
}
