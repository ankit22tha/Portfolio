// Debug mode - set to false in production
const DEBUG = true;

// Simple logging function
function log(message) {
  if (DEBUG) {
    console.log('Portfolio Debug:', message);
  }
}

// Enhanced Scroll-based fade in animations for sections
function handleAnim() {
  const animatedEls = document.querySelectorAll(".animate-fade-in-up, .animate-fade-in");
  
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Check if element is in viewport with some margin
    if (elementTop < window.innerHeight - 150 && elementBottom > 0) {
      el.classList.add("is-visible");
      if (el.classList.contains("animate-fade-in")) {
        el.classList.add("is-visibleimg");
      }
    }
  });
}

// Simple navbar active link highlight
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;
  const navLinks = document.querySelectorAll(".nav-link");
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });
  
  // Update nav links
  navLinks.forEach(link => {
    link.classList.remove("text-indigo-700", "font-bold");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("text-indigo-700", "font-bold");
    }
  });
}

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
    log('Mobile menu toggled');
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    log('Mobile menu closed');
  }
}

// Simple smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        closeMobileMenu();
        log(`Scrolled to ${targetId}`);
      }
    });
  });
}

// Contact form handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show success message
      alert(`Thank you, ${name}! Your message has been sent. I will get back to you soon.`);
      
      // Reset form
      this.reset();
      
      log(`Contact form submitted by ${name}`);
    });
  } else {
    log('Contact form not found');
  }
}

// Simple scroll to top button
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.className = 'fixed bottom-6 right-6 bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 pointer-events-none z-40 font-bold text-xl';
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll position
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
  }
  
  // Scroll to top functionality
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    log('Scrolled to top');
  });
  
  return toggleScrollButton;
}

// Outside click handler for mobile menu
function handleOutsideClick() {
  document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = event.target.closest('button');
    
    if (mobileMenu && !menuButton && !mobileMenu.contains(event.target)) {
      closeMobileMenu();
    }
  });
}

// Throttle function for better performance
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Main initialization function
function initPortfolio() {
  log('Initializing portfolio...');
  
  try {
    // Run initial animation check
    handleAnim();
    log('Initial animations checked');
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    log('Smooth scrolling initialized');
    
    // Initialize contact form
    initContactForm();
    log('Contact form initialized');
    
    // Create scroll to top button
    const toggleScrollButton = createScrollToTopButton();
    log('Scroll to top button created');
    
    // Handle outside clicks
    handleOutsideClick();
    log('Outside click handler initialized');
    
    // Throttled scroll handler for better performance
    const throttledScrollHandler = throttle(() => {
      handleAnim();
      updateActiveNavLink();
      toggleScrollButton();
    }, 16); // ~60fps
    
    // Add scroll event listener
    window.addEventListener("scroll", throttledScrollHandler);
    log('Scroll event listener added');
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint
        closeMobileMenu();
      }
    });
    log('Resize event listener added');
    
    log('✅ Portfolio initialized successfully!');
    
  } catch (error) {
    console.error('Error initializing portfolio:', error);
  }
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  // DOM is already loaded
  initPortfolio();
}

// Make functions globally available for HTML onclick handlers
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;

// Export for debugging
if (DEBUG) {
  window.portfolioDebug = {
    handleAnim,
    updateActiveNavLink,
    initContactForm,
    log
  };
}