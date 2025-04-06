import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Brass Fittings',
      image: '/images/fittings.jpg',
      description: 'High-quality brass fittings for industrial applications'
    },
    {
      id: 2,
      name: 'Decorative Items',
      image: '/images/decorative.jpg',
      description: 'Elegant brass decorative items for home and office'
    },
    {
      id: 3,
      name: 'Industrial Components',
      image: '/images/components.jpg',
      description: 'Precision-engineered brass components'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Excellence in Brass Manufacturing</h1>
          <p>Quality craftsmanship with modern technology</p>
          <Link to="/contact" className="cta-button">Get Quote</Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Our Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link to="/contact" className="product-link">Learn More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="company-highlights">
        <h2>Why Choose Us</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <i className="fas fa-medal"></i>
            <h3>Quality Assured</h3>
            <p>ISO certified manufacturing process</p>
          </div>
          <div className="highlight-card">
            <i className="fas fa-shipping-fast"></i>
            <h3>Fast Delivery</h3>
            <p>Worldwide shipping available</p>
          </div>
          <div className="highlight-card">
            <i className="fas fa-tools"></i>
            <h3>Custom Solutions</h3>
            <p>Tailored to your specifications</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Your Project?</h2>
        <p>Contact us today for a free consultation</p>
        <Link to="/contact" className="cta-button">Contact Us</Link>
      </section>
    </div>
  );
}

export default Home;