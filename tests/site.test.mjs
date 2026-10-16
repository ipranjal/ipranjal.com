import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { localTarget, verifyBuild } from '../scripts/verify-build.mjs';

test('local URL resolver handles relative links, fragments, XML entities and external providers', () => {
  assert.deepEqual(localTarget('../about/#story', '/work/'), { path: '/about/', hash: 'story' });
  assert.deepEqual(localTarget('/guide/?a=1&amp;b=2', '/'), { path: '/guide/', hash: '' });
  assert.deepEqual(localTarget('https://ipranjal.com/writing/', '/'), { path: '/writing/', hash: '' });
  assert.equal(localTarget('https://cal.com/ipranjal/ai-pilot', '/'), null);
  assert.equal(localTarget('mailto:hello@ipranjal.com', '/'), null);
});

test('production output has complete routes, accessible structure and no private sources', async () => {
  const result = await verifyBuild();
  assert(result.pages >= 15);
});

test('provider short links preserve the user-specified destinations', async () => {
  const call = await readFile('dist/call/index.html', 'utf8');
  const session = await readFile('dist/session/index.html', 'utf8');
  assert(call.includes('0;url=https://cal.com/ipranjal/ai-pilot'));
  assert(session.includes('0;url=https://topmate.io/itspranjal/2359700'));
  assert(call.includes('noindex,follow'));
  assert(session.includes('Continue to Topmate'));
  const home = await readFile('dist/index.html', 'utf8');
  assert.match(home, /href="\/work\/#sessions"[^>]*>Explore sessions/, 'The combined sessions link must offer both sessions, not redirect straight to career booking');
});

test('signup and confirmation have separate thanks and welcome pages', async () => {
  const thanks = await readFile('dist/thanks/index.html', 'utf8');
  assert(thanks.includes('Check your inbox.'));
  assert(!thanks.includes('.pdf'));
  assert(!thanks.includes('href="/welcome/'), 'Thanks must direct visitors to email confirmation, not bypass it');
  const home = await readFile('dist/index.html', 'utf8');
  assert(home.includes('https://ipranjal.com/thanks/'), 'Signup must still redirect to thanks');
  const welcome = await readFile('dist/welcome/index.html', 'utf8');
  assert(welcome.includes('noindex,follow'));
  assert(welcome.includes('https://topmate.io/itspranjal/2359698'), 'Welcome strategy CTA must not book the career session');
  const download = welcome.match(/href="([^"]+\.pdf)" download="ai-strategy-starter\.pdf"/);
  assert(download, 'Welcome page must link to the downloadable PDF');
  const output = await readFile(`dist${download[1]}`);
  assert.equal(output.subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(output, await readFile('assets/ai-strategy-starter.pdf'));
});

test('one Guides page owns the visible Kit signup and the legacy guide route redirects to it', async () => {
  const guides = await readFile('dist/guides/index.html', 'utf8');
  assert(guides.includes('id="free-guide"'));
  assert(guides.includes('https://app.kit.com/forms/10053825/subscriptions'));
  assert(guides.includes('data-uid="1a8706f0e9"'));
  assert(guides.includes('https://f.convertkit.com/ckjs/ck.5.js'));
  assert(guides.includes('name="email_address"'));
  assert(guides.includes('Send me the guide'));
  assert.equal((guides.match(/<form\b/g) || []).length, 1);
  const guide = await readFile('dist/guide/index.html', 'utf8');
  assert(guide.includes('0;url=/guides/#free-guide'));
  assert(guide.includes('href="/guides/#free-guide"'));
  assert(guide.includes('noindex,follow'));
  assert(!guide.includes('<form'));
});

test('homepage guide section uses the prominent signup panel and one real Kit form', async () => {
  const home = await readFile('dist/index.html', 'utf8');
  const section = home.match(/<section[^>]*id="guide"[\s\S]*?<\/section>/)?.[0];
  assert(section);
  assert(section.includes('class="guide-signup-panel"'));
  assert(section.includes('id="home-signup-title"'));
  assert(section.includes('id="home-email"'));
  assert(section.includes('name="email_address"'));
  assert(section.includes('https://app.kit.com/forms/10053825/subscriptions'));
  assert(section.includes('data-uid="1a8706f0e9"'));
  assert(section.includes('Send me the guide'));
  assert.equal((home.match(/<form\b/g) || []).length, 1);
  assert(!section.includes('guide-title-card'));
});

test('every signup surface includes the hosted Kit fallback without automatic navigation', async () => {
  for (const path of ['index.html', 'guides/index.html', 'writing/index.html', 'writing/why-ai-pilots-fail/index.html', 'writing/which-tasks-to-automate-with-ai/index.html']) {
    const html = await readFile(`dist/${path}`, 'utf8');
    assert(html.includes('href="https://pranjal-pandey.kit.com/9529f267b9"'));
    assert(html.includes('subscription-unavailable'));
    assert(html.includes('Open signup on Kit'));
    assert(html.includes('Use the Kit signup link above'));
    assert(!html.includes('http-equiv="refresh"'));
  }
});

test('unpublished essays and provider confirmation pages stay out of the sitemap', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const path of ['/guide/', '/thanks/', '/welcome/', '/call/', '/session/', '/newsletter/']) assert(!sitemap.includes(`<loc>https://ipranjal.com${path}</loc>`));
  const rss = await readFile('dist/rss.xml', 'utf8');
  assert(rss.startsWith('<?xml version="1.0"'));
  assert(rss.includes('<channel>'));
});

test('both approved essays appear across archive, homepage, RSS and sitemap with article metadata', async () => {
  const slugs = ['why-ai-pilots-fail', 'which-tasks-to-automate-with-ai'];
  const [archive, home, rss, sitemap] = await Promise.all(['dist/writing/index.html', 'dist/index.html', 'dist/rss.xml', 'dist/sitemap.xml'].map(path => readFile(path, 'utf8')));
  assert(archive.includes('writing-layout'));
  assert(archive.indexOf('id="essays-title"') < archive.indexOf('id="writing-signup-title"'), 'Editorial archive must precede signup');
  assert(!archive.includes('No essays published'));
  assert(!home.includes('No essays published'));
  for (const slug of slugs) {
    const url = `https://ipranjal.com/writing/${slug}/`;
    const html = await readFile(`dist/writing/${slug}/index.html`, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert(title && title.length <= 60);
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert(description && description.length <= 155);
    assert(html.includes(`rel="canonical" href="${url}"`));
    assert(html.includes('property="og:type" content="article"'));
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    assert(json);
    const schema = JSON.parse(json);
    assert.equal(schema['@type'], 'BlogPosting');
    assert.equal(schema.url, url);
    assert.equal(schema.datePublished, '2026-10-16T00:00:00.000Z');
    assert.equal(schema.author.name, 'Pranjal Pandey');
    assert(schema.headline.length > title.length, 'Schema must retain the full essay headline');
    assert(html.includes('<table>'));
    assert(html.includes('>FAQ</h2>'));
    assert(html.includes('href="/guides/#free-guide"'));
    assert(html.includes('href="/work/"'));
    assert(archive.includes(`href="/writing/${slug}/"`));
    assert(home.includes(`href="/writing/${slug}/"`));
    assert(rss.includes(`<link>${url}</link>`));
    assert(sitemap.includes(`<loc>${url}</loc>`));
  }
  const allocation = await readFile('dist/writing/which-tasks-to-automate-with-ai/index.html', 'utf8');
  assert(allocation.includes('https://topmate.io/itspranjal/2359698'));
  assert(!allocation.includes('href="https://ipranjal.com/session"'));
  assert(!allocation.includes('href="/session/"'));
});
