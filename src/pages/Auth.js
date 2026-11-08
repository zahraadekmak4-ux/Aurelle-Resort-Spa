
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Auth.css';
import { useHotel } from '../context/HotelContext';

function Auth() {
  const navigate = useNavigate();
  const { currentUser, loginUser } = useHotel();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function switchMode() {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    if (!isLogin && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const result = loginUser(email.trim(), password, name.trim());

    if (result.success) {
      setSuccess(
        isLogin
          ? 'Welcome back to AURELLE!'
          : 'Your account has been created successfully!'
      );

      setTimeout(() => {
        navigate('/reservations');
      }, 1000);
    } else {
      setError(result.message);
    }
  }

  if (currentUser) {
    return (
      <>
        <Navbar />

        <section className="auth-logged-in">
          <div className="auth-success-icon">
            <FiCheckCircle />
          </div>

          <span className="section-eyebrow">AURELLE GUEST ACCOUNT</span>
          <h1>Welcome, {currentUser.name}.</h1>
          <p>You are already signed in to your AURELLE account.</p>

          <button
            className="auth-submit-button"
            onClick={() => navigate('/reservations')}
          >
            VIEW MY RESERVATIONS <FiArrowUpRight />
          </button>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="auth-page">
        <div className="auth-container">

          <div className="auth-image">
            <div className="auth-image-overlay"></div>

            <div className="auth-image-content">
              <span>WELCOME TO AURELLE</span>
              <h1>Every Journey<br />Deserves a<br /><em>Beautiful Stay.</em></h1>
              <p>
                Create memories in a place where comfort,
                elegance, and exceptional hospitality come together.
              </p>
            </div>

            <div className="auth-image-bottom">
              <span>AURELLE HOTEL & RESORT</span>
              <span>YOUR EXPERIENCE BEGINS HERE</span>
            </div>
          </div>

          <div className="auth-form-side">
            <div className="auth-form-container">

              <div className="auth-brand">
                AURELLE<span>.</span>
                <small>HOTEL & RESORT</small>
              </div>

              <span className="section-eyebrow">
                {isLogin ? 'WELCOME BACK' : 'JOIN THE AURELLE EXPERIENCE'}
              </span>

              <h2>
                {isLogin ? 'Sign In' : 'Create Your Account'}
              </h2>

              <p className="auth-description">
                {isLogin
                  ? 'Access your account and manage your reservations.'
                  : 'Create an account to begin your personalized stay experience.'}
              </p>

              <div className="auth-tabs">
                <button
                  type="button"
                  className={isLogin ? 'auth-tab-active' : ''}
                  onClick={() => {
                    if (!isLogin) switchMode();
                  }}
                >
                  LOGIN
                </button>

                <button
                  type="button"
                  className={!isLogin ? 'auth-tab-active' : ''}
                  onClick={() => {
                    if (isLogin) switchMode();
                  }}
                >
                  SIGN UP
                </button>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>

                {!isLogin && (
                  <div className="auth-field">
                    <label htmlFor="authName">FULL NAME</label>
                    <div className="auth-input-wrapper">
                      <FiUser />
                      <input
                        id="authName"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="authEmail">EMAIL ADDRESS</label>
                  <div className="auth-input-wrapper">
                    <FiMail />
                    <input
                      id="authEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="authPassword">PASSWORD</label>
                  <div className="auth-input-wrapper">
                    <FiLock />
                    <input
                      id="authPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      minLength="6"
                      required
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="auth-field">
                    <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                    <div className="auth-input-wrapper">
                      <FiLock />
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        minLength="6"
                        required
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="auth-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="auth-success-message">
                    <FiCheckCircle /> {success}
                  </div>
                )}

                <button type="submit" className="auth-submit-button">
                  {isLogin ? 'SIGN IN TO YOUR ACCOUNT' : 'CREATE ACCOUNT'}
                  <FiArrowUpRight />
                </button>
              </form>

              <div className="auth-switch">
                <span>
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </span>

                <button type="button" onClick={switchMode}>
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </div>

              <div className="auth-back-home">
                <Link to="/">BACK TO HOME</Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Auth;
