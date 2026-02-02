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


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() { console.log("Service Worker Registered"); });
}

const items = document.querySelectorAll('.timeline-item');
let anyUpcoming = false;

items.forEach(item => {
  const dateText = item.querySelector('.timeline-date').textContent.trim();
  const timeText = item.querySelector('.timeline-content').textContent.trim();
  const monthDay = dateText.replace(/^[^\w]+/, '').trim();
  const now = new Date();
  const currentYear = now.getFullYear();

  const testDate = new Date(`${monthDay} 2000 ${timeText}`); // Year doesn't matter for month extraction
  const eventMonth = testDate.getMonth();
  const currentMonth = now.getMonth();

  let year;
  // School year logic: Assume school year starts in August (Month 7)
  // If we are in the first half of the school year (Aug-Dec)
  if (currentMonth >= 7) {
    if (eventMonth >= 7) {
      year = currentYear; // e.g., Sept 2025
    } else {
      year = currentYear + 1; // e.g., Feb 2026
    }
  } else {
    // We are in the second half of the school year (Jan-July)
    if (eventMonth >= 7) {
      year = currentYear - 1; // e.g., Sept 2025 (when now is Feb 2026)
    } else {
      year = currentYear; // e.g., Feb 2026
    }
  }

  const eventDate = new Date(`${monthDay} ${year} ${timeText}`);

  if (eventDate < now) {
    item.classList.add('passed');
  } else {
    anyUpcoming = true;
  }
});

if (!anyUpcoming) {
  const msg = document.createElement('div');
  msg.className = 'timeline-message';
  msg.textContent = 'More meetings will be posted for the upcoming school year!';
  document.querySelector('.meetings-timeline')?.appendChild(msg);
}
