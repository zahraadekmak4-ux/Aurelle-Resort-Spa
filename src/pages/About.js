import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCoffee, FiHeart, FiSun, FiWifi, FiWind, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/About.css';
import hotelLobby from '../assets/images/hotel-lobby.jpg';
import pool from '../assets/images/pool.jpg';
import restaurant from '../assets/images/restaurant.jpg';
import spa from '../assets/images/spa.jpg';
import aboutHero from '../assets/images/about-hero.png';

function About() {
  const services = [
    {
      icon: FiCoffee,
      title: 'Fine Dining',
      description:
        'Discover exceptional culinary experiences with carefully prepared dishes and elegant dining spaces.'
    },
    {
      icon: FiSun,
      title: 'Wellness & Spa',
      description:
        'Relax, recharge, and enjoy moments of tranquility through our wellness and relaxation experiences.'
    },
    {
      icon: FiWifi,
      title: 'Modern Connectivity',
      description:
        'Stay connected throughout your visit with complimentary high-speed Wi-Fi and modern facilities.'
    },
    {
      icon: FiWind,
      title: 'Personal Comfort',
      description:
        'Enjoy thoughtfully designed spaces and attentive services that make every stay comfortable.'
    },
    {
      icon: FiHeart,
      title: 'Personalized Care',
      description:
        'Our hospitality team is dedicated to making every guest feel welcomed and valued.'
    },
    {
      icon: FiClock,
      title: '24/7 Guest Support',
      description:
        'Our guest services team is available around the clock to assist with your needs.'
    }
  ];

  return (
    <>
      <Navbar />

      <section
  className="about-hero"
  style={{ backgroundImage: `url(${aboutHero})` }}
>
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <span>THE ART OF HOSPITALITY</span>
          <h1>More Than a Stay.<br /><em>A Feeling.</em></h1>
          <p>
            A destination where timeless elegance meets
            thoughtful hospitality.
          </p>
        </div>
      </section>

      <section className="about-introduction">
        <div className="container about-intro-grid">
          <div className="about-intro-image">
            <img  src={hotelLobby} alt="Elegant AURELLE hotel lobby" />
            <div className="about-image-caption">
              <span>01 / THE AURELLE EXPERIENCE</span>
            </div>
          </div>

          <div className="about-intro-content">
            <span className="section-eyebrow">OUR STORY</span>
            <h2>Where Every Detail Has a Purpose.</h2>

            <p>
              At AURELLE, we believe that exceptional hospitality
              is found in the details. Every space, every service,
              and every interaction is thoughtfully designed to
              create a memorable experience.
            </p>

            <p>
              Our philosophy combines timeless design, modern
              comfort, and genuine care to create a welcoming
              destination for every guest.
            </p>

            <div className="about-signature">
              <span>AURELLE</span>
              <small>HOSPITALITY, REDEFINED.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="container">
          <span className="section-eyebrow">OUR PHILOSOPHY</span>
          <h2>Elegance Is Not Just What You See.<br />
            It's How You Feel.</h2>
          <p>
            From the first welcome to the final farewell,
            we focus on creating moments that stay with you.
            Because the best journeys are remembered not only
            for where you stayed, but for how you felt.
          </p>
        </div>
      </section>

      <section className="about-services">
        <div className="container">
          <div className="about-services-heading">
            <div>
              <span className="section-eyebrow">THOUGHTFULLY CURATED</span>
              <h2>Services & Experiences</h2>
              <p>
                Everything you need for a comfortable and
                unforgettable stay.
              </p>
            </div>

            <Link to="/rooms" className="about-explore-link">
              EXPLORE ACCOMMODATIONS <FiArrowUpRight />
            </Link>
          </div>

          <div className="about-services-grid">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;

              return (
                <article className="about-service-card" key={service.title}>
                  <span className="about-service-number">
                    0{index + 1}
                  </span>

                  <div className="about-service-icon">
                    <ServiceIcon />
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-gallery">
        <div className="container">
          <div className="about-gallery-heading">
            <span className="section-eyebrow">A GLIMPSE INTO AURELLE</span>
            <h2>Spaces Made to Inspire.</h2>
          </div>

          <div className="about-gallery-grid">
            <div className="about-gallery-large">
              <img
  src={pool}
  alt="Luxury AURELLE resort swimming pool"
/>
            </div>

            <div className="about-gallery-small">
             <img
  src={restaurant}
  alt="AURELLE fine dining restaurant"
/>

              <img
  src={spa}
  alt="AURELLE spa and wellness experience"
/>
            </div>
          </div>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="container">
          <FiStar className="about-cta-star" />
          <span className="section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Experience the AURELLE Difference.</h2>
          <p>
            Discover a place where every stay becomes
            a story worth remembering.
          </p>
          <Link to="/rooms" className="about-cta-button">
            DISCOVER YOUR STAY <FiArrowUpRight />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
