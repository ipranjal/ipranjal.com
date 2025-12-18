/**
 * Writing & Notes Section Component
 * 
 * Displays featured writing pieces with link to full writing page.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export function WritingNotes() {
  // Get all articles and show first 3 as featured
  const allArticles = getAllArticles();
  const featuredPieces = allArticles.slice(0, 3);
  
  // Get heading from first article or use default
  const heading = "Writing & Notes";
  const intro = "Technical notes and essays on systems, architecture, and engineering decisions that age well.";

  return (
    <Section id="writing-notes" width="wide">
      <div className="flex items-end justify-between mb-8">
        <div>
          <Heading level={2} className="mb-4 text-4xl md:text-5xl">
            {heading}
          </Heading>
          <p className="text-lg text-muted max-w-3xl mt-4">
            {intro}
          </p>
        </div>
        
        <a
          href="/writing"
          className="hidden md:inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium whitespace-nowrap"
        >
          View All →
        </a>
      </div>
      
      <div className="section-divider mb-12"></div>
      
      <div className="space-y-8">
        {featuredPieces.map((piece) => (
          <Link
            key={piece.id}
            href={`/writing/${piece.id}`}
            className="block"
          >
            <article className="border border-border p-8 rounded-xl bg-surface hover:bg-surface/80 hover:border-accent/30 transition-all group cursor-pointer">
              {piece.tag && (
                <div className="inline-block px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-4">
                  {piece.tag}
                </div>
              )}
              
              <Heading level={3} className="text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent transition-colors">
                {piece.title}
              </Heading>
              
              <p className="text-lg text-muted leading-relaxed mb-6 max-w-3xl">
                {piece.premise}
              </p>
              
              <div className="inline-flex items-center gap-2 text-accent group-hover:text-accent-hover transition-colors font-medium">
                Read Article
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 text-center md:hidden">
        <a
          href="/writing"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
        >
          View All Writing →
        </a>
      </div>
    </Section>
  );
}
