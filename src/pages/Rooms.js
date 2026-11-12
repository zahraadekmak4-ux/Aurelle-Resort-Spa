import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUsers, FiMaximize2, FiArrowUpRight, FiSliders, FiArrowDown } from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import rooms from '../data/rooms';
import '../styles/Rooms.css';
import { useHotel } from '../context/HotelContext';

function Rooms() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [activeCategory, setActiveCategory] = useState('All');

  const { chooseRoom } = useHotel();
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Deluxe',
      subtitle: 'Comfort meets timeless elegance.',
      description:
        'Discover beautifully appointed spaces designed for relaxation, comfort, and a peaceful escape.',
      number: '01'
    },
    {
      name: 'Suite',
      subtitle: 'Space to unwind. Luxury to remember.',
      description:
        'Experience generous living spaces, refined details, and exceptional views in our exclusive suites.',
      number: '02'
    },
    {
      name: 'Luxury',
      subtitle: 'An elevated stay in every detail.',
      description:
        'Thoughtfully designed interiors and premium amenities create an unforgettable experience.',
      number: '03'
    },
    {
      name: 'Presidential',
      subtitle: 'The art of exceptional hospitality.',
      description:
        'Discover our finest accommodation, where privacy, sophistication, and exclusive comfort come together.',
      number: '04'
    }
  ];

 // Search rooms
let filteredRooms = rooms.filter(room => {
  const searchValue = search.toLowerCase();

  return (
    room.name.toLowerCase().includes(searchValue) ||
    (room.category || '').toLowerCase().includes(searchValue) ||
    (room.description || '').toLowerCase().includes(searchValue)
  );
});

  // Sort rooms by price
  if (sort === 'low') {
    filteredRooms = [...filteredRooms].sort(
      (a, b) => a.price - b.price
    );
  } else if (sort === 'high') {
    filteredRooms = [...filteredRooms].sort(
      (a, b) => b.price - a.price
    );
  }

  // Group rooms by category
  const categorySections = categories
    .map(category => ({
      ...category,
      rooms: filteredRooms.filter(
        room => room.category === category.name
      )
    }))
    .filter(category => category.rooms.length > 0);

  // Open room details
  function openRoom(room) {
    if (!room || room.id === undefined) return;

    chooseRoom(room);
    navigate(`/rooms/${room.id}`);
  }

  // Scroll to selected category
  function scrollToCategory(categoryName) {
    setActiveCategory(categoryName);

    if (categoryName === 'All') {
      document.getElementById('rooms-collection')?.scrollIntoView({
        behavior: 'smooth'
      });
      return;
    }

    document.getElementById(`category-${categoryName}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="rooms-hero">
        <div className="rooms-hero-overlay"></div>

        <div className="container rooms-hero-content">
          <span>THE AURELLE COLLECTION</span>

          <h1>
            Rooms & <em>Suites</em>
          </h1>

          <p>
            Discover thoughtfully designed spaces where
            comfort meets timeless elegance.
          </p>

          <a href="#rooms-collection" className="rooms-hero-link">
            EXPLORE OUR COLLECTION
            <FiArrowDown />
          </a>
        </div>
      </section>

      {/* ROOMS COLLECTION */}
      <section
        className="rooms-listing-section"
        id="rooms-collection"
      >
        <div className="container">

          {/* PAGE HEADING */}
          <div className="rooms-page-heading">
            <div>
              <span className="section-eyebrow">
                FIND YOUR PERFECT STAY
              </span>

              <h2>
                A Collection of <em>Exceptional Stays</em>
              </h2>

              <p>
                From intimate retreats to extraordinary suites,
                discover the perfect setting for your stay.
              </p>
            </div>

            <div className="rooms-count">
              <strong>{filteredRooms.length}</strong>
              <span> ACCOMMODATIONS</span>
            </div>
          </div>

          {/* SEARCH AND SORT */}
          <div className="rooms-filter-bar">

            <div className="rooms-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Search by room name, category..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="rooms-sort">
              <FiSliders />

              <select
                value={sort}
                onChange={event => setSort(event.target.value)}
              >
                <option value="default">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* CATEGORY NAVIGATION */}
          <div className="room-categories">

            <span className="category-nav-label">
              EXPLORE BY CATEGORY
            </span>

            <div className="category-nav-links">
              <button
                className={
                  activeCategory === 'All' ? 'category-active' : ''
                }
                onClick={() => scrollToCategory('All')}
              >
                All Collections
              </button>

              {categories.map(category => (
                <button
                  key={category.name}
                  className={
                    activeCategory === category.name ? 'category-active'  : ''
                  }
                  onClick={() => scrollToCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* CATEGORY SECTIONS */}
          {categorySections.length > 0 ? (

            <div className="rooms-collections">

              {categorySections.map(category => (

                <section
                  className="room-category-section"
                  id={`category-${category.name}`}
                  key={category.name}
                >

                  {/* CATEGORY HEADING */}
                  <div className="category-section-heading">

                    <div className="category-title-group">

                      <span className="category-number">
                        {category.number} / THE COLLECTION
                      </span>

                      <h2>
                        {category.name}
                        {category.name === 'Presidential' ? (
                          <em> Suites</em>
                        ) : (
                          <em> Collection</em>
                        )}
                      </h2>

                      <p>{category.description}</p>

                    </div>

                    <div className="category-room-count">
                      <span>
                        {category.rooms.length.toString().padStart(2, '0')}
                      </span>
                      <small>ROOMS</small>
                    </div>

                  </div>

                  {/* ROOM CARDS */}
                  <div className="rooms-grid">

                    {category.rooms.map(room => (

                      <article
                        className="room-listing-card"
                        key={room.id}
                      >

                        {/* IMAGE */}
                        <div className="room-listing-image">

                          <img
                            src={room.image}
                            alt={room.name}
                            loading="lazy"
                          />

                          <span className="listing-category">
                            {room.category}
                          </span>

                          <button
                            className="listing-view-btn"
                            onClick={() => openRoom(room)}
                            aria-label={`View ${room.name}`}
                          >
                            <FiArrowUpRight />
                          </button>

                        </div>

                        {/* ROOM DETAILS */}
                        <div className="room-listing-content">

                          <span className="listing-subtitle">
                            AURELLE PRIVATE COLLECTION
                          </span>

                          <h3>{room.name}</h3>

                          <p>{room.description}</p>

                          {/* FEATURES */}
                          <div className="room-listing-features">

                            <span>
                              <FiMaximize2 />
                              {room.size} m²
                            </span>

                            <span>
                              <FiUsers />
                              {room.capacity} Guests
                            </span>

                          </div>

                          {/* PRICE AND DETAILS */}
                          <div className="room-listing-footer">

                            <div className="listing-price">
                              <strong>${room.price}</strong>
                              <span>/ NIGHT</span>
                            </div>

                            <button
                              className="view-room-link"
                              onClick={() => openRoom(room)}
                            >
                              EXPLORE ROOM
                              <FiArrowUpRight />
                            </button>

                          </div>

                        </div>

                      </article>

                    ))}

                  </div>

                </section>

              ))}

            </div>

          ) : (

            /* EMPTY SEARCH RESULTS */
            <div className="no-rooms-found">

              <div className="no-rooms-icon">
                <FiSearch />
              </div>

              <h3>No rooms found</h3>

              <p>
                We couldn't find any accommodation matching your search.
                Try another room name or category.
              </p>

              <button
                className="primary-button"
                onClick={() => {
                  setSearch('');
                  setSort('default');
                  setActiveCategory('All');
                }}
              >
                CLEAR SEARCH
              </button>

            </div>

          )}

          {/* BOTTOM NOTE */}
          {filteredRooms.length > 0 && (
            <div className="rooms-bottom-note">
              <span>THE AURELLE EXPERIENCE</span>
              <p>
                Every stay is thoughtfully designed to make
                your time with us truly exceptional.
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Rooms;
