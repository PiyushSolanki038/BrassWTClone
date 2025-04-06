import React from 'react';
import './About.css';

function About() {
  const teamMembers = [
    {
      name: 'John Smith',
      position: 'CEO',
      image: '/images/team/ceo.jpg',
    },
    {
      name: 'Sarah Johnson',
      position: 'Production Manager',
      image: '/images/team/production.jpg',
    },
    {
      name: 'Mike Wilson',
      position: 'Quality Control Head',
      image: '/images/team/quality.jpg',
    }
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Our Company</h1>
        <p>Leading the brass manufacturing industry since 1990</p>
      </section>

      <section className="company-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>Founded in 1990, our brass factory has grown from a small workshop to a leading manufacturer of high-quality brass products. With over three decades of experience, we've established ourselves as a trusted name in the industry.</p>
          <p>Our commitment to quality and innovation has helped us serve clients across various sectors, from construction to decorative arts.</p>
        </div>
        <div className="story-image">
          <img src="/images/factory.jpg" alt="Our Factory" />
        </div>
      </section>

      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To deliver exceptional brass products that meet the highest standards of quality while maintaining sustainable manufacturing practices.</p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>To be the global leader in brass manufacturing, known for innovation, quality, and customer satisfaction.</p>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="certifications">
        <h2>Our Certifications</h2>
        <div className="cert-grid">
          <div className="cert-item">
            <img src="/images/iso-cert.png" alt="ISO Certification" />
            <p>ISO 9001:2015</p>
          </div>
          <div className="cert-item">
            <img src="/images/quality-cert.png" alt="Quality Certification" />
            <p>Quality Excellence</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;