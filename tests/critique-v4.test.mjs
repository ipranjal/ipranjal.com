import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const motion = await readFile('public/motion.js', 'utf8');

function runScorers(values) {
  const forms = values.map(([freq, check, risk]) => {
    const title = {}, description = {}, handlers = {}, styles = {};
    return {
      elements: Object.fromEntries(Object.entries({ freq, check, risk }).map(([name, value]) => [
        name, { value, style: { setProperty: (key, value) => { styles[`${name}:${key}`] = value; } } },
      ])),
      querySelector(selector) {
        if (selector === '[data-meter]') return { style: { setProperty: (key, value) => { styles[key] = value; } } };
        return { querySelector: selector => selector === 'strong' ? title : description };
      },
      addEventListener: (event, callback) => { handlers[event] = callback; },
      title, description, handlers, styles,
    };
  });
  runInNewContext(motion, {
    matchMedia: () => ({ matches: false }),
    document: {
      documentElement: { classList: { add() {} } },
      querySelector: () => null,
      querySelectorAll: selector => selector === '[data-scorer]' ? forms : [],
    },
    IntersectionObserver: class { observe() {} },
    setTimeout() {},
    addEventListener() {},
  });
  return forms;
}

test('scorer never trades away high stakes, rare tasks or hard-to-check results', () => {
  const values = [];
  for (let freq = 1; freq <= 5; freq++) {
    for (let check = 1; check <= 5; check++) {
      for (let risk = 1; risk <= 5; risk++) values.push([freq, check, risk]);
    }
  }
  const forms = runScorers(values);
  forms.forEach((form, index) => {
    const [freq, check, risk] = values[index];
    const expected = freq <= 2 || check <= 2 || risk >= 4 ? 'Keep it human (for now).'
      : freq >= 4 && check >= 4 && risk <= 2 ? 'Automate it.'
      : 'AI drafts, a person decides.';
    assert.equal(form.title.textContent, expected, `${freq}/${check}/${risk}`);
    assert(form.description.textContent.length > 20);
    const meter = Number(form.styles['--v']);
    assert(meter >= 0 && meter <= 1);
    if (expected.startsWith('Keep')) assert(meter < 1 / 3);
    if (expected.startsWith('Automate')) assert(meter > 2 / 3);
  });
});

test('scorers update independently and do not submit a form', () => {
  const [home, essay] = runScorers([[3, 3, 3], [5, 5, 1]]);
  home.elements.risk.value = 5;
  home.handlers.input();
  assert.equal(home.title.textContent, 'Keep it human (for now).');
  assert.equal(essay.title.textContent, 'Automate it.');
  assert.equal(home.styles['risk:--range-fill'], '100%');
  assert.equal(essay.styles['risk:--range-fill'], '0%');
  let prevented = false;
  home.handlers.submit({ preventDefault() { prevented = true; } });
  assert(prevented);
});

test('homepage has contained hero artwork, three illustrated proof cards and grouped guide content', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert(html.includes('class="wrap section-frame"'));
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
  assert(hero?.includes('hero-visual'));
  assert(!hero.includes('credentials chip-row'));
  assert(hero.includes('Founder, Taskflo AI'));
  assert(hero.includes('PhD researcher, IIT Jodhpur'));
  assert(hero.includes('button button-secondary'));
  const proof = html.match(/<section class="section proof-grid">([\s\S]*?)<\/section>/)?.[1];
  assert.equal((proof?.match(/class="card ledger-entry"/g) || []).length, 3);
  assert.equal((proof?.match(/<svg\b/g) || []).length, 3);
  const guide = html.match(/<section[^>]*id="guide"[\s\S]*?<\/section>/)?.[0];
  assert(guide?.includes('guide-covers'));
  assert.equal((guide.match(/<svg\b/g) || []).length, 2);
  assert(guide.includes('Here for yourself?'));
  const scorer = html.match(/<form class="scorer"[\s\S]*?<\/form>/)?.[0];
  assert(scorer?.includes('scorer-fields'));
  assert(scorer.includes('role="status"'));
  assert(scorer.includes('AI drafts, a person decides.'));
});

test('art-only previews retain full essay banners, metadata and concise card copy', async () => {
  const archive = await readFile('dist/writing/index.html', 'utf8');
  assert(archive.includes('<h1>Writing</h1>'));
  const images = [...archive.matchAll(/<img\b[^>]*class="writing-cover"[^>]*>/g)].map(match => match[0]);
  assert.equal(images.length, 3);
  for (const image of images) {
    assert.match(image, /height="720"/);
    assert.match(image, /src="[^"]*(?:optimising-token-usage-art|which-tasks-to-automate-with-ai-art|why-ai-pilots-fail-art)[^"]*\.webp"/);
  }
  for (const title of ['Optimising token usage', 'Which tasks should AI do?', 'Why AI pilots fail']) assert(archive.includes(title));
  for (const path of ['index', 'writing/which-tasks-to-automate-with-ai/index']) {
    const html = await readFile(`dist/${path}.html`, 'utf8');
    assert.equal((html.match(/data-scorer/g) || []).length, 1);
    assert(html.includes('aria-live="polite"'));
  }
});

test('all band pages use full-bleed tracks and native scrolling no longer includes Lenis', async () => {
  for (const route of ['index', 'business/index', 'individuals/index', 'about/index']) {
    const html = await readFile(`dist/${route}.html`, 'utf8');
    assert(html.includes('wrap section-frame'));
  }
  const home = await readFile('src/scripts/home.ts', 'utf8');
  const css = await readFile('src/styles/global.css', 'utf8');
  const manifest = JSON.parse(await readFile('package.json', 'utf8'));
  assert(!home.includes('Lenis'));
  assert(!home.includes('.method-map'));
  assert(!css.includes('lenis'));
  assert(!manifest.dependencies.lenis);
  assert(css.includes('.section-frame > .band { grid-column: 1 / -1;'));
});
