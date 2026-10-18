// ipranjal.com motion and interactivity (v3). No dependencies, about 3 KB.
// Load once on every page as a module script: /motion.js (type="module").
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

// 1) Reveal on scroll, with stagger inside groups ([data-reveal-group] > [data-reveal])
document.querySelectorAll('[data-reveal-group]').forEach(g =>
  g.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--i', i)));
const revealIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); }
}), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
document.querySelectorAll('[data-reveal]').forEach(el => reduce ? el.classList.add('is-in') : revealIO.observe(el));
// Safety net: never leave content hidden
setTimeout(() => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
  if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in');
}), 1200);

// 2) Pause illustration loops when off-screen (saves battery, calm)
const pauseIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-paused', !e.isIntersecting)));
document.querySelectorAll('svg.illus').forEach(s => pauseIO.observe(s));

// 3) Header gets elevation once you scroll
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

const toc = document.querySelector('.doc-toc');
if (toc) {
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const updateCurrent = () => {
    const current = sections.filter(section => section.getBoundingClientRect().top <= 160).at(-1) || sections[0];
    links.forEach(link => {
      if (link.hash === `#${current?.id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  const tocIO = new IntersectionObserver(updateCurrent, { rootMargin: '-120px 0px -60% 0px', threshold: 0 });
  sections.forEach(section => tocIO.observe(section));
  addEventListener('scroll', updateCurrent, { passive: true });
  updateCurrent();
}

// 4) Tabs with sliding indicator (Fluent TabList). Markup:
// <div class="tablist" role="tablist"><button class="tab" role="tab" aria-controls="p1">…</button>…<span class="tab-indicator"></span></div>
document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const ind = list.querySelector('.tab-indicator');
  const select = (t, focus) => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
      const p = document.getElementById(x.getAttribute('aria-controls')); if (p) p.hidden = !on;
    });
    if (ind) ind.style.transform = `translateX(${t.offsetLeft}px) scaleX(${t.offsetWidth})`;
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!k && e.key !== 'Home' && e.key !== 'End') return;
      e.preventDefault();
      select(tabs[e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + k + tabs.length) % tabs.length], true);
    });
  });
  select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  addEventListener('resize', () => select(tabs.find(t => t.getAttribute('aria-selected') === 'true')));
});

// Navigation filters keep native link/history behavior while sharing the TabList treatment.
document.querySelectorAll('[data-link-tabs]').forEach(list => {
  const links = [...list.querySelectorAll('a.tab')];
  const indicator = list.querySelector('.tab-indicator');
  if (!links.length || !indicator) return;
  const sync = () => {
    const current = links.find(link => link.hasAttribute('aria-current'));
    if (!current || !current.offsetWidth) return;
    indicator.style.transform = `translateX(${current.offsetLeft}px) scaleX(${current.offsetWidth})`;
    list.setAttribute('data-tabs-ready', '');
  };
  links.forEach((link, index) => link.addEventListener('keydown', event => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    list.setAttribute('data-keyboard-nav', '');
    const next = links[event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (index + step + links.length) % links.length];
    next.focus();
    next.click();
  }));
  list.addEventListener('pointerdown', () => list.removeAttribute('data-keyboard-nav'));
  new MutationObserver(sync).observe(list, { subtree: true, attributes: true, attributeFilter: ['aria-current', 'hidden'] });
  new ResizeObserver(sync).observe(list);
  document.fonts.ready.then(sync);
  sync();
});

// 5) "Should AI do this task?" scorer. Markup: <form data-scorer> with range inputs named freq, check, risk + [data-verdict]
document.querySelectorAll('[data-scorer]').forEach(form => {
  const out = form.querySelector('[data-verdict]'), meter = form.querySelector('[data-meter]');
  const update = () => {
    const v = n => +form.elements[n].value;
    const freq = v('freq'), check = v('check'), risk = v('risk');
    ['freq', 'check', 'risk'].forEach(name => {
      const input = form.elements[name];
      input.style.setProperty('--range-fill', `${(v(name) - 1) * 25}%`);
    });
    let verdict, pct;
    // Frequency must never outweigh high stakes or a result that is hard to check.
    if (freq <= 2 || check <= 2 || risk >= 4) {
      verdict = ['Keep it human (for now).', 'Rare, hard to check or high-stakes. Use AI for prep, not decisions.'];
      pct = .15;
    } else if (freq >= 4 && check >= 4 && risk <= 2) {
      verdict = ['Automate it.', 'Frequent, easy to check, low risk. A great first AI workflow.'];
      pct = .9;
    } else {
      verdict = ['AI drafts, a person decides.', 'Let AI do the first pass and keep a human review step.'];
      pct = .5;
    }
    out.querySelector('strong').textContent = verdict[0];
    out.querySelector('span').textContent = verdict[1];
    if (meter) meter.style.setProperty('--v', pct.toFixed(3));
  };
  form.addEventListener('input', update); form.addEventListener('submit', e => e.preventDefault()); update();
});

// 6) Essay reading progress (add <div class="read-progress"></div> to essay pages)
const bar = document.querySelector('.read-progress');
if (bar) {
  const art = document.querySelector('article') || document.body;
  const upd = () => {
    const r = art.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    bar.style.setProperty('--p', p.toFixed(4));
  };
  addEventListener('scroll', upd, { passive: true }); upd();
}
