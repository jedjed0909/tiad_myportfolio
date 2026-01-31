// Navbar scroll effect
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Typing animation
const typingText = document.querySelector(".typing-text");
const phrases = ["IT Student Intern"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Trigger counter animation for stats
      if (entry.target.classList.contains("stat-item")) {
        animateCounter(entry.target);
      }

      // Trigger skill bar animation
      if (entry.target.classList.contains("skill-card")) {
        animateSkillBar(entry.target);
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".skill-card, .project-card, .about-text, .stat-item, .contact-info, .contact-form",
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Counter animation
function animateCounter(statItem) {
  const counter = statItem.querySelector(".stat-number");
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
}

// Skill bar animation
function animateSkillBar(skillCard) {
  const progressBar = skillCard.querySelector(".skill-progress");
  const progress = progressBar.getAttribute("data-progress");

  setTimeout(() => {
    progressBar.style.width = progress + "%";
  }, 100);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
    `;
  successMessage.textContent = "Message sent successfully! 🎉";
  document.body.appendChild(successMessage);

  // Remove message after 3 seconds
  setTimeout(() => {
    successMessage.style.animation = "slideOut 0.5s ease";
    setTimeout(() => {
      successMessage.remove();
    }, 500);
  }, 3000);

  // Reset form
  contactForm.reset();
});

// Add animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cursor trail effect (optional - for extra flair)
let mouseX = 0;
let mouseY = 0;
let cursorCircles = [];

for (let i = 0; i < 3; i++) {
  const circle = document.createElement("div");
  circle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(99, 102, 241, ${0.5 - i * 0.15});
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
  document.body.appendChild(circle);
  cursorCircles.push({
    element: circle,
    x: 0,
    y: 0,
  });
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  let x = mouseX;
  let y = mouseY;

  cursorCircles.forEach((circle, index) => {
    circle.x += (x - circle.x) * (0.3 - index * 0.05);
    circle.y += (y - circle.y) * (0.3 - index * 0.05);

    circle.element.style.left = circle.x + "px";
    circle.element.style.top = circle.y + "px";

    x = circle.x;
    y = circle.y;
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .skill-card",
);
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorCircles.forEach((circle) => {
      circle.element.style.transform = "scale(1.5)";
    });
  });

  el.addEventListener("mouseleave", () => {
    cursorCircles.forEach((circle) => {
      circle.element.style.transform = "scale(1)";
    });
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
