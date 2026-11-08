import React from 'react';
import { Link } from 'react-router-dom';
import enter from '../assets/images/entrance.png';
import {FiArrowRight, FiArrowUpRight, FiStar} from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';
import rooms from '../data/rooms';

function Home() {

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="home-hero"
        style={{
          backgroundImage: `url(${enter})`,
        }}
      >
        <div className="hero-shade"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <span className="eyebrow-line"></span> THE ART OF LUXURY HOSPITALITY
            </span>

            <h1>
              Escape the Ordinary.
              <br />
              <em>Experience AURELLE.</em>
            </h1>

            <p>
              Discover a world of timeless elegance, exceptional comfort, and
              unforgettable moments. Your extraordinary escape begins here.
            </p>

            <div className="hero-buttons">
              <Link to="/rooms" className="primary-button">
                EXPLORE OUR ROOMS <FiArrowRight className="btn-icon" />
              </Link>

              <Link to="/about" className="text-button">
                Discover our story <FiArrowUpRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-caption container">
          <span>AN EXPERIENCE BEYOND EXPECTATIONS</span>
          <span>01 / AURELLE COLLECTION</span>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="home-intro-section">
        <div className="container">
          <div className="intro-grid">

            <div className="intro-image-wrapper">
              <div className="img-frame">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"
                  alt="Elegant luxury hotel interior"
                />
              </div>

              <div className="intro-image-note">
                <span>THE AURELLE EXPERIENCE</span>
                <strong>Elegance in every detail.</strong>
              </div>
            </div>

            <div className="intro-content">
              <span className="section-eyebrow">WELCOME TO AURELLE</span>

              <h2>
                A Place Where
                <br />
                <em>Time Slows Down.</em>
              </h2>

              <p>
                At AURELLE, luxury is more than beautiful spaces. It is the
                feeling of being welcomed, the comfort of thoughtful details, and
                the joy of moments that stay with you long after your visit.
              </p>

              <p>
                Every experience is designed to bring together refined hospitality,
                peaceful surroundings, and unforgettable memories.
              </p>

              <Link to="/about" className="underlined-link">
                DISCOVER OUR STORY <FiArrowRight />
              </Link>

              <div className="intro-statistics">
                <div className="stat-item">
                  <strong>15+</strong>
                  <span>YEARS OF EXCELLENCE</span>
                </div>
                <div className="stat-item">
                  <strong>98%</strong>
                  <span>GUEST SATISFACTION</span>
                </div>
                <div className="stat-item">
                  <strong>24/7</strong>
                  <span>PERSONAL SERVICE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial-section">
        <div className="container text-center">
          <span className="section-eyebrow">WORDS FROM OUR GUESTS</span>

          <div className="testimonial-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <FiStar key={star} />
            ))}
          </div>

          <h2>
            “An experience that made
            <br />
            <em>every moment feel special.</em>”
          </h2>

          <p className="testimonial-quote">
            From the beautiful surroundings to the thoughtful service, every detail
            made our stay truly memorable.
          </p>

          <span className="testimonial-author">A HAPPY AURELLE GUEST</span>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="home-cta">
        <div className="container">
          <span className="cta-eyebrow">YOUR NEXT ESCAPE STARTS HERE</span>
          <h2>Make Room for <em>Something Beautiful.</em></h2>
          <Link to="/rooms" className="primary-button cta-button">
            RESERVE YOUR STAY <FiArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;