// Cafe L'Aura - Main JS (Web Components)

class CafeNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :host(.scrolled) nav {
          background-color: oklch(1 0 0 / 0.85);
          backdrop-filter: blur(12px);
          color: oklch(0.25 0.02 40);
          padding: 1rem 2rem;
          box-shadow: 0 4px 30px oklch(0 0 0 / 0.05);
        }
        .logo {
          font-family: "Playfair Display", serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        ul {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        a {
          color: inherit;
          text-decoration: none;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          opacity: 0.8;
          transition: opacity 0.3s;
          font-weight: 500;
        }
        a:hover {
          opacity: 1;
        }
        @media (max-width: 768px) {
          ul { display: none; }
        }
      </style>
      <nav>
        <div class="logo">CAFE L'AURA</div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

// Add scroll listener to update cafe-nav state
window.addEventListener('scroll', () => {
  const nav = document.querySelector('cafe-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

class MenuItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'Item Name';
    const price = this.getAttribute('price') || '0.00';
    const desc = this.getAttribute('desc') || 'Description goes here.';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 15px oklch(0 0 0 / 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          container-type: inline-size;
        }
        :host(:hover) {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px oklch(0 0 0 / 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        h4 {
          font-family: "Playfair Display", serif;
          font-size: 1.25rem;
          margin: 0;
        }
        .price {
          font-weight: 600;
          color: oklch(0.2 0.04 50);
        }
        p {
          font-size: 0.9rem;
          color: oklch(0.45 0.02 40);
          margin: 0;
        }
        @container (max-width: 250px) {
          .header { flex-direction: column; gap: 0.25rem; }
        }
      </style>
      <div class="item">
        <div class="header">
          <h4>${name}</h4>
          <span class="price">$${price}</span>
        </div>
        <p>${desc}</p>
      </div>
    `;
  }
}

class CafeGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        .img-item {
          aspect-ratio: 1;
          background: oklch(0.9 0.02 60);
          border-radius: 0.5rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .img-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .img-item:hover img {
          transform: scale(1.1);
        }
        .img-item::after {
          content: "VIEW";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: oklch(0.2 0.04 50 / 0.4);
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
          font-weight: 600;
          letter-spacing: 0.2em;
        }
        .img-item:hover::after {
          opacity: 1;
        }
        .wide { grid-column: span 2; aspect-ratio: 2/1; }
        @media (max-width: 600px) {
          .wide { grid-column: span 1; aspect-ratio: 1; }
        }
      </style>
      <div class="grid">
        <div class="img-item wide">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" alt="Gallery 1">
        </div>
        <div class="img-item">
          <img src="https://images.unsplash.com/photo-1497933321188-941f9ad36b17?auto=format&fit=crop&q=80&w=800" alt="Gallery 2">
        </div>
        <div class="img-item">
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" alt="Gallery 3">
        </div>
        <div class="img-item">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800" alt="Gallery 4">
        </div>
        <div class="img-item wide">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" alt="Gallery 5">
        </div>
      </div>
    `;
  }
}

customElements.define('cafe-nav', CafeNav);
customElements.define('menu-item', MenuItem);
customElements.define('cafe-gallery', CafeGallery);

// Form handling
document.getElementById('reservation-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your inquiry! We will get back to you soon.');
  e.target.reset();
});
