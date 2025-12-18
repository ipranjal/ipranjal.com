/**
 * Events Listing Page
 * 
 * Displays all speaking engagements, conferences, and events.
 */

import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { loadSectionContent } from '@/lib/content';
import type { EventsSection } from '@/types/content';

export const metadata = {
  title: 'Speaking & Events – Pranjal Pandey',
  description: 'Speaking engagements, conferences, and events featuring Pranjal Pandey on system architecture, AI, and engineering leadership.',
};

export default async function EventsPage() {
  const eventsResult = await loadSectionContent<EventsSection>('events');
  
  if (!eventsResult.success) {
    return (
      <Section id="events" width="wide">
        <Heading level={1} className="mb-4 text-5xl md:text-6xl">
          Speaking & Events
        </Heading>
        <div className="section-divider mb-12"></div>
        <p className="text-muted">No events currently scheduled.</p>
      </Section>
    );
  }

  const activeEvents = eventsResult.data.events.filter(e => e.active);
  const hasActiveEvents = activeEvents.length > 0;

  return (
    <Section id="events" width="wide">
      <Heading level={1} className="mb-4 text-5xl md:text-6xl">
        Speaking & Events
      </Heading>
      
      <div className="section-divider mb-12"></div>
      
      <p className="text-lg md:text-xl text-muted mb-16 max-w-3xl">
        Talks, workshops, and conversations on Research, System architecture, AI integration, and long-term technical decision-making.
      </p>

      {!hasActiveEvents ? (
        <p className="text-muted">No events currently scheduled.</p>
      ) : (
        <div className="space-y-8">
          {activeEvents.map((event) => (
            <div key={event.id} className="border border-border p-8 rounded-xl bg-surface hover:bg-surface/80 hover:border-accent/30 transition-all">
              {event.featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                  Featured
                </span>
              )}
                            
              <Heading level={2} className="text-2xl md:text-3xl text-foreground mb-4">
                {event.title}
              </Heading>
              
              <div className="flex flex-wrap gap-4 text-muted mb-4">
                <span className="flex items-center gap-2">
                  <span className="text-accent">📅</span>
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-accent">📍</span>
                  {event.location}
                </span>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
