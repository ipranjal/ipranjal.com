/**
 * Writing & Notes Section Component
 * 
 * Displays featured writing pieces with link to full writing page.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { getAllArticles } from '@/lib/markdown';

export function WritingNotes() {
  // Get featured articles only (up to 3)
  const allArticles = getAllArticles();
  const featuredPieces = allArticles.filter(article => article.featured).slice(0, 3);
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPieces.map((piece) => (
          <Link
            key={piece.id}
            href={`/writing/${piece.id}`}
            className="block"
          >
            <article className="border border-border rounded-xl bg-surface hover:bg-surface/80 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full flex flex-col overflow-hidden">
              {piece.featuredImage && (
                <div className="relative w-full h-48 mb-4">
                  <OptimizedImage
                    src={piece.featuredImage}
                    alt={piece.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                {piece.tag && (
                  <div className="inline-block px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-xs font-medium mb-3 w-fit">
                    {piece.tag}
                  </div>
                )}
                
                <Heading level={3} className="text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                  {piece.title}
                </Heading>
                
                <p className="text-base text-muted leading-relaxed mb-4 flex-grow">
                  {piece.premise}
                </p>
                
                <div className="inline-flex items-center gap-2 text-accent group-hover:text-accent-hover transition-colors font-medium text-sm">
                  Read Article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
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
