import { getCollection } from 'astro:content';

export async function publishedWriting() {
  const now = new Date();
  const entries = await getCollection('writing', ({ data }) => !data.draft && data.published <= now);
  return entries.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export const formatDate = (date: Date) => new Intl.DateTimeFormat('en', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(date);
