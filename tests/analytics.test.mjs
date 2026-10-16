import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile('src/components/Analytics.astro', 'utf8');
const script = source.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];

function runTracking({ pathname = '/', search = '', hostname = 'ipranjal.com', preference = null, storageError = false } = {}) {
  const scripts = [];
  const warnings = [];
  const handlers = {};
  class Element {
    constructor(link) { this.link = link; }
    closest() { return this.link; }
  }
  const window = {};
  runInNewContext(script, {
    window,
    location: { hostname, origin: `https://${hostname}`, pathname, search },
    localStorage: { getItem() { if (storageError) throw new Error('Storage unavailable'); return preference; } },
    document: {
      referrer: 'https://example.com/article/?email=private@example.com',
      createElement: () => ({}),
      head: { append: element => scripts.push(element) },
      addEventListener: (name, callback) => { handlers[name] = callback; },
    },
    console: { warn: message => warnings.push(message) },
    URL,
    URLSearchParams,
    Element,
  });
  return { window, scripts, warnings, handlers, click: link => handlers.click?.({ target: new Element(link) }) };
}

test('owner-supplied GA4, LinkedIn and Meta tags load by default only on the live domain', () => {
  const { window, scripts } = runTracking();
  assert.equal(scripts.length, 3);
  assert(scripts.some(script => script.src.includes('G-TYBVMJLK06')));
  assert(scripts.some(script => script.src === 'https://snap.licdn.com/li.lms-analytics/insight.min.js'));
  assert(scripts.some(script => script.src === 'https://connect.facebook.net/en_US/fbevents.js'));
  assert.equal(window.fbq.queue[0][1], 'autoConfig');
  assert.equal(window.fbq.queue[0][2], false);
  assert.equal(window.fbq.queue[1][0], 'init');
  assert.equal(window.fbq.queue[1][1], '1002800556174711');
  assert.equal(window.fbq.queue[2][1], 'PageView');
  assert(scripts.every(script => script.async));
  assert.equal(window._linkedin_partner_id, '10220252');
  const config = window.dataLayer.find(args => args[0] === 'config')[2];
  assert.equal(config.page_location, 'https://ipranjal.com/');
  assert.equal(config.page_referrer, 'https://example.com/article/');
  assert.equal(runTracking({ hostname: '127.0.0.1' }).scripts.length, 0);
  const campaignConfig = runTracking({ search: '?utm_source=linkedin&utm_medium=paid&utm_campaign=guide&email=private@example.com' }).window.dataLayer.find(args => args[0] === 'config')[2];
  assert.equal(campaignConfig.campaign_source, 'linkedin');
  assert.equal(campaignConfig.campaign_medium, 'paid');
  assert.equal(campaignConfig.campaign_name, 'guide');
  assert(!JSON.stringify(campaignConfig).includes('private@example.com'));
});

test('saved opt-out and inaccessible storage prevent all three tracking tags', () => {
  assert.equal(runTracking({ preference: 'disabled' }).scripts.length, 0);
  const result = runTracking({ storageError: true });
  assert.equal(result.scripts.length, 0);
  assert.equal(result.warnings.length, 1);
});

test('thanks and welcome are measured as funnel page views, not verified subscriptions', () => {
  for (const [pathname, event] of [['/thanks/', 'guide_signup_page_view'], ['/welcome/', 'guide_confirmation_page_view']]) {
    const { window } = runTracking({ pathname });
    const events = window.dataLayer.filter(args => args[0] === 'event');
    assert.equal(events.length, 1);
    assert.equal(events[0][1], event);
    assert(!events.some(args => args[1] === 'sign_up'));
  }
  assert(!runTracking().window.dataLayer.some(args => args[0] === 'event'));
});

test('guide choices and booking clicks emit explicit intent events without claiming completion', () => {
  const result = runTracking({ pathname: '/welcome/' });
  for (const guide of ['business', 'personal', 'both']) result.click({ dataset: { guide }, href: `https://ipranjal.com/files/${guide}.pdf` });
  for (const path of ['call', 'strategy', 'career']) result.click({ dataset: {}, href: `https://ipranjal.com/${path}/` });
  result.click({ dataset: {}, href: 'https://example.com/career/' });
  const events = result.window.dataLayer.filter(args => args[0] === 'event');
  assert.deepEqual(Array.from(events.filter(args => args[1] === 'download_guide'), args => args[2].guide), ['business', 'personal', 'both']);
  for (const event of ['intro_call_click', 'strategy_session_click', 'career_session_click']) assert.equal(events.filter(args => args[1] === event).length, 1);
  assert(!events.some(args => ['purchase', 'Schedule', 'sign_up'].includes(args[1])));
  assert.equal(Object.keys(runTracking({ preference: 'disabled' }).handlers).length, 0);
});
