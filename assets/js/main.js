// ===== Navbar "scrolled" shadow =====
const header = document.querySelector('.site-header');

function setHeaderState() {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (!header) return;
  header.classList.toggle('scrolled', y > 12);
}

window.addEventListener('scroll', setHeaderState);
setHeaderState();


// ===== Active nav link on scroll =====
const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
const sections = [...document.querySelectorAll('section[id], main[id]')];

function setActiveLink() {
  const scrollY = window.scrollY + 110; // offset for fixed header
  let currentId = 'home';

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      currentId = id;
    }
  });

  navLinks.forEach(a => {
    const href = a.getAttribute('href').replace('#', '');
    a.classList.toggle('active', href === currentId);
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();


// ===== Close mobile nav on click =====
const navCollapseEl = document.getElementById('mainNav');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!navCollapseEl) return;
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl);
    // If menu is open on mobile, close it after click
    if (bsCollapse && navCollapseEl.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});


// ===== Reveal on scroll (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));


// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();