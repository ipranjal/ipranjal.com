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

test('unpublished essays and provider confirmation pages stay out of the sitemap', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const path of ['/thanks/', '/welcome/', '/call/', '/session/', '/newsletter/']) assert(!sitemap.includes(`<loc>https://ipranjal.com${path}</loc>`));
  const rss = await readFile('dist/rss.xml', 'utf8');
  assert(rss.startsWith('<?xml version="1.0"'));
  assert(rss.includes('<channel>'));
});
