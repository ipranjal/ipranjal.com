import { ContactSection } from '@/types/content'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'

interface ContactProps {
  data: ContactSection
}

export default function Contact({ data }: ContactProps) {
  const { heading, intro, methods } = data

  return (
    <Section id="contact" width="default">
      <div className="text-center max-w-2xl mx-auto">
        <Heading level={2} className="mb-4 text-4xl md:text-5xl">{heading}</Heading>
        <div className="section-divider mx-auto mb-8"></div>
        {intro && <p className="text-lg md:text-xl text-foreground/80 mb-12">{intro}</p>}
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {methods.map((method) => {
            const isEmail = method.type === 'email'
            const href = isEmail ? `mailto:${method.value}` : method.value
            const isExternal = !isEmail
            
            return (
              <a
                key={method.type}
                href={href}
                aria-label={method.ariaLabel}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`
                  group inline-flex items-center gap-3 px-8 py-4 
                  rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
                  ${method.primary 
                    ? 'bg-accent text-background border-accent hover:bg-accent-hover hover:border-accent-hover hover:shadow-lg hover:shadow-accent/30' 
                    : 'bg-surface/30 text-foreground border-accent/50 hover:bg-accent/10 hover:border-accent hover:shadow-md'
                  }
                `}
              >
                <span className="font-semibold text-lg">{method.label}</span>
                {isExternal && (
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
