import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const preferences = gsap.matchMedia();
preferences.add('(prefers-reduced-motion: no-preference)', () => {
  const hero = gsap.timeline({ defaults: { duration: 0.28, ease: 'power2.out' } });
  hero.from('.hero-copy > *', { y: 10, stagger: 0.07, immediateRender: false });

  gsap.utils.toArray<HTMLElement>('.section-intro, .proof-intro, .guide-copy').forEach(element => {
    gsap.from(element, {
      y: 12, duration: 0.28, ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
    });
  });

  const refresh = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('pageshow', refresh);
  return () => {
    window.removeEventListener('load', refresh);
    window.removeEventListener('pageshow', refresh);
  };
});

window.addEventListener('pagehide', () => preferences.revert());
