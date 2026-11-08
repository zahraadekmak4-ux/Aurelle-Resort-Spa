import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiArrowUpRight, FiLogOut } from 'react-icons/fi';
import { useHotel } from '../context/HotelContext';
 import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logoutUser } = useHotel();
  const navigate = useNavigate();

  // Close menu on ESC key press & auto-close menu on resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 992) setMenuOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logoutUser();
    closeMenu();
    navigate('/');
  }

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <>
      <nav className={`aurelle-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="aurelle-logo" onClick={closeMenu}>
            AURELLE<span className="dot">.</span>
            <small className="tagline">HOTEL & RESORT</small>
          </Link>

          <button
            className={`mobile-menu-btn ${menuOpen ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div
            id="navbar-menu"
            className={`navbar-content ${menuOpen ? 'show' : ''}`}
          >
            <div className="navbar-links">
              <NavLink to="/" end className={getNavLinkClass} onClick={closeMenu}>
                Home
              </NavLink>

              <NavLink to="/about" className={getNavLinkClass} onClick={closeMenu}>
                Our Experience
              </NavLink>
              <NavLink to="/rooms" className={getNavLinkClass} onClick={closeMenu}>
                Rooms & Suites
              </NavLink>
              
              <NavLink to="/contact" className={getNavLinkClass} onClick={closeMenu}>
               Contact Us
              </NavLink>
              <NavLink to="/reservations" className={getNavLinkClass} onClick={closeMenu}>
                My Reservations
              </NavLink>
            </div>

            <div className="navbar-actions">
              {currentUser ? (
                <div className="user-profile-menu">
                  <span className="navbar-account">
                    <span className="avatar-chip">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <FiUser />}
                    </span>
                    <span className="user-name">Welcome, {currentUser.name}</span>
                  </span>

                  <button
                    className="navbar-logout"
                    onClick={handleLogout}
                    title="Sign Out"
                  >
                    <FiLogOut />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="navbar-signin"
                  onClick={closeMenu}
                >
                  <FiUser />
                  <span>Sign In</span>
                </Link>
              )}

              <Link
                to="/rooms"
                className="navbar-book-btn"
                onClick={closeMenu}
              >
                <span>BOOK YOUR STAY</span>
                <FiArrowUpRight className="arrow-icon" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div 
          className="navbar-overlay" 
          onClick={closeMenu} 
          aria-hidden="true" 
        />
      )}
    </>
  );
}

export default Navbar;