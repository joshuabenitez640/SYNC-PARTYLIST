const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu when a link is tapped
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const scrollPoster = document.getElementById('scrollPoster');

function updatePosterPan() {
  const viewportHeight = window.innerHeight;
  const imgHeight = scrollPoster.offsetHeight;
  const maxPan = Math.max(imgHeight - viewportHeight, 0);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = docHeight > 0 ? scrollTop / docHeight : 0;

  const panY = -(scrollFraction * maxPan);
  scrollPoster.style.transform = `translate(-50%, ${panY}px)`;
}

window.addEventListener('scroll', updatePosterPan, { passive: true });
window.addEventListener('resize', updatePosterPan, { passive: true });
updatePosterPan();
const platformCards = document.querySelectorAll('.p-card');

const revealTargets = document.querySelectorAll(
  '.p-card, .platform__eyebrow, .platform__title, .t-card, .team__eyebrow, .team__title'
);

const platformObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        platformObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

revealTargets.forEach((el) => platformObserver.observe(el));
