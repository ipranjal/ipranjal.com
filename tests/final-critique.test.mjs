import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const signup = await readFile('src/components/Signup.astro', 'utf8');
const script = ts.transpileModule(signup.match(/<script>([\s\S]*?)<\/script>/)[1], {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

function signupHarness() {
  const observers = [];
  function element() {
    const attributes = new Map();
    return {
      hidden: true, focused: false, children: [], handlers: {}, style: {},
      classList: { add() {}, replace() {} },
      getClientRects: () => [{}],
      setAttribute: (key, value) => attributes.set(key, value),
      getAttribute: key => attributes.get(key),
      removeAttribute: key => attributes.delete(key),
      hasAttribute: key => attributes.has(key),
      addEventListener(name, handler) { this.handlers[name] = handler; },
      replaceChildren(...children) { this.children = children; },
      get childElementCount() { return this.children.length; },
      focus() { this.focused = true; },
    };
  }
  const errors = element(), submit = element(), input = element(), alternative = element();
  const unavailable = element(), link = element(), success = element(), form = element();
  input.validity = { valueMissing: false };
  form.hidden = false;
  form.closest = () => null;
  form.querySelector = selector => ({
    '[data-element="errors"]': errors, 'button[type="submit"]': submit, 'input[type="email"]': input,
  })[selector];
  alternative.querySelector = selector => selector === 'a' ? link : unavailable;
  form.parentElement = { querySelector: selector => selector === '.signup-success' ? success : alternative };
  runInNewContext(script, {
    document: { querySelectorAll: () => [form], createElement: element },
    window: { CK: {}, addEventListener() {}, setTimeout() {} },
    getComputedStyle: () => ({ visibility: 'visible' }),
    ResizeObserver: class { observe() {} },
    MutationObserver: class {
      constructor(callback) { this.callback = callback; }
      observe(target) { observers.push({ target, callback: this.callback }); }
    },
  });
  return { form, errors, submit, input, alternative, success, notify: target => {
    observers.filter(observer => observer.target === target).forEach(observer => observer.callback());
  } };
}

test('signup validates locally, recovers from errors and only shows success on Kit completion', () => {
  const state = signupHarness();
  let prevented = false;
  state.input.handlers.invalid({ preventDefault() { prevented = true; } });
  assert(prevented);
  assert.equal(state.errors.children[0].textContent, "That email doesn't look right.");
  assert.equal(state.input.getAttribute('aria-invalid'), 'true');
  state.input.handlers.input();
  assert.equal(state.errors.childElementCount, 0);
  assert.equal(state.input.hasAttribute('aria-invalid'), false);
  state.submit.setAttribute('data-active', 'true');
  state.notify(state.submit);
  assert.equal(state.form.getAttribute('aria-busy'), 'true');
  assert.equal(state.submit.disabled, true);
  state.submit.removeAttribute('data-active');
  state.notify(state.submit);
  assert.equal(state.submit.disabled, false);
  state.errors.replaceChildren({ textContent: 'Failed to fetch' });
  state.notify(state.errors);
  assert.equal(state.alternative.hidden, false);
  assert(state.errors.children[0].textContent.includes("Couldn't reach"));
  assert.equal(state.success.hidden, true);
  state.form.handlers['ckjs:submission:complete']();
  assert.equal(state.form.hidden, true);
  assert.equal(state.success.hidden, false);
  assert.equal(state.success.focused, true);
  assert.equal(state.alternative.hidden, true);
});

test('every signup shares the card, trust details and original confirmation destination', async () => {
  for (const route of ['index', 'guide/index', 'kit/index', 'guides/index', 'writing/index', 'writing/why-ai-pilots-fail/index']) {
    const html = await readFile(`dist/${route}.html`, 'utf8');
    assert(html.includes('signup signup-card'));
    assert(html.includes('class="signup-trust"'));
    assert(html.includes('class="sr-only"'));
    assert(html.includes('aria-describedby='));
    assert(html.includes('https://ipranjal.com/thanks/'));
    assert(html.includes('signup-success'));
  }
  const home = await readFile('dist/index.html', 'utf8');
  const guide = home.match(/<section[^>]*id="guide"[\s\S]*?<\/section>/)[0];
  assert.equal((guide.match(/<h2\b/g) || []).length, 1);
  assert(guide.includes('you@company.com'));
  const kit = await readFile('dist/kit/index.html', 'utf8');
  assert(kit.includes('you@email.com'));
  assert.equal((kit.match(/<h[12]\b/g) || []).length, 1);
});

test('homepage hides card dates without changing archive dates or hero image priority', async () => {
  const home = await readFile('dist/index.html', 'utf8');
  const archive = await readFile('dist/writing/index.html', 'utf8');
  const cards = [...home.matchAll(/<article\b[^>]*data-writing-audience[^>]*>[\s\S]*?<\/article>/g)];
  assert.equal(cards.length, 3);
  for (const card of cards) {
    assert(!card[0].includes('<time'));
    assert(card[0].includes('card writing-card'));
  }
  assert.equal((archive.match(/<time\b/g) || []).length, 3);
  const hero = home.match(/<section class="hero"[\s\S]*?<\/section>/)[0];
  assert(hero.includes('loading="eager"'));
  assert(hero.includes('fetchpriority="high"'));
  assert(!hero.includes('data-reveal'));
  assert(!(await readFile('src/scripts/home.ts', 'utf8')).includes("'.portrait-hero'"));
});
