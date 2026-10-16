import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

test('business migration keeps a noindex compatibility route and new audience pages are indexable', async () => {
  const work = await readFile('dist/work/index.html', 'utf8');
  assert(work.includes('0;url=/business/'));
  assert(work.includes('noindex,follow'));
  const images = new Set();
  for (const path of ['business', 'individuals', 'kit']) {
    const html = await readFile(`dist/${path}/index.html`, 'utf8');
    assert(html.includes(`rel="canonical" href="https://ipranjal.com/${path}/"`));
    assert(!html.includes('noindex,follow'));
    const image = html.match(/property="og:image" content="https:\/\/ipranjal.com([^"]+)"/)?.[1];
    assert(image?.endsWith('.png'));
    const bytes = await readFile(`dist${image}`);
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    images.add(image);
  }
  assert.equal(images.size, 3);
  const business = await readFile('dist/business/index.html', 'utf8');
  for (const offer of ['AI Workflow Audit', 'AI Strategy Planning', 'Leadership AI workshop', 'Build it with me', 'Fractional AI advisor', 'Applied R&amp;D']) {
    assert(business.includes(offer) || business.includes(offer.replaceAll('&amp;', '&')), `Missing migrated offer: ${offer}`);
  }
  assert(!business.includes('AI Career &amp; Portfolio Kickstart'));
  assert(!business.includes('href="/career/"'));
  const individuals = await readFile('dist/individuals/index.html', 'utf8');
  assert.match(individuals, /AI Career &(?:amp;)? Portfolio Kickstart/);
});

test('critique fixes keep one concise, audience-matched form and one essay CTA block', async () => {
  for (const [path, button] of [['index', 'Send me the guide'], ['guides/index', 'Send me the guide'], ['guide/index', 'Send me the guide'], ['kit/index', 'Send me the kit'], ['writing/index', 'Subscribe']]) {
    const html = await readFile(`dist/${path}.html`, 'utf8');
    assert(html.includes(`<span>${button}</span>`), `Wrong signup action on ${path}`);
    assert(html.includes('one email a month. Unsubscribe anytime.'));
    assert(!html.includes('Email powered by'));
    assert(!html.includes('Need help getting the guides?'));
  }
  const home = await readFile('dist/index.html', 'utf8');
  const hero = home.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
  assert(hero?.includes('href="#guide"'));
  for (const slug of ['why-ai-pilots-fail', 'which-tasks-to-automate-with-ai']) {
    const html = await readFile(`dist/writing/${slug}/index.html`, 'utf8');
    assert(!html.includes('<hr'));
    assert(!html.includes('Want a structured way'));
    assert(!html.includes('Want a step-by-step way'));
    const cta = html.match(/<aside class="essay-subscribe[\s\S]*?<\/aside>/)?.[0];
    assert(cta?.includes('id="article-email"'));
    assert(cta.includes('Get the AI Strategy Starter.'));
    assert(cta.includes('Send me the guide'));
    assert.equal((cta.match(/href="\/call\/"/g) || []).length, 1);
    assert(!cta.includes('href="/guide/"'), 'Inline form must not repeat a separate guide CTA');
    assert(!cta.includes('mailto:'));
    assert.equal((html.match(/class="seva-form formkit-form"/g) || []).length, 1);
  }
});

test('empty audiences stay out of discovery while existing routes and dates remain', async () => {
  const individuals = await readFile('dist/individuals/index.html', 'utf8');
  assert(!individuals.includes('From the writing.'));
  assert(!individuals.includes('/writing/?audience=individuals'));
  assert(!individuals.includes('Where can I check session terms?'));
  assert(individuals.includes('Price and booking on Topmate.'));
  const writing = await readFile('dist/writing/index.html', 'utf8');
  const select = writing.match(/<select id="writing-audience"[\s\S]*?<\/select>/)?.[0];
  assert(select?.includes('value="business"'));
  assert(!select.includes('value="individuals"'));
  assert(!select.includes('value="research"'));
  assert(!individuals.includes('On the writing desk.'));
  const guides = await readFile('dist/guides/index.html', 'utf8');
  assert(!guides.includes('On the writing desk.'));
  const business = await readFile('dist/business/index.html', 'utf8');
  assert.equal((business.match(/Every engagement is scoped with you first./g) || []).length, 1);
  assert(business.includes('What results can we expect?'));
  const guide = await readFile('dist/guide/index.html', 'utf8');
  assert.match(guide, /<title>Free AI Strategy Starter for Founders &(?:amp;)? Leaders \| Pranjal Pandey<\/title>/);
  const research = await readFile('dist/research/index.html', 'utf8');
  assert(!research.includes('See the paper for'));
  assert(!research.includes('private drafts'));
  assert(research.includes('reduce envy between neighbours'));
});

test('single shared Kit identity serves the kit, business, individuals, writing and footer', async () => {
  for (const audience of ['kit', 'guide', 'business', 'individuals']) {
    for (const step of ['thanks', 'welcome']) assert(!existsSync(`dist/${audience}/${step}/index.html`), `Do not create a separate ${audience} ${step} page`);
  }
  for (const path of ['kit', 'business', 'individuals', 'guides', 'writing', 'about']) {
    const html = await readFile(`dist/${path}/index.html`, 'utf8');
    assert.equal((html.match(/class="seva-form formkit-form"/g) || []).length, 1, `Duplicate Kit form on ${path}`);
    assert(html.includes('data-sv-form="10053825"'));
    assert(html.includes('data-uid="1a8706f0e9"'));
    assert(html.includes('https://ipranjal.com/thanks/'));
    assert(!html.includes('name="tags'));
  }
  const kit = await readFile('dist/kit/index.html', 'utf8');
  assert(kit.includes('Send me the kit'));
  assert(!kit.includes('<header class="site-header"'));
  assert(!kit.includes('class="desktop-nav"'));
  const individuals = await readFile('dist/individuals/index.html', 'utf8');
  assert.match(individuals, /class="header-cta" href="\/kit\/">Get the free kit/);
});

test('guide picker offers byte-identical PDFs and a current two-file ZIP, only after confirmation directions', async () => {
  const welcome = await readFile('dist/welcome/index.html', 'utf8');
  const thanks = await readFile('dist/thanks/index.html', 'utf8');
  for (const [guide, file] of [['business', 'ai-strategy-starter.pdf'], ['personal', 'personal-ai-starter-kit.pdf'], ['both', 'practical-ai-free-guides.zip']]) {
    assert(welcome.includes(`data-guide="${guide}"`));
    assert(welcome.includes(`href="/files/${file}"`));
    assert(!thanks.includes(`/files/${file}`));
  }
  const archive = 'dist/files/practical-ai-free-guides.zip';
  const names = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n').sort();
  assert.deepEqual(names, ['ai-strategy-starter.pdf', 'personal-ai-starter-kit.pdf']);
  for (const name of names) {
    const original = await readFile(`public/files/${name}`);
    assert.equal(original.subarray(0, 5).toString(), '%PDF-');
    assert.deepEqual(await readFile(`dist/files/${name}`), original);
    assert.deepEqual(execFileSync('unzip', ['-p', archive, name], { maxBuffer: 10_000_000 }), original);
  }
});

test('audience chooser, guides navigation, writing labels and links groups use real destinations', async () => {
  const home = await readFile('dist/index.html', 'utf8');
  assert(home.indexOf('id="chooser-title"') > home.indexOf('id="hero-title"'));
  assert(home.indexOf('id="chooser-title"') < home.indexOf('class="credentials"'));
  for (const path of ['/business/', '/individuals/', '/kit/']) assert(home.includes(`href="${path}"`));
  const guides = await readFile('dist/guides/index.html', 'utf8');
  assert(guides.includes('id="business-guides" data-audience-panel="business"'));
  assert(guides.includes('id="individual-guides" data-audience-panel="individuals"'));
  const writing = await readFile('dist/writing/index.html', 'utf8');
  assert(writing.includes('id="writing-audience"'));
  assert(writing.includes('id="filter-empty" hidden'));
  assert.equal((writing.match(/data-writing-audience="business"/g) || []).length, 2);
  const links = await readFile('dist/links/index.html', 'utf8');
  assert(links.indexOf('<h2>For you') < links.indexOf('<h2>For your company'));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const path of ['/business/', '/individuals/', '/kit/']) assert(sitemap.includes(`<loc>https://ipranjal.com${path}</loc>`));
});
