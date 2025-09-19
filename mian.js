// Simple scroll animation logic for fade-in
document.addEventListener("DOMContentLoaded", () => {
  const animatedEls = document.querySelectorAll(".animate-fade-in-up, .animate-fade-in");
  const onScroll = () => {
    animatedEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        if (el.classList.contains("animate-fade-in")) {
          el.classList.add("is-visibleimg");
        } else {
          el.classList.add("is-visible");
        }
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Trigger on load
});
