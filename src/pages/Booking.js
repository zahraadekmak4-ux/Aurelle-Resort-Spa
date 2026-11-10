import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiCalendar, FiUsers, FiArrowLeft, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import rooms from '../data/rooms.js';
import '../styles/Booking.css';
import { useHotel } from '../context/HotelContext';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser, selectedRoom, createReservation } = useHotel();

  const room = rooms.find(item => item.id === Number(id)) || selectedRoom;

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (room) {
      setGuests(1);
    }
  },[room]);

  const today = new Date().toISOString().split('T')[0];

  const numberOfNights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut + 'T00:00:00') -
              new Date(checkIn + 'T00:00:00')) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = room ? numberOfNights * room.price : 0;

  function handleBooking(event) {
    event.preventDefault();
    setError('');

    if (!room) {
      setError('Please select a room first.');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select your check-in and check-out dates.');
      return;
    }

    if (checkIn < today) {
      setError('Check-in date cannot be in the past.');
      return;
    }

    if (checkOut <= checkIn) {
      setError('Check-out must be after check-in.');
      return;
    }

    if (guests < 1 || guests > room.capacity) {
      setError(`This room allows up to ${room.capacity} guests.`);
      return;
    }

    if (!currentUser) {
      navigate('/auth');
      return;
    }

    createReservation({
      roomId: room.id,
      roomName: room.name,
      roomImage: room.image,
      roomPrice: room.price,
      guestName: currentUser.name,
      guestEmail: currentUser.email,
      checkIn,
      checkOut,
      guests: Number(guests),
      nights: numberOfNights,
      totalPrice,
      specialRequests
    });

    setSuccess(true);
  }

  if (!room) {
    return (
      <>
        <Navbar />
        <section className="booking-not-found">
          <h2>No Room Selected</h2>
          <p>Please choose a room before making a reservation.</p>
          <button onClick={() => navigate('/rooms')}>
            EXPLORE ROOMS
          </button>
        </section>
        <Footer />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <section className="booking-success">
          <div className="success-icon">
            <FiCheckCircle />
          </div>
          <span className="section-eyebrow">AURELLE HOSPITALITY</span>
          <h1>Your Stay Awaits.</h1>
          <p>
            Your reservation has been saved successfully.
            We look forward to welcoming you to AURELLE.
          </p>

          <div className="success-summary">
            <span>Accommodation</span>
            <strong>{room.name}</strong>

            <span>Check-in</span>
            <strong>{checkIn}</strong>

            <span>Check-out</span>
            <strong>{checkOut}</strong>

            <span>Total amount</span>
            <strong>${totalPrice}</strong>
          </div>

          <button
            className="booking-submit-button"
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

      <section className="booking-page">
        <div className="container">
          <button
            className="details-back"
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            <FiArrowLeft /> BACK TO ROOM DETAILS
          </button>

          <div className="booking-page-heading">
            <span className="section-eyebrow">RESERVE YOUR EXPERIENCE</span>
            <h1>Complete Your <em>Stay</em></h1>
            <p>
              A few details are all that stand between you
              and an exceptional experience.
            </p>
          </div>

          <div className="booking-layout">
            <form className="booking-form" onSubmit={handleBooking}>
              <div className="booking-form-section">
                <span className="section-eyebrow">01 / YOUR STAY</span>
                <h2>Reservation Details</h2>

                <div className="booking-input-grid">
                  <div className="booking-field">
                    <label htmlFor="checkIn">CHECK-IN DATE</label>
                    <div className="booking-input-wrapper">
                      <FiCalendar />
                      <input
                        id="checkIn"
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={event => {
                          setCheckIn(event.target.value);
                          if (checkOut && event.target.value >= checkOut) {
                            setCheckOut('');
                          }
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="checkOut">CHECK-OUT DATE</label>
                    <div className="booking-input-wrapper">
                      <FiCalendar />
                      <input
                        id="checkOut"
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={event => setCheckOut(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="guests">NUMBER OF GUESTS</label>
                    <div className="booking-input-wrapper">
                      <FiUsers />
                      <select
                        id="guests"
                        value={guests}
                        onChange={event => setGuests(Number(event.target.value))}
                      >
                        {Array.from(
                          { length: room.capacity },
                          (_, index) => index + 1
                        ).map(number => (
                          <option key={number} value={number}>
                            {number} {number === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="booking-form-section">
                <span className="section-eyebrow">02 / PERSONAL TOUCHES</span>
                <h2>Special Requests</h2>
                <p className="booking-section-description">
                  Let us know if there is anything that would
                  make your stay more comfortable.
                </p>

                <textarea
                  value={specialRequests}
                  onChange={event => setSpecialRequests(event.target.value)}
                  placeholder="Your requests or preferences (optional)..."
                  rows="5"
                />
              </div>

              {error && (
                <div className="booking-error">
                  {error}
                </div>
              )}

              {!currentUser && (
                <p className="booking-login-note">
                  You will be asked to sign in before confirming your reservation.
                </p>
              )}

              <button type="submit" className="booking-submit-button">
                CONFIRM RESERVATION <FiArrowUpRight />
              </button>
            </form>

            <aside className="booking-summary">
              <span className="section-eyebrow">YOUR SELECTION</span>
              <div className="booking-summary-image">
                <img src={room.image} alt={room.name} />
              </div>

              <span className="booking-summary-category">{room.category}</span>
              <h3>{room.name}</h3>
              <p className="booking-summary-description">
                {room.size} m² · Up to {room.capacity} guests
              </p>

              <div className="booking-summary-divider"></div>

              <div className="booking-summary-row">
                <span>Price per night</span>
                <strong>${room.price}</strong>
              </div>

              <div className="booking-summary-row">
                <span>Number of nights</span>
                <strong>{numberOfNights}</strong>
              </div>

              <div className="booking-summary-row">
                <span>Guests</span>
                <strong>{guests}</strong>
              </div>

              <div className="booking-summary-divider"></div>

              <div className="booking-total">
                <span>ESTIMATED TOTAL</span>
                <strong>${totalPrice}</strong>
              </div>

              <small>
                Total is calculated from the selected room rate
                and number of nights.
              </small>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Booking;
