import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function AISystemsCrossLink() {
  return (
    <Section id="ai-systems-cross-link" width='wide' className="!py-16 bg-surface/5">
      <div className="max-w-3xl ">
        <Heading level={3} className="mb-4 text-3xl md:text-4xl">
          Also working with AI systems?
        </Heading>
        
        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
          If your product includes AI/ML components—LLMs, agents, or production models—consider an <strong className="text-foreground">AI Security & Compliance Review</strong> to assess prompt injection risks, data leakage, regulatory gaps, and operational safety.
        </p>
        
        <Button 
          href="/ai-security-review"
        >
          Learn about AI Security Review →
        </Button>
      </div>
    </Section>
  );
}
