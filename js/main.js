document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  const updateScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  updateScrolled();
  window.addEventListener('scroll', updateScrolled);

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));

  // Some mobile browsers ignore the HTML `muted` attribute for autoplay
  // and leave the video paused until a tap; forcing it via JS first fixes it.
  document.querySelectorAll('.phone-video').forEach((video) => {
    video.muted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      document.querySelectorAll('.phone-video').forEach((video) => {
        if (video.paused) video.play().catch(() => {});
      });
    }
  });
});
