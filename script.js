/* =========================================================
   CS Department Website — Script
   ========================================================= */

/* ── Bottom Nav Active State ─────────────────────────────── */
function setBottomNavActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html':           'home',
    '':                     'home',
    'programs.html':        'programs',
    'faculty.html':         'faculty',
    'resources.html':       'resources',
    'academic-calendar.html':   'resources',
    'course-catalog.html':      'resources',
    'application-forms.html':   'resources',
    'course-registration.html': 'resources',
    'contact.html':         'contact',
  };
  const active = map[path] || '';
  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === active);
  });
}

/* ── Top Nav Active State ────────────────────────────────── */
function setTopNavActive() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu .nav-link').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

/* ── Scroll Reveal ───────────────────────────────────────── */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── Programs Tab Switcher ───────────────────────────────── */
function initProgramTabs() {
  const bar = document.querySelector('.tab-bar');
  if (!bar) return;
  bar.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Resources Tab Switcher ──────────────────────────────── */
function initResourcesTabs() {
  const bar = document.querySelector('.resources-tabs-bar');
  if (!bar) return;
  bar.querySelectorAll('.resources-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.resources-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.tab;
      document.querySelectorAll('.resources-tab-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('active');
    });
  });
  // Activate first tab
  const first = bar.querySelector('.resources-tab-btn');
  if (first) first.click();
}

/* ── Animated Counters ───────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const step = Math.ceil(target / 60);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const tick = () => {
        start = Math.min(start + step, target);
        el.textContent = start.toLocaleString() + suffix;
        if (start < target) requestAnimationFrame(tick);
      };
      tick();
    });
    io.observe(el);
  });
}

/* ── Contact Form ────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showNotification('Message sent! We\'ll respond within 24 hours.', 'success');
    form.reset();
  });
}

/* ── Application Form ────────────────────────────────────── */
function initAppForm() {
  const form = document.getElementById('applicationForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showNotification('Application submitted successfully!', 'success');
    form.reset();
  });
}

/* ── Notification Toast ──────────────────────────────────── */
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const colors = { success: '#22c55e', error: '#ef4444', info: '#3b82f6', warning: '#f59e0b' };
  const icons  = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-circle' };

  const el = document.createElement('div');
  el.className = 'toast-notification';
  el.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  Object.assign(el.style, {
    position: 'fixed', top: '20px', right: '20px',
    background: colors[type], color: '#fff',
    padding: '.85rem 1.25rem', borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,.2)',
    zIndex: 9999, fontSize: '.9rem', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '.5rem',
    animation: 'fadeUp .3s ease',
    maxWidth: '340px'
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

/* ── Creative Scroll Effects (Header Glassmorphism) ──────── */
function initScrollEffects() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ── Back to Top Button ──────────────────────────────────── */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Responsive Mobile Nav ───────────────────────────────── */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.classList.toggle('show');
      toggleBtn.setAttribute('aria-expanded', isVisible);
    });
  }
}

/* ── Light/Dark Mode Theme Toggle ────────────────────────── */
function initThemeToggle() {
  const navMenu = document.querySelector('.nav-menu');
  if (!navMenu) return;

  const li = document.createElement('li');
  li.className = 'nav-item theme-toggle-item';
  li.setAttribute('role', 'none');
  
  const btn = document.createElement('button');
  btn.className = 'theme-toggle btn-theme';
  btn.setAttribute('aria-label', 'Toggle Dark Mode');
  btn.title = 'Toggle Dark/Light Mode';
  btn.innerHTML = '<i class="fas fa-moon"></i>';
  
  li.appendChild(btn);
  navMenu.appendChild(li);

  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

/* ── Init All ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setBottomNavActive();
  setTopNavActive();
  initScrollReveal();
  initProgramTabs();
  initResourcesTabs();
  animateCounters();
  initContactForm();
  initAppForm();
  initScrollEffects();
  initBackToTop();
  initMobileNav();
  initThemeToggle();
});
