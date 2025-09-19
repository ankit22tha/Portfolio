// Scroll-based fade in animations for sections
function handleAnim() {
  const animatedEls = document.querySelectorAll(".animate-fade-in-up, .animate-fade-in");
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add("is-visible");
      el.classList.add("is-visibleimg");
    }
  });
}

window.addEventListener("DOMContentLoaded", handleAnim);
window.addEventListener("scroll", handleAnim);

// Navbar active link highlight on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach(section => {
    if (
      scrollY >= section.offsetTop - 80 &&
      scrollY < section.offsetTop + section.offsetHeight - 80
    ) {
      const id = section.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("text-indigo-700");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("text-indigo-700");
        }
      });
    }
  });
});
