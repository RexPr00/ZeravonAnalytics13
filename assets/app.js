const body = document.body;

const setLock = (state) => body.classList.toggle('lock', state);

const trapFocus = (container, event) => {
  const focusables = container.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const drawer = document.querySelector('.mobile-drawer');
const burger = document.querySelector('.burger');
const closeDrawerBtn = document.querySelector('.drawer-close');

const closeDrawer = () => {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  setLock(false);
};

if (drawer && burger) {
  burger.addEventListener('click', () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    setLock(true);
    closeDrawerBtn.focus();
  });

  closeDrawerBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (event) => {
    if (event.target.matches('a')) closeDrawer();
  });

  document.addEventListener('click', (event) => {
    if (drawer.classList.contains('open') && !drawer.contains(event.target) && event.target !== burger) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    if (event.key === 'Tab' && drawer.classList.contains('open')) trapFocus(drawer, event);
  });
}

for (const wrap of document.querySelectorAll('[data-dropdown]')) {
  const btn = wrap.querySelector('.lang-pill');
  const menu = wrap.querySelector('.lang-menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!wrap.contains(event.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

const faqItems = document.querySelectorAll('.faq-list details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

const modal = document.getElementById('privacy-modal');
const openPrivacy = document.querySelector('.privacy-open');
const closeButtons = modal ? modal.querySelectorAll('.modal-close, .modal-x') : [];
const modalCard = modal ? modal.querySelector('.modal-card') : null;

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  setLock(false);
};

if (modal && openPrivacy) {
  openPrivacy.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setLock(true);
    modalCard.focus();
  });

  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
    if (event.key === 'Tab' && modal.classList.contains('open')) trapFocus(modalCard, event);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you. We received your sign-up and will contact you shortly.');
  });
});
