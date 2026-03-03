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

  // --- NEWS DATA (hardcoded for reliable GitHub Pages deployment) ---
  const NEWS_DATA = [
    {
      id: 1,
      title: "Frühlingsputz: Tipps für ein strahlendes Zuhause",
      date: "01.03.2024",
      excerpt: "Der Frühling steht vor der Tür! Erfahren Sie, wie Sie mit unseren Profi-Tipps Zeit sparen und beste Ergebnisse erzielen.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Bürohygiene in Zeiten von New Work",
      date: "15.02.2024",
      excerpt: "Saubere Arbeitsplätze fördern die Gesundheit und Produktivität. Warum regelmäßige Reinigung heute wichtiger ist denn je.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Spezialreinigung: Wenn es besonders sauber sein muss",
      date: "30.01.2024",
      excerpt: "Ob nach einer Renovierung oder bei hartnäckigen Verschmutzungen – unsere Spezialteams sind für jede Herausforderung bereit.",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Nachhaltige Reinigung: Gut für Mensch und Umwelt",
      date: "10.01.2024",
      excerpt: "Wir setzen auf umweltfreundliche Reinigungsmittel und schonende Methoden – für ein sauberes Zuhause ohne schlechtes Gewissen.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    }
  ];

  // Render News Cards
  const newsGrid = document.querySelector('.news-grid');
  if (newsGrid) {
    const isHomePage = newsGrid.classList.contains('news-teaser-grid');
    const postsToShow = isHomePage ? NEWS_DATA.slice(0, 3) : NEWS_DATA;

    newsGrid.innerHTML = postsToShow.map((post, index) => `
      <a href="news-detail.html?id=${post.id}" class="news-card reveal" style="transition-delay: ${index * 0.1}s; text-decoration: none; color: inherit; display: flex; flex-direction: column;">
        <div class="news-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="news-content">
          <span class="news-date">${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span style="color: var(--color-primary); font-weight: 600; display: inline-block; margin-top: 12px;">Weiterlesen →</span>
        </div>
      </a>
    `).join('');

    document.querySelectorAll('.news-card').forEach(el => revealObserver.observe(el));
    if (window.lucide) window.lucide.createIcons();
  }

  // --- TEAM DATA (hardcoded for reliable GitHub Pages deployment) ---
  const TEAM_DATA = [
    { name: "Sarah Müller", role: "Gründerin & CEO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Thomas Weber", role: "Betriebsleiter", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Elena Fischer", role: "Kundenbetreuung", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200" },
    { name: "Marc Keller", role: "Spezialreinigung", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" }
  ];

  // Render Team Cards
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    teamGrid.innerHTML = TEAM_DATA.map((member, index) => `
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
  }
});

// Hero Video Control – pause after 6 seconds
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('timeupdate', function () {
    if (this.currentTime >= 6) this.pause();
  });
}
