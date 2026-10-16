import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const preferences = gsap.matchMedia();
preferences.add('(prefers-reduced-motion: no-preference)', () => {
  const hero = gsap.timeline({ defaults: { duration: 0.28, ease: 'power2.out' } });
  hero.from('.hero-copy > *', { y: 10, stagger: 0.07, immediateRender: false })
    .from('.portrait-hero', { y: 12, immediateRender: false }, 0.1);

  gsap.from('.method-line span', {
    scaleX: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.method-map', start: 'top 85%', end: 'bottom 65%', scrub: true },
  });
  gsap.utils.toArray<HTMLElement>('.section-intro, .proof-intro, .guide-copy').forEach(element => {
    gsap.from(element, {
      y: 12, duration: 0.28, ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
    });
  });

  // Native touch and keyboard scrolling stay in the document; only desktop wheels are enhanced.
  let lenis: Lenis | undefined;
  let unsubscribe: (() => void) | undefined;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const tick = (time: number) => lenis?.raf(time * 1000);
  const stopSmoothing = () => {
    unsubscribe?.();
    unsubscribe = undefined;
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = undefined;
  };
  const syncSmoothing = () => {
    stopSmoothing();
    if (!finePointer.matches || document.hidden) return;
    lenis = new Lenis({ autoRaf: false, syncTouch: false, anchors: true, duration: 0.7 });
    unsubscribe = lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
  };
  syncSmoothing();
  finePointer.addEventListener('change', syncSmoothing);
  document.addEventListener('visibilitychange', syncSmoothing);
  const refresh = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('pageshow', refresh);
  return () => {
    stopSmoothing();
    finePointer.removeEventListener('change', syncSmoothing);
    document.removeEventListener('visibilitychange', syncSmoothing);
    window.removeEventListener('load', refresh);
    window.removeEventListener('pageshow', refresh);
  };
});

window.addEventListener('pagehide', () => preferences.revert());
