(function () {
  const hero = document.querySelector('.hero');
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

  function markVideoReady() {
    if (video.readyState >= 2) media.classList.add('video-ready');
  }

  video.addEventListener('loadedmetadata', markVideoReady);
  video.addEventListener('loadeddata', markVideoReady);
  video.addEventListener('canplay', markVideoReady);
  video.addEventListener('error', () => media.classList.remove('video-ready'));

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
  }

  function seekToShownTime() {
    if (seeking || video.readyState < 2 || Math.abs(video.currentTime - shownTime) <= 0.035) return;
    seeking = true;
    video.currentTime = shownTime;
  }

  video.addEventListener('seeked', () => {
    seeking = false;
    seekToShownTime();
  });

  function renderFrame(now) {
    const deltaTime = Math.min(0.05, (now - lastRender) / 1000);
    lastRender = now;
    const delta = targetTime - shownTime;
    const smoothing = reduceMotion ? 1 : 1 - Math.pow(0.0001, deltaTime);
    shownTime += delta * smoothing;
    seekToShownTime();
    requestAnimationFrame(renderFrame);
  }

  window.addEventListener('scroll', updateHero, { passive: true });
  window.addEventListener('resize', updateHero);
  updateHero();
  requestAnimationFrame(renderFrame);

  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const lensCopy = document.querySelector('#lens-copy');
  const lensText = {
    correctness: 'Make the important thing true before making it fast.',
    complexity: 'Know what the system will ask of the team later.',
    delivery: 'Leave the team with a path they can actually move on.'
  };
  document.querySelectorAll('.lens-button').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.lens-button').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-selected', selected);
    });
    lensCopy.textContent = lensText[button.dataset.lens];
  }));

  const form = document.querySelector('#contact-form');
  const success = document.querySelector('.form-success');
  const formNote = document.querySelector('.form-note');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    success.hidden = false;
    formNote.hidden = true;
  });
}());