(function () {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.site-header');
  const video = document.querySelector('#hero-video');
  const media = document.querySelector('.hero-media');
  const bands = [...document.querySelectorAll('.hero-band')];
  const count = document.querySelector('#hero-count');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let targetTime = 0;
  let shownTime = 0;
  let seeking = false;
  let lastBand = -1;
  let lastRender = performance.now();
  let renderFrameId = 0;
  let heroVisible = true;

  function markVideoReady() {
    if (video.readyState >= 2) {
      media.classList.add('video-ready');
      media.classList.remove('video-error');
    }
  }

  video.addEventListener('loadedmetadata', markVideoReady);
  video.addEventListener('loadeddata', markVideoReady);
  video.addEventListener('canplay', markVideoReady);
  video.addEventListener('error', () => media.classList.add('video-error'));

  function updateHero() {
    const maxScroll = Math.max(1, hero.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / maxScroll));
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 6;
    targetTime = progress * duration;
    const bandIndex = Math.min(bands.length - 1, Math.floor(progress * bands.length));
    if (bandIndex !== lastBand) {
      bands.forEach((band, index) => {
        const active = index === bandIndex;
        band.classList.toggle('is-active', active);
        band.style.visibility = active ? 'visible' : 'hidden';
      });
      count.textContent = String(bandIndex + 1).padStart(2, '0');
      lastBand = bandIndex;
    }
    requestRender();
  }

  function readScrollY() {
    const scrollingElement = document.scrollingElement || document.documentElement;
    return Math.max(window.scrollY || 0, scrollingElement.scrollTop || 0, document.body.scrollTop || 0);
  }

  function updateHeader() {
    if (!header || reduceMotion) return;
    header.classList.toggle('is-hidden', readScrollY() > 24);
  }

  function syncMotion() {
    updateHero();
    updateHeader();
  }

  function seekToShownTime() {
    if (seeking || video.readyState < 1 || Math.abs(video.currentTime - shownTime) <= 0.035) return;
    seeking = true;
    video.currentTime = shownTime;
  }

  video.addEventListener('seeked', () => {
    seeking = false;
    requestRender();
  });

  function renderFrame(now) {
    renderFrameId = 0;
    const deltaTime = Math.min(0.05, (now - lastRender) / 1000);
    lastRender = now;
    const delta = targetTime - shownTime;
    const smoothing = reduceMotion ? 1 : 1 - Math.pow(0.0001, deltaTime);
    shownTime += delta * smoothing;
    seekToShownTime();
    if (heroVisible && Math.abs(targetTime - shownTime) > 0.002) requestRender();
  }

  function requestRender() {
    if (heroVisible && !renderFrameId) renderFrameId = requestAnimationFrame(renderFrame);
  }

  window.addEventListener('scroll', syncMotion, { passive: true });
  document.addEventListener('scroll', syncMotion, { passive: true });
  window.addEventListener('resize', syncMotion);
  window.addEventListener('orientationchange', syncMotion);
  window.addEventListener('pageshow', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);

  // Scroll events are throttled or dropped by some browsers and bfcache restores; compare the position every frame instead.
  let watchedScrollY = -1;
  (function watchScroll() {
    const currentScrollY = readScrollY();
    if (currentScrollY !== watchedScrollY) {
      watchedScrollY = currentScrollY;
      syncMotion();
    }
    window.requestAnimationFrame(watchScroll);
  }());
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (heroVisible) requestRender();
    else if (renderFrameId) cancelAnimationFrame(renderFrameId);
  }).observe(hero);
  updateHero();
  updateHeader();
  requestRender();

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  document.querySelectorAll('.story .timeline-item').forEach((item, index) => {
    item.style.setProperty('--timeline-index', index);
    revealObserver.observe(item);
  });


  const timeline = document.querySelector('#story .timeline');
  if (timeline) {
    const items = [...timeline.querySelectorAll('.timeline-item')];
    let selectedItem = items.find((item) => item.classList.contains('is-current')) || items[0];
    const selectMoment = (item) => {
      selectedItem = item;
      items.forEach((candidate) => {
        const selected = candidate === item;
        candidate.classList.toggle('is-selected', selected);
        candidate.setAttribute('aria-pressed', String(selected));
      });
    };
    items.forEach((item) => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      if (item.querySelector('a, button, input, textarea, select, [role="button"]')) {
        item.setAttribute('role', 'group');
        item.removeAttribute('tabindex');
        item.removeAttribute('aria-pressed');
      }
      item.addEventListener('click', () => selectMoment(item));
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectMoment(item);
        }
      });
    });
    if (selectedItem) selectMoment(selectedItem);
  }


  const lensCopy = document.querySelector('#lens-copy');
  const lensText = {
    correctness: 'Make the important thing true before making it fast.',
    complexity: 'Know what the system will ask of the team later.',
    delivery: 'Leave the team with a path they can actually move on.'
  };
  const lensButtons = [...document.querySelectorAll('.lens-button')];
  lensButtons.forEach((button) => {
    button.id ||= `lens-${button.dataset.lens}`;
  });
  lensCopy.setAttribute('role', 'tabpanel');
  lensCopy.setAttribute('aria-live', 'polite');
  lensCopy.tabIndex = 0;
  const selectLens = (button, moveFocus = false) => {
    lensButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    lensCopy.textContent = lensText[button.dataset.lens];
    lensCopy.setAttribute('aria-labelledby', button.id);
    if (moveFocus) button.focus();
  };
  lensButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectLens(button));
    button.addEventListener('keydown', (event) => {
      const key = event.key;
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(key)) return;
      event.preventDefault();
      const nextIndex = key === 'Home' ? 0 : key === 'End' ? lensButtons.length - 1 : (index + (key === 'ArrowRight' || key === 'ArrowDown' ? 1 : -1) + lensButtons.length) % lensButtons.length;
      selectLens(lensButtons[nextIndex], true);
    });
  });
  if (lensButtons[0]) selectLens(lensButtons.find((button) => button.classList.contains('is-selected')) || lensButtons[0]);

  document.querySelectorAll('img:not(.hero-poster)').forEach((image) => {
    image.loading = 'lazy';
    image.decoding = 'async';
  });

  let motionRevealed = false;
  function revealSite() {
    if (motionRevealed) return;
    motionRevealed = true;
    syncMotion();
    document.documentElement.classList.remove('motion-pending');
    document.documentElement.classList.add('motion-ready');
  }

  const poster = document.querySelector('.hero-poster');
  const posterReady = poster && !poster.complete
    ? new Promise((resolve) => {
        poster.addEventListener('load', resolve, { once: true });
        poster.addEventListener('error', resolve, { once: true });
      })
    : Promise.resolve();
  const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  const settleCap = new Promise((resolve) => window.setTimeout(resolve, 1200));

  Promise.race([Promise.all([posterReady, fontsReady]), settleCap]).then(revealSite);
  window.addEventListener('load', revealSite);
  // A backgrounded tab clamps timers and suspends frames; never leave it blank once it is looked at.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') revealSite();
  });
  window.setTimeout(revealSite, 2500);

}());