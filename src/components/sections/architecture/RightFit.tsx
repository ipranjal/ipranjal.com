import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export function RightFit() {
  return (
    <Section id="fit" width="wide" className="!py-16">
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
              "You're a Seed–Series A startup or internal product team",
              "You've shipped real software with real users",
              'Architecture and AI decisions materially affect execution',
              'You care about long-term system health, not just speed'
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
              "You're at idea or pre-MVP stage",
              'You want short-term implementation bandwidth',
              'You want validation instead of critique',
              'You want someone to "just build features"'
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
        Clarity here saves everyone time.
      </p>
    </Section>
  );
}
