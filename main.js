/* ─── MAIN.JS ────────────────────────────────────────────── */

/* Nav scroll behaviour */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* Mobile menu */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* Close mobile menu on link click */
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

/* ─── SCROLL FADE-IN ─────────────────────────────────────── */
const fadeEls = document.querySelectorAll(
  '.section-header, .about-grid, .project-card, .blog-item, .resume-col, .contact-heading, .contact-links'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ─── PROJECT MODAL ──────────────────────────────────────── */

// Project data — fill in your own content here
const projects = {
  proj1: {
    title: 'Project Title One',
    year: '2025',
    type: 'Architecture · Academic',
    description: `
      <p>A short description of this project: what was the brief, the site, the idea you were working with.</p>
      <p>Talk about the process — what questions it raised, what decisions shaped it.</p>
    `,
    images: [] // Add image paths: ['images/proj1-a.jpg', 'images/proj1-b.jpg']
  },
  proj2: {
    title: 'Project Title Two',
    year: '2024',
    type: 'Spatial Design · Studio',
    description: `
      <p>Description of this project.</p>
    `,
    images: []
  },
  proj3: {
    title: 'Featured Project — Thesis',
    year: '2024',
    type: 'Architecture · Thesis Work',
    description: `
      <p>Your thesis project description. This is your most detailed entry — describe the research, the concept, and what the work proposes.</p>
      <p>Include site context, key references, and what the drawings or models reveal.</p>
    `,
    images: []
  },
  proj4: {
    title: 'Project Title Four',
    year: '2023',
    type: 'Drawing · Research',
    description: `
      <p>Description of this project.</p>
    `,
    images: []
  }
};

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const imagesHtml = p.images.length
    ? p.images.map(src => `<img src="${src}" alt="${p.title}" style="width:100%;margin-bottom:1rem;">`).join('')
    : `<div style="height:240px;background:#F0EBE3;display:flex;align-items:center;justify-content:center;color:#8C7355;font-size:0.7rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1.5rem;">Add images here</div>`;

  document.getElementById('modalContent').innerHTML = `
    <div style="margin-bottom:0.5rem; font-size:0.7rem; letter-spacing:0.14em; text-transform:uppercase; color:#8C7355;">${p.year} — ${p.type}</div>
    <h2 style="font-family:'Cormorant Garamond',Georgia,serif; font-size:2rem; font-weight:300; margin-bottom:1.5rem; line-height:1.2;">${p.title}</h2>
    ${imagesHtml}
    <div style="font-size:0.95rem; line-height:1.8; opacity:0.8;">${p.description}</div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProject();
});

/* ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--sand)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
