import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiArrowUpRight, FiMail } from 'react-icons/fi';

import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="aurelle-footer">
      <div className="container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              AURELLE<span className="dot">.</span>
            </Link>

            <p className="brand-description">
              A destination of timeless elegance,
              exceptional hospitality, and unforgettable experiences.
            </p>

            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <Link to="/contact" aria-label="Contact Us">
                <FiMail />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            ©  AURELLE HOTEL & RESORT.
            ALL RIGHTS RESERVED.
          </p>

          <Link to="/contact" className="footer-back-link">
            GET IN TOUCH <FiArrowUpRight />
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
