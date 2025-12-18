/**
 * Live Signal Component
 * 
 * Lightweight, dismissible section for current events/speaking.
 * Shows the latest featured event from events.json.
 */

import { loadSectionContent } from '@/lib/content';
import type { EventsSection } from '@/types/content';

export async function LiveSignal() {
  const eventsResult = await loadSectionContent<EventsSection>('events');
  
  if (!eventsResult.success) return null;
  
  const latestEvent = eventsResult.data.events.find(e => e.featured && e.active);
  if (!latestEvent) return null;

  return (
    <div className="border-t border-b border-border/30 bg-surface/10 py-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-sm text-muted/90">
              <span className="text-accent font-medium">Latest:</span> {latestEvent.title}
            </p>
            <p className="text-xs text-muted/70 mt-1">
              {latestEvent.date} · {latestEvent.location}
            </p>
          </div>
          <a
            href="/events"
            className="text-sm text-muted hover:text-foreground transition-colors whitespace-nowrap"
          >
            All Events →
          </a>
        </div>
      </div>
    </div>
  );
}
