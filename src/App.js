
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { HotelProvider } from './context/HotelContext';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Booking from './pages/Booking';
import MyReservations from './pages/MyReservations';
import About from './pages/About';
import Auth from './pages/Auth';
import Contact from './pages/Contact';

// Animated Routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HotelProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HotelProvider>
  );
}

export default App;
