import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

test('research uses linked paper cards and Home provides direct research entry points', async () => {
  const [research, home] = await Promise.all(['dist/research/index.html', 'dist/index.html'].map(path => readFile(path, 'utf8')));
  assert(research.includes('class="research-grid"'));
  assert(!research.includes('class="reading"'));
  const cards = [...research.matchAll(/<a class="card research-card"([^>]*>[\s\S]*?)<\/a>/g)];
  assert.equal(cards.length, 4);
  cards.forEach(([card], index) => {
    assert(card.includes(`aria-labelledby="paper-title-${index}"`));
    assert(card.includes('<strong>Pranjal Pandey</strong>'));
    assert(card.includes('class="paper-summary"'));
    assert.equal((card.match(/<a\b/g) || []).length, 1);
  });
  assert(research.includes('Applied R&D for companies'));
  assert.match(home, /<a href="\/research\/">PhD researcher, IIT Jodhpur<\/a>/);
  assert.match(home, /<a href="\/research\/">multi-agent research<\/a>/);
  const card = home.match(/<a class="card ledger-entry" href="\/research\/">([\s\S]*?)<\/a>/)?.[1];
  assert(card?.match(/<svg[^>]*aria-hidden="true"/));
});

test('document pages align content and keep privacy controls and download gating', async () => {
  const [privacy, press, thanks, welcome] = await Promise.all(
    ['privacy', 'press', 'thanks', 'welcome'].map(route => readFile(`dist/${route}/index.html`, 'utf8')),
  );
  assert(privacy.includes('class="doc-layout"'));
  assert(privacy.includes('class="doc-toc"'));
  for (const id of ['reading-site', 'tracking', 'tracking-settings', 'guides-letter', 'bookings', 'email', 'changes']) {
    assert(privacy.includes(`href="#${id}"`));
    assert(privacy.includes(`id="${id}"`));
  }
  assert.match(privacy, /<input[^>]*type="checkbox"[^>]*role="switch"[^>]*disabled/);
  assert(!privacy.includes('type="radio"'));
  assert(!privacy.includes('Save tracking preference'));
  assert(!privacy.includes('anonymous page'));
  assert(press.includes('class="doc-layout press-layout"'));
  assert(press.includes('Quick facts'));
  assert.equal((press.match(/id="copy-bio"/g) || []).length, 1);
  for (const html of [thanks, welcome]) assert(html.includes('class="reading reading-start"'));
  assert(!thanks.includes('href="/welcome/"'));
  assert(!thanks.includes('href="/files/'));
});

test('tracking switch persists both states, reloads to apply and surfaces storage failures', async () => {
  const source = await readFile('src/scripts/tracking-settings.ts', 'utf8');
  const setup = ({ preference = null, readError = false, writeError = false } = {}) => {
    class HTMLInputElement {
      checked = false;
      disabled = true;
      handlers = {};
      addEventListener(name, handler) { this.handlers[name] = handler; }
    }
    const input = new HTMLInputElement();
    const status = { textContent: '' };
    const writes = [];
    const warnings = [];
    let reloads = 0;
    vm.runInNewContext(source, {
      HTMLInputElement,
      document: { getElementById: id => id === 'tracking-switch' ? input : status },
      localStorage: {
        getItem: () => { if (readError) throw new Error('blocked'); return preference; },
        setItem: (key, value) => { if (writeError) throw new Error('quota'); writes.push([key, value]); },
      },
      location: { reload: () => reloads++ },
      console: { warn: (...args) => warnings.push(args) },
    });

    return { input, status, writes, warnings, reloads: () => reloads };
  };
  for (const preference of [null, 'enabled', 'disabled']) {
    const state = setup({ preference });
    assert.equal(state.input.disabled, false);
    assert.equal(state.input.checked, preference !== 'disabled');
    state.input.checked = !state.input.checked;
    state.input.handlers.change();
    assert.deepEqual(state.writes, [['site-tracking', preference === 'disabled' ? 'enabled' : 'disabled']]);
    assert.equal(state.reloads(), 1);
    assert.match(state.status.textContent, /^Saved\./);
  }
  const blocked = setup({ readError: true });
  assert.equal(blocked.input.disabled, true);
  assert.equal(blocked.input.checked, false);
  assert.match(blocked.status.textContent, /storage is unavailable/);
  assert.equal(blocked.warnings.length, 1);
  for (const preference of ['enabled', 'disabled']) {
    const failed = setup({ preference, writeError: true });
    failed.input.checked = !failed.input.checked;
    failed.input.handlers.change();
    assert.equal(failed.input.checked, preference === 'enabled');
    assert.equal(failed.reloads(), 0);
    assert.equal(failed.warnings.length, 1);
    assert.match(failed.status.textContent, /could not be saved/);
  }
});

test('privacy contents follows section position when scrolling in either direction', async () => {
  const motion = await readFile('public/motion.js', 'utf8');
  const source = motion.slice(motion.indexOf('const toc ='), motion.indexOf('// 4)'));
  const sections = ['reading-site', 'tracking', 'tracking-settings'].map((id, i) => ({
    id, top: i * 400, getBoundingClientRect() { return { top: this.top }; },
  }));
  const links = sections.map(section => ({
    hash: `#${section.id}`, current: false,
    setAttribute() { this.current = true; },
    removeAttribute() { this.current = false; },
  }));
  const handlers = {};
  const observed = [];
  let intersection;
  vm.runInNewContext(source, {
    document: {
      querySelector: () => ({ querySelectorAll: () => links }),
      getElementById: id => sections.find(section => section.id === id),
    },
    IntersectionObserver: class {
      constructor(callback) { intersection = callback; }
      observe(section) { observed.push(section.id); }
    },
    addEventListener: (name, callback) => { handlers[name] = callback; },
  });
  assert.deepEqual(observed, sections.map(section => section.id));
  assert.deepEqual(links.map(link => link.current), [true, false, false]);
  sections.forEach((section, i) => { section.top = i * 400 - 400; });
  intersection();
  assert.deepEqual(links.map(link => link.current), [false, true, false]);
  sections.forEach((section, i) => { section.top = i * 400 - 800; });
  handlers.scroll();
  assert.deepEqual(links.map(link => link.current), [false, false, true]);
  sections.forEach((section, i) => { section.top = i * 400; });
  handlers.scroll();
  assert.deepEqual(links.map(link => link.current), [true, false, false]);
});
