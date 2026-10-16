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
  for (const offer of ['AI Workflow Audit', 'AI Strategy Planning', 'Leadership AI workshop', 'Build it with me', 'Fractional AI advisor', 'Applied R&amp;D', 'AI Career &amp; Portfolio Kickstart']) {
    assert(business.includes(offer) || business.includes(offer.replaceAll('&amp;', '&')), `Missing migrated offer: ${offer}`);
  }
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
