
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const HotelContext = createContext();

export function HotelProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aurelle_user')) || null;
    } catch {
      return null;
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aurelle_reservations')) || [];
    } catch {
      return [];
    }
  });

  const [selectedRoom, setSelectedRoom] = useState(null);

  // Save user information
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aurelle_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aurelle_user');
    }
  }, [currentUser]);

  // Save reservations
  useEffect(() => {
    localStorage.setItem(
      'aurelle_reservations',
      JSON.stringify(reservations)
    );
  }, [reservations]);

  // Create account or sign in
  function loginUser(email, password, name = '') {
    if (!email || !password) {
      return { success: false, message: 'Please fill in all fields.' };
    }

    const user = {
      name: name || email.split('@')[0],
      email: email
    };

    setCurrentUser(user);

    return { success: true, message: 'Welcome to AURELLE!' };
  }

  // Sign out
  function logoutUser() {
    setCurrentUser(null);
  }

  // Select a room
  function chooseRoom(room) {
    setSelectedRoom(room);
  }

  // Add a reservation
  function createReservation(bookingDetails) {
    const newReservation = {
      id: Date.now(),
      ...bookingDetails,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setReservations(previous => [...previous, newReservation]);

    return newReservation;
  }

  // Cancel a reservation
  function cancelReservation(reservationId) {
    setReservations(previous =>
      previous.map(reservation =>
        reservation.id === reservationId
          ? { ...reservation, status: 'Cancelled' }
          : reservation
      )
    );
  }

  const value = {
    currentUser,
    reservations,
    selectedRoom,
    loginUser,
    logoutUser,
    chooseRoom,
    createReservation,
    cancelReservation
  };

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}
