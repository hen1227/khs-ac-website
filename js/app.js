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

  const testDate = new Date(`${monthDay} 2025 ${timeText}`);
  const eventMonth = testDate.getMonth();

  let year;
  if (currentYear === 2025) {
    year = eventMonth >= 8 ? 2025 : 2026;
  } else {
    year = eventMonth >= 8 ? 2026 : 2025;
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
