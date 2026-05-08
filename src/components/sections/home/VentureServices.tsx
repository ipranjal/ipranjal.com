/**
 * Venture Services Section
 *
 * Prominent redirections to Corvis Labs and Corpus Vision for visitors
 * looking for specific service engagements.
 */

import { Section } from '@/components/ui/Section';

const services = [
  {
    badge: 'Agentic AI & Automation',
    name: 'Corvis Labs',
    domain: 'corvislabs.io',
    href: 'https://corvislabs.io',
    tagline: 'Agentic workflows & AI integration',
    description:
      'Need to integrate AI into your product or automate complex workflows with agents? Corvis Labs handles end-to-end agentic system design, LLM integration, and intelligent automation.',
    points: [
      'Agentic workflow design & implementation',
      'LLM / AI model integration into existing systems',
      'Intelligent automation & orchestration',
      'AI-readiness assessment for teams',
    ],
    accent: 'from-accent to-accent-secondary',
    border: 'border-accent/30 hover:border-accent/60',
    glow: 'from-accent/10 via-accent-secondary/8 to-transparent',
    tag: 'text-accent',
    arrow: '→',
  },
  {
    badge: 'End-to-End Software',
    name: 'Corpus Vision',
    domain: 'corpusvision.com',
    href: 'https://corpusvision.com',
    tagline: 'Complete product & solution building',
    description:
      'Building something from scratch or need a full technical team? Corpus Vision delivers complete software solutions — from architecture through deployment and beyond.',
    points: [
      'Full-stack product development',
      'System architecture & technical strategy',
      'Team augmentation & engineering leadership',
      'End-to-end delivery from idea to production',
    ],
    accent: 'from-accent-secondary to-accent',
    border: 'border-accent-secondary/30 hover:border-accent-secondary/60',
    glow: 'from-accent-secondary/10 via-accent/8 to-transparent',
    tag: 'text-accent-secondary',
    arrow: '→',
  },
];

export function VentureServices() {
  return (
    <Section id="venture-services" ariaLabel="Venture services" width="wide" className="!pt-2 !pb-16">
      {/* Section label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted/50 text-center mb-6">
        Looking for hands-on work? Reach out through one of these
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((svc) => (
          <a
            key={svc.domain}
            href={svc.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${svc.name} at ${svc.domain} — ${svc.tagline}`}
            className={`group relative flex flex-col p-7 md:p-8 rounded-2xl border bg-surface/40 hover:bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 ${svc.border}`}
          >
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${svc.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            {/* Badge */}
            <span className={`text-xs font-semibold uppercase tracking-widest ${svc.tag} mb-3`}>
              {svc.badge}
            </span>

            {/* Name + domain */}
            <div className="flex items-baseline justify-between mb-1 gap-2 flex-wrap">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-white transition-colors">
                {svc.name}
              </h3>
              <span className={`text-sm font-mono ${svc.tag} opacity-70 group-hover:opacity-100 transition-opacity`}>
                {svc.domain}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-base text-muted/70 italic mb-5">
              {svc.tagline}
            </p>

            {/* Divider */}
            <div className={`h-px bg-gradient-to-r ${svc.accent} opacity-30 mb-5`} />

            {/* Description */}
            <p className="text-muted text-[0.95rem] leading-relaxed mb-6">
              {svc.description}
            </p>

            {/* Points */}
            <ul className="space-y-2 mb-8 flex-1">
              {svc.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9rem] text-muted/80">
                  <span className={`${svc.tag} mt-1 text-xs flex-shrink-0`}>▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${svc.accent} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-200`}>
              Visit {svc.domain}
              <span className="text-base">{svc.arrow}</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
