const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
}));

// Gentle reveal on scroll
const revealEls = document.querySelectorAll('.feature-card, .about-copy, .about-side, .editorial-copy, .dark-copy, .vinyl-copy, .sound-content, .section-head, .testimonials blockquote');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

const slides = [...document.querySelectorAll('.review-slide')];
const dots = document.querySelector('.review-dots');
let reviewIndex = 0;
const reviewLabel = document.documentElement.lang === 'en' ? 'Go to review' : 'Vai alla recensione';
if (slides.length && dots) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `${reviewLabel} ${i + 1}`);
    dot.addEventListener('click', () => showReview(i));
    dots.appendChild(dot);
  });
  const showReview = (i) => {
    reviewIndex = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === reviewIndex));
    [...dots.children].forEach((d, n) => d.classList.toggle('active', n === reviewIndex));
  };
  document.querySelector('.review-arrow.prev')?.addEventListener('click', () => showReview(reviewIndex - 1));
  document.querySelector('.review-arrow.next')?.addEventListener('click', () => showReview(reviewIndex + 1));
}
