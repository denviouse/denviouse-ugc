// Nav shadow state on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Scroll reveal — skip entirely if the user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// Legal modals (Impressum / Datenschutz)
// Includes basic focus management for keyboard and screen-reader users:
// focus moves into the modal on open and returns to the trigger on close.
let lastFocusedTrigger = null;

const openModal = (id, trigger) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  lastFocusedTrigger = trigger || document.activeElement;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('[data-close-modal]');
  if (closeBtn) closeBtn.focus();
};

const closeModal = (modal) => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
    lastFocusedTrigger.focus();
  }
  lastFocusedTrigger = null;
};

document.querySelectorAll('[data-open-modal]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(link.dataset.openModal, link);
  });
});

document.querySelectorAll('.legal-modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
  modal.querySelector('[data-close-modal]').addEventListener('click', () => closeModal(modal));

  // Simple focus trap: keep Tab navigation inside the open modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.legal-modal.active').forEach(closeModal);
  }
});
