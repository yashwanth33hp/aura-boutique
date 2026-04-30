document.addEventListener('DOMContentLoaded', () => {
  // Navbar
  const nav = document.getElementById('navbar');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

  // Mobile menu
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.rv').forEach(el => obs.observe(el));

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Lightbox
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  const lbX = document.getElementById('lbX');
  if (lb && lbImg) {
    document.querySelectorAll('[data-lb]').forEach(img => {
      img.addEventListener('click', () => { lbImg.src = img.src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
    });
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    if (lbX) lbX.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // Size selector
  document.querySelectorAll('.sz').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.sizes').querySelectorAll('.sz').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });

  // Color dots
  document.querySelectorAll('.clr-dot').forEach(d => {
    d.addEventListener('click', () => {
      d.closest('.clr-dots').querySelectorAll('.clr-dot').forEach(x => x.classList.remove('on'));
      d.classList.add('on');
    });
  });

  // Contact form
  const form = document.getElementById('ctForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sent ✓';
      btn.style.pointerEvents = 'none';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.pointerEvents = ''; form.reset(); }, 2500);
    });
  }
});
