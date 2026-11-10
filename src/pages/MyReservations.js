import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers, FiArrowUpRight, FiXCircle, FiClipboard, FiPlus, FiCheckCircle } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MyReservations.css';
import { useHotel } from '../context/HotelContext';

function MyReservations() {
  const navigate = useNavigate();

  const { currentUser, reservations, cancelReservation } = useHotel();

  const [filter, setFilter] = useState('All');
  const [cancelMessage, setCancelMessage] = useState('');

  const userReservations = currentUser
    ? reservations.filter(
        reservation => reservation.guestEmail === currentUser.email
      )
    : [];

  const filteredReservations = userReservations.filter(reservation => {
    if (filter === 'All') return true;
    return reservation.status === filter;
  });

  function handleCancel(id) {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this reservation?'
    );

    if (confirmed) {
      cancelReservation(id);
      setCancelMessage('Your reservation has been cancelled successfully.');

      setTimeout(() => {
        setCancelMessage('');
      }, 3000);
    }
  }

  if (!currentUser) {
    return (
      <>
        <Navbar />

        <section className="reservations-empty">
          <div className="reservations-empty-icon">
            <FiClipboard />
          </div>

          <span className="section-eyebrow">WELCOME TO AURELLE</span>
          <h1>Your Reservations</h1>
          <p>
            Please sign in to view and manage your reservations.
          </p>

          <button
            className="reservations-primary-button"
            onClick={() => navigate('/auth')}
          >
            SIGN IN <FiArrowUpRight />
          </button>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="reservations-page">
        <div className="container">

          <div className="reservations-heading">
            <span className="section-eyebrow">
              YOUR AURELLE EXPERIENCE
            </span>

            <h1>My <em>Reservations</em></h1>

            <p>
              Welcome back, {currentUser.name}.
              Here you can view and manage your stays.
            </p>
          </div>

          <div className="reservations-stats">
            <div className="reservation-stat">
              <span>TOTAL RESERVATIONS</span>
              <strong>{userReservations.length}</strong>
            </div>

            <div className="reservation-stat">
              <span>CONFIRMED</span>
              <strong>
                {userReservations.filter(
                  item => item.status === 'Confirmed'
                ).length}
              </strong>
            </div>

            <div className="reservation-stat">
              <span>CANCELLED</span>
              <strong>
                {userReservations.filter(
                  item => item.status === 'Cancelled'
                ).length}
              </strong>
            </div>
          </div>

          <div className="reservations-list-heading">
            <div>
              <span className="section-eyebrow">YOUR BOOKINGS</span>
              <h2>Reservation History</h2>
            </div>

            <button
              className="new-reservation-button"
              onClick={() => navigate('/rooms')}
            >
              <FiPlus /> BOOK A ROOM
            </button>
          </div>

          <div className="reservation-filters">
            {['All', 'Confirmed', 'Cancelled'].map(item => (
              <button
                key={item}
                className={filter === item ? 'reservation-filter-active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {cancelMessage && (
            <div className="reservation-success-message">
              <FiCheckCircle /> {cancelMessage}
            </div>
          )}

          {filteredReservations.length > 0 ? (
            <div className="reservations-list">
              {filteredReservations
                .slice()
                .sort((a, b) => b.id - a.id)
                .map(reservation => (
                  <article
                    className="reservation-card"
                    key={reservation.id}
                  >
                    <div className="reservation-card-image">
                      <img
                        src={reservation.roomImage}
                        alt={reservation.roomName}
                      />
                    </div>

                    <div className="reservation-card-content">
                      <div className="reservation-card-top">
                        <div>
                          <span className="section-eyebrow">
                            RESERVATION #{String(reservation.id).slice(-6)}
                          </span>
                          <h3>{reservation.roomName}</h3>
                        </div>

                        <span
                          className={`reservation-status ${
                            reservation.status === 'Confirmed'
                              ? 'status-confirmed'
                              : 'status-cancelled'
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </div>

                      <div className="reservation-details-grid">
                        <div>
                          <FiCalendar />
                          <span>CHECK-IN</span>
                          <strong>{reservation.checkIn}</strong>
                        </div>

                        <div>
                          <FiCalendar />
                          <span>CHECK-OUT</span>
                          <strong>{reservation.checkOut}</strong>
                        </div>

                        <div>
                          <FiUsers />
                          <span>GUESTS</span>
                          <strong>{reservation.guests}</strong>
                        </div>
                      </div>

                      <div className="reservation-card-bottom">
                        <div>
                          <span>{reservation.nights} NIGHT(S)</span>
                          <strong>${reservation.totalPrice}</strong>
                        </div>

                        {reservation.status === 'Confirmed' && (
                          <button
                            className="cancel-reservation-button"
                            onClick={() => handleCancel(reservation.id)}
                          >
                            <FiXCircle /> CANCEL BOOKING
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="reservations-no-results">
              <FiClipboard />
              <h3>
                {filter === 'All'
                  ? 'No Reservations Yet'
                  : `No ${filter} Reservations`}
              </h3>

              <p>
                {filter === 'All'
                  ? 'Your next memorable stay is waiting for you.'
                  : 'There are no reservations in this category.'}
              </p>

              <button
                className="reservations-primary-button"
                onClick={() => navigate('/rooms')}
              >
                EXPLORE ROOMS <FiArrowUpRight />
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyReservations;
