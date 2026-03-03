document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization
  if (window.lucide) window.lucide.createIcons();

  // Sticky Header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else if (!header.classList.contains('static')) {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu – inject overlay element
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    burger.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navLinks.classList.add('active');
    burger.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (burger) {
    burger.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking any nav link inside it
  if (navLinks) {
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // Determine base path for fetching JSON (works locally and on GitHub Pages)
  const base = document.querySelector('base')?.href || '';
  const srcBase = base ? base + 'src/' : 'src/';

  // Load News
  const newsGrid = document.querySelector('.news-grid');
  if (newsGrid) {
    fetch(srcBase + 'news.json')
      .then(res => res.json())
      .then(data => {
        const isHomePage = newsGrid.classList.contains('news-teaser-grid');
        const postsToShow = isHomePage ? data.slice(0, 3) : data;

        newsGrid.innerHTML = postsToShow.map((post, index) => `
          <article class="news-card reveal" style="transition-delay: ${index * 0.1}s">
            <div class="news-img">
              <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="news-content">
              <span class="news-date">${post.date}</span>
              <h3>${post.title}</h3>
              <p>${post.excerpt}</p>
              <span style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 12px;">Weiterlesen →</span>
            </div>
          </article>
        `).join('');

        document.querySelectorAll('.news-card').forEach(el => revealObserver.observe(el));
        if (window.lucide) window.lucide.createIcons();
      })
      .catch(err => {
        console.error('Error loading news:', err);
        // Fallback: show inline dummy news if fetch fails
        newsGrid.innerHTML = `
          <article class="news-card">
            <div class="news-img"><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" alt="Frühlingsputz" loading="lazy"></div>
            <div class="news-content"><span class="news-date">01.03.2024</span><h3>Frühlingsputz: Tipps für ein strahlendes Zuhause</h3><p>Der Frühling steht vor der Tür! Erfahren Sie, wie Sie mit unseren Profi-Tipps beste Ergebnisse erzielen.</p><span style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 12px;">Weiterlesen →</span></div>
          </article>
          <article class="news-card">
            <div class="news-img"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Bürohygiene" loading="lazy"></div>
            <div class="news-content"><span class="news-date">15.02.2024</span><h3>Bürohygiene in Zeiten von New Work</h3><p>Saubere Arbeitsplätze fördern die Gesundheit und Produktivität. Warum regelmäßige Reinigung wichtiger ist denn je.</p><span style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 12px;">Weiterlesen →</span></div>
          </article>
          <article class="news-card">
            <div class="news-img"><img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800" alt="Spezialreinigung" loading="lazy"></div>
            <div class="news-content"><span class="news-date">30.01.2024</span><h3>Spezialreinigung: Wenn es besonders sauber sein muss</h3><p>Ob nach Renovierungen oder bei hartnäckigen Verschmutzungen – unsere Experten sind bereit.</p><span style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 12px;">Weiterlesen →</span></div>
          </article>
        `;
      });
  }

  // Load Team
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    fetch(srcBase + 'team.json')
      .then(res => res.json())
      .then(data => {
        teamGrid.innerHTML = data.map((member, index) => `
          <div class="team-card reveal" style="transition-delay: ${index * 0.1}s">
            <div class="team-img-wrapper">
              <img src="${member.image}" alt="${member.name}" loading="lazy">
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
});

// Hero Video Control – pause after 6 seconds
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('timeupdate', function () {
    if (this.currentTime >= 6) this.pause();
  });
}
