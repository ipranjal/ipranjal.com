import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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
  assert(result.pages >= 24);
});

test('provider short links preserve the user-specified destinations', async () => {
  const call = await readFile('dist/call/index.html', 'utf8');
  const session = await readFile('dist/session/index.html', 'utf8');
  assert(call.includes('0;url=https://cal.com/ipranjal/ai-pilot'));
  assert(session.includes('0;url=https://topmate.io/itspranjal/'));
  assert(!session.includes('/2359700'));
  for (const [route, service] of [['strategy', '2359698'], ['career', '2359700']]) {
    const html = await readFile(`dist/${route}/index.html`, 'utf8');
    assert(html.includes(`0;url=https://topmate.io/itspranjal/${service}`));
    assert(html.includes('noindex,follow'));
  }
  const playbook = await readFile('dist/playbook/index.html', 'utf8');
  assert(playbook.includes('0;url=/guides/'));
  assert(!playbook.includes('Join the waitlist'), 'Do not pretend a tagged waitlist exists');
  assert(call.includes('noindex,follow'));
  assert(session.includes('Continue to Topmate'));
  const home = await readFile('dist/index.html', 'utf8');
  assert.match(home, /href="\/business\/"/);
  assert.match(home, /href="\/individuals\/"/);
  assert(!home.includes('A company decision.'), 'The lower offer split must not duplicate the audience chooser');
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
  assert(welcome.includes('href="/strategy/"'), 'Welcome strategy CTA must use the business strategy shortlink');
  const download = welcome.match(/href="([^"]+\.pdf)" download="ai-strategy-starter\.pdf"/);
  assert(download, 'Welcome page must link to the downloadable PDF');
  assert.equal(download[1], '/files/ai-strategy-starter.pdf');
  const output = await readFile(`dist${download[1]}`);
  assert.equal(output.subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(output, await readFile('public/files/ai-strategy-starter.pdf'));
});

test('Guides retains its library and Guide is a real minimal campaign signup page', async () => {
  const guides = await readFile('dist/guides/index.html', 'utf8');
  assert(guides.includes('id="free-guide"'));
  assert(guides.includes('https://app.kit.com/forms/10053825/subscriptions'));
  assert(guides.includes('data-uid="1a8706f0e9"'));
  assert(guides.includes('https://f.convertkit.com/ckjs/ck.5.js'));
  assert(guides.includes('name="email_address"'));
  assert(guides.includes('Send me the guide'));
  assert.equal((guides.match(/<form\b/g) || []).length, 2);
  const guide = await readFile('dist/guide/index.html', 'utf8');
  assert(!guide.includes('http-equiv="refresh"'));
  assert(guide.includes('href="https://ipranjal.com/guide/"'));
  assert.match(guide, /<h1[^>]*>The AI Strategy Starter for Founders &(?:amp;)? Leaders<\/h1>/);
  assert(guide.includes('id="campaign-email"'));
  assert(guide.includes('https://app.kit.com/forms/10053825/subscriptions'));
  assert(guide.includes('campaign-author'));
  assert(!guide.includes('class="desktop-nav"'));
  assert(!guide.includes('class="mobile-nav"'));
  assert.equal((guide.match(/<form\b/g) || []).length, 1);
  assert(guides.includes('id="upcoming"'));
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
  for (const path of ['index.html', 'guide/index.html', 'kit/index.html', 'guides/index.html', 'business/index.html', 'individuals/index.html', 'writing/index.html', 'writing/why-ai-pilots-fail/index.html', 'writing/which-tasks-to-automate-with-ai/index.html']) {
    const html = await readFile(`dist/${path}`, 'utf8');
    assert(html.includes('href="https://pranjal-pandey.kit.com/9529f267b9"'));
    assert(html.includes('subscription-unavailable'));
    assert(html.includes('Open signup on Kit'));
    assert(html.includes('Use the Kit signup link above'));
    assert.match(html, /class="subscription-alternative" hidden/);
    assert(!html.includes('http-equiv="refresh"'));
  }
});

test('unpublished essays and provider confirmation pages stay out of the sitemap', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const path of ['/work/', '/links/', '/thanks/', '/welcome/', '/call/', '/session/', '/strategy/', '/career/', '/playbook/', '/newsletter/', '/files/ai-strategy-starter.pdf', '/files/personal-ai-starter-kit.pdf', '/files/practical-ai-free-guides.zip']) assert(!sitemap.includes(`<loc>https://ipranjal.com${path}</loc>`));
  assert(sitemap.includes('<loc>https://ipranjal.com/guide/</loc>'));
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
    assert(html.includes('id="article-email"'));
    assert(!html.includes('href="/guides/#free-guide"'));
    assert(html.includes('href="/business/"'));
    assert(archive.includes(`href="/writing/${slug}/"`));
    assert(home.includes(`href="/writing/${slug}/"`));
    assert(rss.includes(`<link>${url}</link>`));
    assert(sitemap.includes(`<loc>${url}</loc>`));
  }
  const allocation = await readFile('dist/writing/which-tasks-to-automate-with-ai/index.html', 'utf8');
  assert(allocation.includes('href="/call/"'));
  assert(!allocation.includes('href="https://ipranjal.com/session"'));
  assert(!allocation.includes('href="/session/"'));
});

test('press, privacy and research retain useful public content without defensive small print', async () => {
  const [press, privacy, research, thanks, welcome] = await Promise.all(
    ['press', 'privacy', 'research', 'thanks', 'welcome'].map(route => readFile(`dist/${route}/index.html`, 'utf8')),
  );
  assert(press.includes('id="short-bio"'));
  assert(press.includes('id="copy-bio"'));
  assert.match(press, /id="copy-bio-status" role="status"/);
  assert(privacy.includes('id="tracking-settings"'));
  assert(privacy.includes('G-TYBVMJLK06'));
  assert(privacy.includes("window._linkedin_partner_id = '10220252'"));
  assert(privacy.includes('id="tracking"'));
  assert(research.includes('>Preprint</span>'));
  assert(research.includes('Minimum Envy Graphical House Allocation Beyond Identical Valuations'));
  assert(!research.includes('Not a peer-review claim'));
  assert(!thanks.includes('Opening it alone'));
  assert(!welcome.includes("doesn't verify subscriber status"));
});

test('research lists all four verified preprints once, newest first, with authors and submission dates', async () => {
  const html = await readFile('dist/research/index.html', 'utf8');
  const entries = [...html.matchAll(/<article class="ledger-entry">([\s\S]*?)<\/article>/g)].map(match => match[1]);
  const papers = [
    ['2610.09610', 'Envy-free Allocations with Individual Payments', '2026-10-07', 'Robert Bredereck, Eva Deltl, Tanmay Inamdar, Pallavi Jain, Pranjal Pandey'],
    ['2609.28308', 'Envy-Free Allocation of Indivisible Goods under Leontief Preferences', '2026-09-23', 'Tanmay Inamdar, Pallavi Jain, Pranjal Pandey'],
    ['2608.30669', 'Reaching Fairness by Reallocating Goods', '2026-08-31', 'Robert Bredereck, Eva Deltl, Tanmay Inamdar, Pallavi Jain, Pranjal Pandey, Bin Sun'],
    ['2601.15864', 'Minimum Envy Graphical House Allocation Beyond Identical Valuations', '2026-01-22', 'Tanmay Inamdar, Pallavi Jain, Pranjal Pandey'],
  ];
  assert.equal(entries.length, papers.length);
  papers.forEach(([id, title, date, authors], index) => {
    assert(entries[index].includes(`href="https://arxiv.org/abs/${id}"`));
    assert(entries[index].includes(title));
    assert(entries[index].includes(`datetime="${date}"`));
    assert(entries[index].includes(authors));
    assert(entries[index].includes('>Preprint</span>'));
    assert(entries[index].includes('Submitted'));
  });
  assert(html.includes('https://scholar.google.com/citations?user=nFk7jM8AAAAJ'));
  assert(!html.includes('>Peer-reviewed</span>'));
});

test('writing banners are optimized across archive, homepage, essays and social metadata', async () => {
  const archive = await readFile('dist/writing/index.html', 'utf8');
  const home = await readFile('dist/index.html', 'utf8');
  assert(archive.includes('article-list writing-grid'));
  assert(home.includes('article-list writing-grid home-writing-grid'));
  assert.equal((archive.match(/class="writing-cover"/g) || []).length, 3);
  assert.equal((home.match(/class="writing-cover"/g) || []).length, 3);
  const socialImages = new Set();
  for (const slug of ['why-ai-pilots-fail', 'which-tasks-to-automate-with-ai', 'optimising-token-usage']) {
    const html = await readFile(`dist/writing/${slug}/index.html`, 'utf8');
    const banner = html.match(/<img\b[^>]*class="essay-banner"[^>]*>/)?.[0];
    assert(banner, `Missing banner for ${slug}`);
    assert.match(banner, /alt="[^"]+"/);
    assert.match(banner, /width="1280"/);
    assert.match(banner, /height="\d+"/);
    assert.match(banner, /loading="eager"/);
    assert.match(banner, /srcset="[^"]+400w[^"]+(?:1200|1280)w"/);
    const src = banner.match(/\bsrc="([^"]+)"/)?.[1];
    assert(src?.endsWith('.webp'));
    assert((await readFile(`dist${src}`)).length < 100_000);
    const social = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    assert(social?.includes(slug));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.image, social);
    socialImages.add(social);
  }
  assert.equal(socialImages.size, 3);
  assert(!existsSync('dist/which-task-you-should-automate.png'));
  assert(!existsSync('dist/why-ai-pilot-fail.png'));
});

test('token usage article is published first with supplied content, banner and one shared CTA', async () => {
  const slug = 'optimising-token-usage';
  const url = `https://ipranjal.com/writing/${slug}/`;
  const html = await readFile(`dist/writing/${slug}/index.html`, 'utf8');
  assert(html.match(/<title>(.*?)<\/title>/)[1].length <= 60);
  assert(html.match(/<meta name="description" content="([^"]+)"/)[1].length <= 155);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.datePublished, '2026-10-18T00:00:00.000Z');
  assert.equal(schema.url, url);
  for (const text of ['The input diet: lean-ctx', 'The output diet: Ponytail', 'A 30-minute token audit', '>FAQ</h2>', 'https://github.com/yvgude/lean-ctx', 'https://github.com/DietrichGebert/ponytail']) assert(html.includes(text), `Missing article content: ${text}`);
  assert(html.replace(/<[^>]*>/g, '').includes('lean-ctx wrap claude'));
  assert.equal((html.match(/<pre\b/g) || []).length, 2);
  assert.equal((html.match(/class="seva-form formkit-form"/g) || []).length, 1);
  assert(!html.includes('<hr'));
  for (const file of ['dist/writing/index.html', 'dist/index.html']) {
    const listing = await readFile(file, 'utf8');
    assert(listing.indexOf(`href="/writing/${slug}/"`) < listing.indexOf('href="/writing/which-tasks-to-automate-with-ai/"'));
  }
  const rss = await readFile('dist/rss.xml', 'utf8');
  assert(rss.includes(`<link>${url}</link>`));
  assert(rss.indexOf(`<link>${url}</link>`) < rss.indexOf('<link>https://ipranjal.com/writing/why-ai-pilots-fail/</link>'));
  assert((await readFile('dist/sitemap.xml', 'utf8')).includes(`<loc>${url}</loc>`));
});
