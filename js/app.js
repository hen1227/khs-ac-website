// Scroll Animation on Sections
const sections = document.querySelectorAll('.section');

const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// Get all the menu links and the checkbox for the hamburger menu
const menuLinks = document.querySelectorAll('.nav-menu li a');
const navToggle = document.getElementById('nav-toggle');

// Add click event listeners to each link
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Uncheck the checkbox to close the menu
    navToggle.checked = false;
  });
});
