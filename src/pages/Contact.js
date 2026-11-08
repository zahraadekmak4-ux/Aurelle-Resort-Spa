import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowUpRight, FiSend } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contact.css';
import contact from '../assets/images/contact.jpg';
import seaView from '../assets/images/sea-view.jpg';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Thank you for contacting AURELLE. We will get back to you soon!');

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <Navbar />

      {/* Contact Hero */}
      <section
        className="contact-hero"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="contact-hero-overlay"></div>

        <div className="container contact-hero-content">
          <span>WE ARE HERE FOR YOU</span>

          <h1>
            Let's Start a <em>Conversation.</em>
          </h1>

          <p>
            Whether you have a question or need assistance,
            our team is always happy to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">

          <div className="contact-heading">
            <span className="section-eyebrow">GET IN TOUCH</span>

            <h2>
              We'd Love to <em>Hear From You.</em>
            </h2>

            <p>
              Reach out to us and let us make your AURELLE
              experience even more special.
            </p>
          </div>

          <div className="contact-grid">

            {/* Contact Information */}
            <div className="contact-information">
              <span className="contact-small-title">
                CONTACT INFORMATION
              </span>

              <h3>Let's Connect.</h3>

              <p>
                Our hospitality team is available to answer
                your questions and assist with your stay.
              </p>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMapPin />
                </div>

                <div>
                  <h4>Our Location</h4>
                  <p>Tyre, South Lebanon</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiPhone />
                </div>

                <div>
                  <h4>Phone Number</h4>
                  <a href="tel:+96170000000">
                    +961 70 000 000
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMail />
                </div>

                <div>
                  <h4>Email Address</h4>
                  <a href="mailto:info@aurellehotel.com">
                    info@aurellehotel.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiClock />
                </div>

                <div>
                  <h4>Reception Hours</h4>
                  <p>Available 24 Hours / 7 Days</p>
                </div>
              </div>

              <div className="contact-social-note">
                <span>YOUR COMFORT IS OUR PRIORITY</span>
                <strong>
                  AURELLE — Hospitality, Redefined.
                </strong>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <span className="contact-small-title">
                SEND US A MESSAGE
              </span>

              <h3>How Can We Help?</h3>

              <form
                onSubmit={handleSubmit}
                className="contact-form"
              >

                <div className="contact-form-row">
                  <div className="contact-input-group">
                    <label>FULL NAME</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-input-group">
                    <label>EMAIL ADDRESS</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-input-group">
                    <label>PHONE NUMBER</label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="+961 ..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-input-group">
                    <label>SUBJECT</label>

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose a subject</option>
                      <option value="Reservations">Reservations</option>
                      <option value="Rooms">Rooms & Suites</option>
                      <option value="Services">Hotel Services</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="contact-input-group">
                  <label>YOUR MESSAGE</label>

                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact-submit-button"
                >
                  SEND MESSAGE <FiSend />
                </button>

              </form>
            </div>

          </div>

          {/* Location Section */}
          <div
            className="contact-location"
            style={{
              backgroundImage: `linear-gradient(rgba(25, 30, 25, 0.35), rgba(25, 30, 25, 0.55)), url(${seaView})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div>
              <span className="section-eyebrow">FIND US</span>

              <h2>
                Discover AURELLE in <em>Tyre, South Lebanon.</em>
              </h2>

              <p>
                A beautiful destination in the heart of
                South Lebanon.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Tyre+Lebanon"
                target="_blank"
                rel="noreferrer"
                className="contact-map-link"
              >
                EXPLORE OUR LOCATION <FiArrowUpRight />
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
