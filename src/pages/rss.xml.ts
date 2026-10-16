import type { APIRoute } from 'astro';
import { publishedWriting } from '../lib/writing';
import { site } from '../data/site';
const escape = (text: string) => text.replace(/[<>&"']/g, char => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char]!);

export const GET: APIRoute = async () => {
  const entries = await publishedWriting();
  const items = entries.map(entry => `<item><title>${escape(entry.data.title)}</title><link>${site.url}/writing/${escape(entry.id)}/</link><guid>${site.url}/writing/${escape(entry.id)}/</guid><description>${escape(entry.data.description)}</description><pubDate>${entry.data.published.toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Pranjal Pandey: Writing</title><link>${site.url}/writing/</link><description>Practical AI strategy and notes from building useful systems.</description><language>en</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
