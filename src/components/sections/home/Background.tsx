/**
 * Background Section Component
 * 
 * Coherent narrative (not timeline) of experience and positioning.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import type { BackgroundSection } from '@/types/content';

interface BackgroundProps {
  data: BackgroundSection;
}

export function Background({ data }: BackgroundProps) {
  return (
    <Section id="background" width="wide">
      <Heading level={2} id="background-heading" className="mb-4 text-4xl md:text-5xl">
        {data.heading}
      </Heading>
      
      <div className="section-divider mb-8"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Decorative vector illustration - LEFT COLUMN */}
        <div className="relative h-[400px] flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Background glow */}
            <defs>
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5CC8E6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#5CC8E6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5CC8E6" />
                <stop offset="100%" stopColor="#8B7CFF" />
              </linearGradient>
            </defs>
            
            <circle cx="200" cy="200" r="180" fill="url(#bgGlow)" />
            
            {/* Network nodes representing connections and systems */}
            <g opacity="0.6">
              {/* Connection lines */}
              <line x1="200" y1="100" x2="280" y2="160" stroke="#5CC8E6" strokeWidth="2" opacity="0.3" />
              <line x1="200" y1="100" x2="120" y2="160" stroke="#5CC8E6" strokeWidth="2" opacity="0.3" />
              <line x1="280" y1="160" x2="300" y2="240" stroke="#8B7CFF" strokeWidth="2" opacity="0.3" />
              <line x1="120" y1="160" x2="100" y2="240" stroke="#8B7CFF" strokeWidth="2" opacity="0.3" />
              <line x1="100" y1="240" x2="200" y2="280" stroke="#5CC8E6" strokeWidth="2" opacity="0.3" />
              <line x1="300" y1="240" x2="200" y2="280" stroke="#5CC8E6" strokeWidth="2" opacity="0.3" />
              <line x1="200" y1="100" x2="200" y2="280" stroke="#B8C0CC" strokeWidth="1" opacity="0.2" strokeDasharray="4,4" />
            </g>
            
            {/* Nodes - representing systems thinking */}
            <circle cx="200" cy="100" r="12" fill="url(#nodeGradient)" opacity="0.8" />
            <circle cx="280" cy="160" r="10" fill="#5CC8E6" opacity="0.7" />
            <circle cx="120" cy="160" r="10" fill="#5CC8E6" opacity="0.7" />
            <circle cx="300" cy="240" r="8" fill="#8B7CFF" opacity="0.6" />
            <circle cx="100" cy="240" r="8" fill="#8B7CFF" opacity="0.6" />
            <circle cx="200" cy="280" r="14" fill="url(#nodeGradient)" opacity="0.9" />
            
            {/* Central human element - abstract figure */}
            <g transform="translate(200, 200)">
              {/* Head */}
              <circle cx="0" cy="-30" r="20" fill="none" stroke="url(#nodeGradient)" strokeWidth="2" opacity="0.8" />
              <circle cx="0" cy="-30" r="18" fill="#5CC8E6" opacity="0.1" />
              
              {/* Body - simplified geometric */}
              <path d="M -15,0 L -15,40 L 15,40 L 15,0 Z" fill="none" stroke="#5CC8E6" strokeWidth="2" opacity="0.6" />
              
              {/* Arms - reaching out (connection to systems) */}
              <line x1="-15" y1="10" x2="-45" y2="0" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
              <line x1="15" y1="10" x2="45" y2="0" stroke="#8B7CFF" strokeWidth="2" opacity="0.5" />
              
              {/* Accent elements - thinking/creating */}
              <circle cx="-25" cy="-45" r="3" fill="#5CC8E6" opacity="0.6" />
              <circle cx="-18" cy="-52" r="2" fill="#8B7CFF" opacity="0.5" />
              <circle cx="10" cy="-50" r="2.5" fill="#5CC8E6" opacity="0.5" />
            </g>
            
            {/* Floating code/thought elements */}
            <g opacity="0.4">
              <rect x="60" y="120" width="30" height="4" rx="2" fill="#5CC8E6" />
              <rect x="65" y="130" width="20" height="4" rx="2" fill="#8B7CFF" />
              <rect x="310" y="200" width="25" height="4" rx="2" fill="#8B7CFF" />
              <rect x="315" y="210" width="18" height="4" rx="2" fill="#5CC8E6" />
            </g>
          </svg>
        </div>
        
        {/* Text content - RIGHT COLUMN */}
        <div className="space-y-6 border-l-4 border-accent/20 pl-8">
          {data.narrative.map((paragraph, index) => (
            <p key={index} className="text-foreground/85 leading-loose text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
