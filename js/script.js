document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealItems = document.querySelectorAll('.reveal');
  const yearNode = document.getElementById('year');
  const header = document.querySelector('.site-header');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('scrolled', window.scrollY > 18);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (!currentLink) return;

      const isActive =
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight;

      currentLink.classList.toggle('active', isActive);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = contactForm.querySelector('button[type="submit"]');
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Message Sent';
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          contactForm.reset();
        }, 1800);
      }
    });
  }
});
