import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Thank You | Pranjal Pandey',
  description: 'Thank you for your architecture review request. I\'ll respond within 48 hours.',
}

export default function ThankYou() {
  return (
    <Section id="thank-you" className="!py-20">
      <div className="text-center max-w-2xl mx-auto">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <Heading level={1} className="mb-4 text-4xl md:text-5xl">
          Thank You!
        </Heading>
        
        <div className="flex justify-center mb-4">
          <div className="section-divider"></div>
        </div>
        
        <p className="text-xl text-muted mb-6">
          I&apos;ve received your Architecture Review request.
        </p>
        
        <p className="text-lg text-muted/80 mb-8">
          You should receive a confirmation email shortly. I&apos;ll review your submission and respond within <strong className="text-foreground">48 hours</strong> to discuss whether this engagement makes sense and determine next steps.
        </p>
        
        <div className="bg-surface/30 border border-border rounded-lg p-6 mb-10">
          <p className="text-base text-muted mb-2">
            <strong className="text-foreground">What happens next?</strong>
          </p>
          <ul className="space-y-3 text-left max-w-md mx-auto">
            {[
              'You\'ll receive a confirmation email',
              'I\'ll review your specific context and concerns',
              'We\'ll have an exploratory call to confirm fit',
              'If aligned, we\'ll schedule the review engagement'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent mt-1.5 text-xs flex-shrink-0">▸</span>
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" primary={true}>
            Back to Home
          </Button>
          <Button href="/architecture-review" primary={false}>
            Learn More About Review
          </Button>
        </div>
      </div>
    </Section>
  )
}
