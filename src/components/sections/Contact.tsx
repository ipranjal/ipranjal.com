import { ContactSection } from '@/types/content'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'

interface ContactProps {
  data: ContactSection
}

export default function Contact({ data }: ContactProps) {
  const { heading, intro, methods } = data

  return (
    <Section id="contact" width="wide">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="max-w-2xl">
          <Heading level={2} className="mb-4 text-4xl md:text-5xl">{heading}</Heading>
          <div className="section-divider mb-8"></div>
          {intro && <p className="text-lg md:text-xl text-foreground/80 mb-12">{intro}</p>}
          
          <div className="flex flex-col sm:flex-row gap-6">
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
        
        {/* Human connection illustration */}
        <div className="relative h-[400px] flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="contactGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5CC8E6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#5CC8E6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5CC8E6" />
                <stop offset="100%" stopColor="#8B7CFF" />
              </linearGradient>
            </defs>
            
            <circle cx="200" cy="200" r="180" fill="url(#contactGlow)" />
            
            {/* Two figures - representing connection/conversation */}
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
              <path d="M 160,200 Q 200,180 240,200" fill="none" stroke="url(#messageGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M 160,210 Q 200,230 240,210" fill="none" stroke="url(#messageGradient)" strokeWidth="2" strokeDasharray="5,5">
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
  )
}
