import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiUsers, FiMaximize2, FiCheck, FiWifi, FiCoffee, FiWind, FiTv } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import rooms from '../data/rooms';
import '../styles/RoomDetails.css';
import { useHotel } from '../context/HotelContext';

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedRoom, chooseRoom } = useHotel();

  const room = rooms.find(item => item.id === Number(id));

  useEffect(() => {
    if (room) {
      chooseRoom(room);
    }
  }, [id]);

  if (!room) {
    return (
      <>
        <Navbar />
        <section className="room-not-found">
          <h2>Room Not Found</h2>
          <p>Sorry, we couldn't find the accommodation you're looking for.</p>
          <button onClick={() => navigate('/rooms')}>
            BACK TO ROOMS
          </button>
        </section>
        <Footer />
      </>
    );
  }

  const amenityIcons = [FiWifi, FiCoffee, FiWind, FiTv];

  return (
    <>
      <Navbar />

      <section className="details-top">
        <div className="container">
          <button
            className="details-back"
            onClick={() => navigate('/rooms')}
          >
            <FiArrowLeft /> BACK TO ROOMS
          </button>

          <div className="details-heading">
            <div>
              <span className="section-eyebrow">
                AURELLE PRIVATE COLLECTION / {room.category.toUpperCase()}
              </span>
              <h1>{room.name}</h1>
              <p>{room.description}</p>
            </div>

            <div className="details-price">
              <strong>${room.price}</strong>
              <span>PER NIGHT</span>
            </div>
          </div>

          <div className="details-gallery">
            <div className="details-main-image">
              <img src={room.image} alt={room.name} />
            </div>
          </div>

          <div className="details-layout">
            <div className="details-information">
              <div className="details-section">
                <span className="section-eyebrow">THE EXPERIENCE</span>
                <h2>A Space Designed Around You</h2>
                <p>
                  Discover a refined atmosphere where every detail is
                  thoughtfully selected to make your stay exceptional.
                  From elegant interiors to carefully chosen amenities,
                  your comfort is always our priority.
                </p>
              </div>

              <div className="details-specifications">
                <div>
                  <FiUsers />
                  <span>GUESTS</span>
                  <strong>Up to {room.capacity}</strong>
                </div>

                <div>
                  <FiMaximize2 />
                  <span>ROOM SIZE</span>
                  <strong>{room.size} m²</strong>
                </div>

                <div>
                  <FiCheck />
                  <span>BED TYPE</span>
                  <strong>{room.beds}</strong>
                </div>
              </div>

              <div className="details-section details-amenities">
                <span className="section-eyebrow">COMFORT & CONVENIENCE</span>
                <h2>Room Amenities</h2>

                <div className="amenities-grid">
                  {room.amenities.map((amenity, index) => {
                    const AmenityIcon = amenityIcons[index % amenityIcons.length];

                    return (
                      <div className="amenity-item" key={amenity}>
                        <AmenityIcon />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="details-booking-card">
              <span className="section-eyebrow">YOUR PRIVATE RETREAT</span>
              <h3>Make It Yours</h3>
              <p>
                Your perfect stay is just one step away.
                Reserve this room and experience AURELLE hospitality.
              </p>

              <div className="booking-card-price">
                <strong>${room.price}</strong>
                <span>/ night</span>
              </div>

              <div className="booking-card-divider"></div>

              <div className="booking-card-info">
                <span>Room category</span>
                <strong>{room.category}</strong>
              </div>

              <div className="booking-card-info">
                <span>Maximum guests</span>
                <strong>{room.capacity} Guests</strong>
              </div>

              <button
                className="details-book-button"
                onClick={() => navigate(`/booking/${room.id}`)}
              >
                RESERVE THIS ROOM <FiArrowUpRight />
              </button>

              <small>Best experiences. Thoughtfully delivered.</small>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RoomDetails;
