const CONFIG = {
  siteName: 'SellHub',
  tagline: 'Discover premium digital products',
  heroTitle: 'Discover Premium',
  heroTitleGradient: 'Digital Products',
  heroDescription: 'Explore a curated marketplace of high-quality digital products. From software and tools to games and hosting solutions.',
  heroCtaText: 'Explore Products',
  heroCtaLink: '#categories',
  heroSecondaryCtaText: 'Learn More',
  heroSecondaryCtaLink: '#features',
  ownerName: 'Alex Morgan',
  ownerEmail: 'alex@sellhub.io',
  supportEmail: 'support@sellhub.io',
  discordUrl: 'https://discord.gg/sellhub',
  telegramUrl: 'https://t.me/sellhub',
  websiteUrl: 'https://sellhub.io',
  socialLinks: {
    twitter: '#',
    github: '#',
    discord: '#',
    email: 'mailto:contact@sellhub.io'
  },
  features: [
    {
      icon: '🎯',
      title: 'Curated Quality',
      desc: 'Every product is carefully reviewed to ensure the highest quality standards for our marketplace.'
    },
    {
      icon: '⚡',
      title: 'Instant Access',
      desc: 'Get immediate access to your purchases with fast downloads and straightforward licensing.'
    },
    {
      icon: '🛡️',
      title: 'Secure Transactions',
      desc: 'Your purchases are protected with enterprise-grade security and encryption.'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      desc: 'Join thousands of creators and buyers from around the world on SellHub.'
    },
    {
      icon: '💎',
      title: 'Premium Support',
      desc: 'Dedicated support team ready to help you with any questions or concerns.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      desc: 'Products are regularly updated with new features and improvements.'
    }
  ],
  stats: {
    products: { target: 1500, suffix: '+', label: 'Products' },
    customers: { target: 25000, suffix: '+', label: 'Customers' },
    categories: { target: 12, suffix: '', label: 'Categories' },
    reviews: { target: 4800, suffix: '+', label: 'Reviews' }
  },
  categories: [
    { slug: 'software', name: 'Software', icon: '💻', desc: 'Premium software tools and applications', count: 486 },
    { slug: 'hosting', name: 'Hosting', icon: '☁️', desc: 'Reliable hosting solutions and servers', count: 234 },
    { slug: 'gaming', name: 'Gaming', icon: '🎮', desc: 'Games, mods, and gaming assets', count: 312 }
  ],
  contactInfo: [],
  footerLinks: {
    product: [
      { label: 'Categories', href: '#categories' },
      { label: 'Featured', href: '#featured' },
      { label: 'Trending', href: '#' },
      { label: 'New Releases', href: '#' }
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Contact', href: '#contact' }
    ]
  }
};

CONFIG.contactInfo = [
  { icon: '👤', title: 'Owner', value: 'Alex Morgan' },
  { icon: '📧', title: 'Owner Email', value: 'alex@sellhub.io' },
  { icon: '🆘', title: 'Support', value: 'support@sellhub.io' },
  { icon: '💬', title: 'Discord', value: 'https://discord.gg/sellhub' },
  { icon: '✈️', title: 'Telegram', value: 'https://t.me/sellhub' },
  { icon: '🌐', title: 'Website', value: 'https://sellhub.io' }
];

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      const icon = toggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = isOpen
          ? '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
          : '<path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
      }
    });

    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initParticles() {
  const container = document.querySelector('.hero-bg');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${60 + Math.random() * 40}%;
      animation-delay: ${Math.random() * 8}s;
      animation-duration: ${6 + Math.random() * 6}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
    `;
    container.appendChild(particle);
  }
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el);
  });
}

function initAnimatedCounters() {
  const statValues = document.querySelectorAll('.stat-item-value');
  if (!statValues.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

async function loadCategoryData() {
  const container = document.querySelector('.products-grid[data-category]');
  if (!container) return;

  const category = container.dataset.category;
  const searchInput = document.getElementById('categorySearch');
  const sortSelect = document.getElementById('categorySort');
  const resultCount = document.getElementById('resultCount');

  try {
    const response = await fetch(`categories/${category}/data.json`);
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();

    let products = data.products || [];

    function render() {
      const query = searchInput?.value.toLowerCase() || '';
      const sort = sortSelect?.value || 'name';

      let filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.tags || []).some(t => t.toLowerCase().includes(query))
      );

      switch (sort) {
        case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
        case 'price': filtered.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
        case 'price-desc': filtered.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      }

      if (resultCount) {
        resultCount.textContent = `Showing ${filtered.length} of ${products.length} products`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
            <p style="font-size: 1.25rem; color: var(--text-secondary);">No products found matching your search.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(p => {
        const imgSrc = p.image || `../../assets/code-bracket.png`;
        const priceHtml = p.price
          ? `<span class="product-card-price">$${p.price.toFixed(2)}</span>`
          : `<span class="product-card-price-free">Free</span>`;

        const tagsHtml = (p.tags || []).map(t =>
          `<span class="product-tag">${t}</span>`
        ).join('');

        return `
          <article class="product-card">
            <img class="product-card-image" src="${imgSrc}" alt="${p.name}" loading="lazy">
            <div class="product-card-body">
              <span class="product-card-category">${category}</span>
              <h3 class="product-card-title">${p.name}</h3>
              <p class="product-card-desc">${p.description}</p>
              <div class="product-card-tags">${tagsHtml}</div>
              <div class="product-card-footer">
                ${priceHtml}
                <button class="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    if (searchInput) searchInput.addEventListener('input', render);
    if (sortSelect) sortSelect.addEventListener('change', render);

    render();
  } catch (e) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.25rem; color: var(--error);">Failed to load products. Please try again later.</p>
      </div>
    `;
  }
}

function initCategoryPage() {
  const headerTitle = document.querySelector('.category-header-title');
  const headerDesc = document.querySelector('.category-header-desc');

  if (headerTitle && window.CATEGORY_DATA) {
    headerTitle.textContent = window.CATEGORY_DATA.name;
    if (headerDesc) headerDesc.textContent = window.CATEGORY_DATA.description;

    document.title = `${window.CATEGORY_DATA.name} - ${CONFIG.siteName}`;
  }

  loadCategoryData();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initScrollReveal();
  initAnimatedCounters();
  initSmoothScroll();
  initCategoryPage();
});
