const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor glow (disabled for reduced motion)
const glow = document.getElementById('cursorGlow');
if (!prefersReducedMotion && glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// Scroll reveal
const revealEls = Array.from(document.querySelectorAll('.reveal'));
if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

// Mobile nav toggle
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');

if (nav && navToggle && navLinks) {
  const setOpen = (open) => {
    nav.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('nav-open');
    setOpen(!isOpen);
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('nav-open')) setOpen(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      setOpen(false);
    }
  });
}

// Active nav link (based on visible section)
const setActive = (id) => {
  document.querySelectorAll('.nav-links a[data-section]').forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });
};

const sectionIds = ['experience', 'projects', 'skills', 'contact'];
const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

if (sectionEls.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sectionEls.forEach(el => activeObserver.observe(el));
}

