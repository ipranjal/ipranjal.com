/**
 * Writing & Notes Listing Page
 * 
 * Displays all essays, technical notes, and architecture writeups.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { getAllArticles } from '@/lib/markdown';

export const metadata = {
  title: 'Writing & Notes – Pranjal Pandey',
  description: 'Essays, technical notes, and architecture writeups on system design, AI integration, and long-term engineering decisions.',
  openGraph: {
    title: 'Writing & Notes – Pranjal Pandey',
    description: 'Technical notes and essays on systems, architecture, and engineering decisions that age well.',
    type: 'website',
    url: 'https://ipranjal.com/writing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing & Notes – Pranjal Pandey',
    description: 'Technical notes on system design, AI integration, and engineering decisions.',
  },
};

export default function WritingPage() {
  const pieces = getAllArticles();

  return (
    <Section id="writing" width="wide">
      <Heading level={1} className="mb-4 text-5xl md:text-6xl">
        Writing & Notes
      </Heading>
      
      <div className="section-divider mb-12"></div>
      
      <p className="text-lg md:text-xl text-muted mb-16 max-w-3xl">
        Technical notes, architecture writeups, and essays on system design, AI integration, and long-term engineering decisions. Thinking artifacts, not tutorials.
      </p>

      {pieces.length === 0 ? (
        <p className="text-muted">No content currently available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece) => (
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
                  
                  <Heading level={2} className="text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                    {piece.title}
                  </Heading>
                
                <p className="text-base text-muted leading-relaxed mb-4 flex-grow">
                  {piece.premise}
                </p>
                
                {piece.date && (
                  <p className="text-xs text-muted mb-3">
                    {piece.date}
                  </p>
                )}
                
                  <div className="inline-flex items-center gap-2 text-accent group-hover:text-accent-hover transition-colors font-medium text-sm">
                    Read Article
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
