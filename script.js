document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('pageLoader');
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const revealItems = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = [...document.querySelectorAll('main section[id]')];

  // Intro loader animation
  window.setTimeout(() => {
    loader.classList.add('is-hidden');
    document.body.classList.add('page-ready');
  }, 1250);

  // Mobile menu
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => siteNav.classList.remove('is-open'));
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach(item => observer.observe(item));

  // Active nav state
  const setActiveLink = () => {
    let currentId = sections[0]?.id || '';
    const scrollPoint = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPoint >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink);
});
