/**
 * Writing & Notes Listing Page
 * 
 * Displays all essays, technical notes, and architecture writeups.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export const metadata = {
  title: 'Writing & Notes – Pranjal Pandey',
  description: 'Essays, technical notes, and architecture writeups on system design, AI integration, and long-term engineering decisions.',
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
        <div className="space-y-8">
          {pieces.map((piece) => (
            <Link
              key={piece.id}
              href={`/writing/${piece.id}`}
              className="block"
            >
              <article className="border border-border p-8 md:p-10 rounded-xl bg-surface hover:bg-surface/80 hover:border-accent/30 transition-all group cursor-pointer">
                {piece.tag && (
                  <div className="inline-block px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-4">
                    {piece.tag}
                  </div>
                )}
                
                <Heading level={2} className="text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent transition-colors">
                  {piece.title}
                </Heading>
                
                <p className="text-lg text-muted leading-relaxed mb-4 max-w-3xl">
                  {piece.premise}
                </p>
                
                {piece.date && (
                  <p className="text-sm text-muted mb-4">
                    {piece.date}
                  </p>
                )}
                
                <div className="inline-flex items-center gap-2 text-accent group-hover:text-accent-hover transition-colors font-medium">
                  Read Article
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
