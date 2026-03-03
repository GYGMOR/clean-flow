document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else if (!document.querySelector('.header.static')) {
      // Only remove scrolled if not explicitly needed
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('open');
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Parallax Effect for Hero
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      heroBg.style.transform = `translateY(${scrollPos * 0.4}px) scale(1.1)`;
    });
  }

  // Load News
  const newsGrid = document.querySelector('.news-grid');
  if (newsGrid) {
    fetch('/src/news.json')
      .then(res => res.json())
      .then(data => {
        const isHomePage = document.querySelector('.news-teaser-grid');
        const postsToShow = isHomePage ? data.slice(0, 3) : data;

        newsGrid.innerHTML = postsToShow.map((post, index) => `
                    <article class="news-card reveal" style="transition-delay: ${index * 0.1}s" onclick="window.location.href='/news-detail.html?id=${post.id}'">
                        <div class="news-img">
                            <img src="${post.image}" alt="${post.title}">
                        </div>
                        <div class="news-content">
                            <span class="news-date">${post.date}</span>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <span class="news-link-pseudo" style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 15px;">Weiterlesen →</span>
                        </div>
                    </article>
                `).join('');

        document.querySelectorAll('.news-card').forEach(el => revealObserver.observe(el));
        if (window.lucide) window.lucide.createIcons();
      })
      .catch(err => console.error('Error loading news:', err));
  }

  // Load Team
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    fetch('/src/team.json')
      .then(res => res.json())
      .then(data => {
        teamGrid.innerHTML = data.map((member, index) => `
                    <div class="team-card reveal" style="transition-delay: ${index * 0.1}s">
                        <div class="team-img-wrapper">
                            <img src="${member.image}" alt="${member.name}">
                        </div>
                        <div class="team-info">
                            <h4>${member.name}</h4>
                            <span>${member.role}</span>
                        </div>
                    </div>
                `).join('');
        document.querySelectorAll('.team-card').forEach(el => revealObserver.observe(el));
      })
      .catch(err => console.error('Error loading team:', err));
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      let isValid = true;

      for (let [key, value] of formData.entries()) {
        if (!value) isValid = false;
      }

      if (isValid) {
        alert('Vielen Dank für Ihre Nachricht, ' + formData.get('name') + '! Wir werden uns in Kürze bei Ihnen melden.');
        contactForm.reset();
      } else {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
      }
    });
  }
});

// Hero Video Control
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('timeupdate', function () {
    if (this.currentTime >= 6) {
      this.pause();
    }
  });
}
