import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

test('homepage Taskflo callout sits inside blockers and links to the full Business section', async () => {
  const home = await readFile('dist/index.html', 'utf8');
  const start = home.indexOf('class="tf-callout"');
  assert(start > home.indexOf('Why pilots stall'));
  assert(start < home.indexOf('id="method"'));
  const panel = home.slice(start, home.indexOf('</aside>', start));
  assert(panel.includes('illus-taskflo-flow'));
  assert.equal((panel.match(/data-taskflo=/g) || []).length, 1);
  for (const text of [
    'Taskflo AI, the trust layer for enterprise AI agents.',
    'Agents that run in your cloud, use only approved tools, and log every action.',
  ]) assert(panel.includes(text), text);
  assert(panel.includes('href="/business/#taskflo"'));
  assert(panel.includes('data-taskflo-location="home"'));
  assert(start < home.indexOf('</section>', home.indexOf('Why pilots stall')));
  assert(!panel.includes('tf-points'));
  assert(!panel.includes('tf-bounds'));
  assert(!panel.includes('<dd>'));
  const proof = home.match(/<section class="section proof-grid">([\s\S]*?)<\/section>/)?.[1];
  assert.match(proof, /AI strategy for founders &(?:amp;)? leaders/);
  assert(!proof.includes('Explore Taskflo AI'));
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of panel.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(match[1]));
});

test('Individuals kit preview is a separate illustrated section before the services', async () => {
  const html = await readFile('dist/individuals/index.html', 'utf8');
  const start = html.indexOf('class="section kit-preview"');
  assert(start > html.indexOf('</header>', html.indexOf('individual-opening')));
  assert(start < html.indexOf('Three ways I can help'));
  const preview = html.slice(start, html.indexOf('</section>', start));
  assert.equal((preview.match(/class="card kit-card"/g) || []).length, 3);
  assert.equal((preview.match(/<svg\b/g) || []).length, 3);
  for (const text of ['Plan your week', 'Prep any meeting', 'The weekly review', 'Get the free kit']) {
    assert(preview.includes(text));
  }
  assert(preview.includes('href="/kit/"'));
  assert(!html.includes('workflow-note'));
  const welcome = await readFile('dist/welcome/index.html', 'utf8');
  assert(welcome.includes('class="eyebrow">For your business'));
  assert(welcome.includes('class="eyebrow">For you'));
  const css = await readFile('src/styles/global.css', 'utf8');
  assert(css.includes('--border: var(--stroke-1)'));
  assert(!css.includes('.workflow-note'));
  assert(!/border[^;{}]*?(?:#9da7ba|var\(--(?:muted|fog|secondary)\))/i.test(css));
  assert(css.includes('.download-card:hover'));
});

test('Business keeps full Taskflo detail after the method and before the FAQ', async () => {
  const home = await readFile('dist/index.html', 'utf8');
  const business = await readFile('dist/business/index.html', 'utf8');
  const showcase = html => html.match(/<section class="section taskflo-showcase band"[\s\S]*?<\/section>/)?.[0];
  const panel = showcase(business);
  assert(panel);
  assert.equal((business.match(/class="section taskflo-showcase band"/g) || []).length, 1);
  assert(business.indexOf(panel) > business.indexOf('Permissions are an afterthought.'));
  assert(business.indexOf(panel) > business.indexOf('class="section method-section"'));
  assert(business.indexOf(panel) < business.indexOf('A useful fit matters.'));
  assert(!showcase(home));
  assert(panel.includes('id="taskflo"'));
  assert(panel.includes('data-taskflo-location="business"'));
  assert(panel.includes("whether or not that&#39;s Taskflo") || panel.includes("whether or not that's Taskflo"));
  assert(panel.includes('/resources/ai-agent-approval-playbook'));
  assert(panel.includes('illus-taskflo-flow'));
  assert.equal((panel.match(/<dd>/g) || []).length, 4);
  assert(panel.includes('$2.50'));
  assert.equal((panel.match(/class="tf-check"/g) || []).length, 3);
  assert(panel.includes('data-taskflo="visit"'));
  assert(panel.includes('href="/call/" data-taskflo="workflow"'));
  assert(panel.includes('not a customer result.'));
});

test('link filters share an indicator and support keyboard, resize and URL-driven selection', async () => {
  const source = await readFile('public/motion.js', 'utf8');
  const observations = [];
  const lists = [2, 3].map(count => {
    const indicator = { style: {} };
    const links = Array.from({ length: count }, (_, index) => ({
      selected: index === 0, offsetLeft: index * 100, offsetWidth: 96, handlers: {},
      hasAttribute() { return this.selected; },
      addEventListener(event, callback) { this.handlers[event] = callback; },
      focus() { this.focused = true; },
      click() { links.forEach(link => { link.selected = link === this; }); },
    }));
    return { links, indicator, ready: false, handlers: {},
      querySelectorAll: () => links, querySelector: () => indicator,
      setAttribute(name) { this[name] = true; if (name === 'data-tabs-ready') this.ready = true; },
      removeAttribute(name) { delete this[name]; },
      addEventListener(event, callback) { this.handlers[event] = callback; },
    };
  });
  runInNewContext(source, {
    matchMedia: () => ({ matches: true }),
    document: {
      documentElement: { classList: { add() {} } }, querySelector: () => null,
      querySelectorAll: selector => selector === '[data-link-tabs]' ? lists : [],
      fonts: { ready: Promise.resolve() },
    },
    IntersectionObserver: class { observe() {} },
    MutationObserver: class { constructor(callback) { observations.push(callback); } observe() {} },
    ResizeObserver: class { constructor(callback) { observations.push(callback); } observe() {} },
    addEventListener() {}, setTimeout() {},
  });
  const [first, second] = lists;
  assert(first.ready);
  assert.equal(first.indicator.style.transform, 'translateX(0px) scaleX(96)');
  for (const [key, from, to] of [['ArrowRight', 0, 1], ['ArrowRight', 1, 0], ['ArrowLeft', 0, 1], ['Home', 1, 0], ['End', 0, 1]]) {
    let prevented = false;
    first.links[from].handlers.keydown({ key, preventDefault() { prevented = true; } });
    observations.forEach(sync => sync());
    assert(prevented);
    assert(first.links[to].selected && first.links[to].focused);
    assert(first['data-keyboard-nav']);
    assert.equal(first.indicator.style.transform, `translateX(${to * 100}px) scaleX(96)`);
    assert(second.links[0].selected);
  }
  first.handlers.pointerdown();
  assert(!first['data-keyboard-nav']);
  first.links.forEach((link, index) => { link.selected = index === 0; });
  first.links[0].offsetWidth = 120;
  observations.forEach(sync => sync());
  assert.equal(first.indicator.style.transform, 'translateX(0px) scaleX(120)');
  for (const route of ['guides', 'writing']) {
    const html = await readFile(`dist/${route}/index.html`, 'utf8');
    assert(html.includes('data-link-tabs'));
    assert(html.includes('tab-indicator'));
    const source = await readFile(`src/pages/${route === 'writing' ? 'writing/index' : 'guides'}.astro`, 'utf8');
    assert(source.includes("setAttribute('aria-current', 'page')"));
  }
});

test('both Taskflo actions emit one GA4 event without losing booking tracking', async () => {
  const source = await readFile('src/components/Analytics.astro', 'utf8');
  const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
  const handlers = {};
  const window = {};
  class Element {
    constructor(href, dataset = {}) { this.href = href; this.dataset = dataset; }
    closest() { return this; }
  }
  runInNewContext(script, {
    window, Element, URL, URLSearchParams,
    location: { hostname: 'ipranjal.com', origin: 'https://ipranjal.com', pathname: '/', search: '' },
    localStorage: { getItem: () => null },
    document: { referrer: '', head: { append() {} }, createElement: () => ({}),
      addEventListener(event, callback) { handlers[event] = callback; } },
  });
  handlers.click({ target: new Element('https://taskflo.ai', { taskflo: 'visit', taskfloLocation: 'home' }) });
  handlers.click({ target: new Element('https://ipranjal.com/call/', { taskflo: 'workflow', taskfloLocation: 'business' }) });
  handlers.click({ target: new Element('https://ipranjal.com/business/') });
  const events = window.dataLayer.map(args => Array.from(args)).filter(args => args[0] === 'event');
  assert.equal(events.filter(args => args[1] === 'taskflo_click').length, 2);
  assert.equal(events.find(args => args[2]?.action === 'visit')?.[1], 'taskflo_click');
  assert.equal(events.find(args => args[2]?.action === 'workflow')?.[1], 'taskflo_click');
  assert.equal(events.find(args => args[2]?.action === 'visit')?.[2].location, 'home');
  assert.equal(events.find(args => args[2]?.action === 'workflow')?.[2].location, 'business');
  assert.equal(events.filter(args => args[1] === 'intro_call_click').length, 1);
});

test('guide filters preserve focus and scroll while updating hashes and responding to history', async () => {
  const source = await readFile('src/pages/guides.astro', 'utf8');
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  const choices = ['business', 'individuals'].map((audience, index) => ({
    dataset: { guideChoice: audience }, href: index ? '#individual-guides' : '#business-guides',
    current: false, handlers: {},
    setAttribute() { this.current = true; }, removeAttribute() { this.current = false; },
    addEventListener(event, callback) { this.handlers[event] = callback; },
  }));
  const panels = choices.map(choice => ({ dataset: { audiencePanel: choice.dataset.guideChoice }, hidden: false }));
  const location = { hash: '#business-guides' };
  const events = {};
  let saved;
  runInNewContext(script.replaceAll(/<HTMLAnchorElement>|<HTMLElement>/g, ''), {
    document: { querySelectorAll: selector => selector === '[data-guide-choice]' ? choices : panels },
    location, localStorage: { getItem: () => saved, setItem(_key, value) { saved = value; } },
    history: { pushState(_state, _title, href) { location.hash = href; } },
    window: { addEventListener(event, callback) { events[event] = callback; } }, console,
  });
  assert(choices[0].current);
  let prevented = false;
  choices[1].handlers.click({ button: 0, preventDefault() { prevented = true; } });
  assert(prevented, 'prevent native hash scrolling and focus transfer');
  assert.equal(location.hash, '#individual-guides');
  assert(choices[1].current && panels[0].hidden && !panels[1].hidden);
  location.hash = '#business-guides';
  events.popstate();
  assert(choices[0].current && !panels[0].hidden && panels[1].hidden);
  prevented = false;
  choices[1].handlers.click({ button: 0, metaKey: true, preventDefault() { prevented = true; } });
  assert(!prevented);
  assert.equal(location.hash, '#business-guides');
});
