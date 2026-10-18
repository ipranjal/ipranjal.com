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
    if (ind) { ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft}px)`; }
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
      e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true);
    });
  });
  select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  addEventListener('resize', () => select(tabs.find(t => t.getAttribute('aria-selected') === 'true')));
});

// 5) "Should AI do this task?" scorer. Markup: <form data-scorer> with range inputs named freq, check, risk + [data-verdict]
document.querySelectorAll('[data-scorer]').forEach(form => {
  const out = form.querySelector('[data-verdict]'), meter = form.querySelector('[data-meter]');
  const update = () => {
    const v = n => +form.elements[n].value;               // each 1–5
    const score = v('freq') * 2 + v('check') * 2 - v('risk') * 2.2;   // roughly −7 … 17
    const pct = Math.max(0, Math.min(1, (score + 7) / 24));
    let verdict;
    if (score >= 9) verdict = ['Automate it', 'Frequent, easy to check, low risk. A great first AI workflow.'];
    else if (score >= 3) verdict = ['AI drafts, a person decides', 'Let AI do the first pass and keep a human review step.'];
    else verdict = ['Keep it human (for now)', 'Rare, hard to check or high-stakes. Use AI for prep, not decisions.'];
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
