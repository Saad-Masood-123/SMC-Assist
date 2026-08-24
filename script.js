// SMC Assist — shared behaviour across all pages

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('ready'));

  // Mobile menu toggle
  const hamBtn = document.getElementById('hamBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamBtn && mobileMenu) {
    hamBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  // Highlight the current page in nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Workflow path draw-on-scroll
  const wfDraw = document.getElementById('wfDraw');
  const wfWrap = document.querySelector('.workflow-wrap');
  if (wfDraw && wfWrap) {
    const wfIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wfDraw.classList.add('drawn');
          wfIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    wfIO.observe(wfWrap);
  }

  // Header shadow intensifies on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 40
        ? '0 6px 24px -12px rgba(8,28,46,0.18)'
        : 'none';
    });
  }

  // Cursor glow inside the hero (desktop only, subtle)
  const heroEl = document.querySelector('.hero');
  if (heroEl && window.matchMedia('(hover:hover)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    heroEl.appendChild(glow);
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      glow.style.setProperty('--gx', `${e.clientX - rect.left}px`);
      glow.style.setProperty('--gy', `${e.clientY - rect.top}px`);
    });
  }

  // Gentle magnetic pull on primary buttons
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y - 2}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i !== item && i.classList.remove('open'));
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Contact form (static hosting — routes to WhatsApp/email as a fallback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const msg = document.getElementById('cf-message').value.trim();
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:the.smcassist@gmail.com?subject=Website enquiry&body=${body}`;
    });
  }
});

// ===== Booking modal (Calendly / Cal.com) =====
// Replace with your real Calendly or Cal.com scheduling link
const BOOKING_URL = "https://calendly.com/the-smcassist/30min";

function openBooking(){
  const overlay = document.getElementById('bookingOverlay');
  const iframe = document.getElementById('bookingIframe');
  if (!overlay || !iframe) return;
  iframe.src = BOOKING_URL;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBooking(){
  const overlay = document.getElementById('bookingOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('bookingIframe').src = 'about:blank';
}
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('bookingOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target.id === 'bookingOverlay') closeBooking();
    });
  }
});
