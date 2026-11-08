
import deluxeRoom from '../assets/images/room-deluxe.jpg';
import twin from '../assets/images/twin.jpg';
import suiteRoom from '../assets/images/room-suite.jpg';
import junior from '../assets/images/junior1.jpg';
import executiveRoom from '../assets/images/room-executive1.jpg';
import royal from '../assets/images/royal1.png';
import presidentialRoom from '../assets/images/room-presidential.jpg';
import imperial from '../assets/images/imperial.jpg';
const rooms = [

  // =========================
  // DELUXE COLLECTION
  // =========================

  {
    id: 1,
    name: 'Deluxe Garden Room',
    category: 'Deluxe',
    price: 180,
    capacity: 2,
    size: 35,
    bed: '1 King Bed',
    image: deluxeRoom,
    description:
      'A beautifully designed room offering a peaceful garden atmosphere, elegant interiors, and everything you need for a relaxing stay.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Smart TV',
      'Private Bathroom'
    ]
  },

  {
    id: 5,
    name: 'Deluxe Twin Room',
    category: 'Deluxe',
    price: 200,
    capacity: 2,
    size: 40,
    bed: '2 Twin Beds',
    image: twin,
    description:
      'An inviting twin room featuring elegant furnishings, modern comforts, and a relaxing atmosphere for a memorable stay.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Smart TV',
      'Modern Bathroom',
      'Garden View'
    ]
  },

  // =========================
  // SUITE COLLECTION
  // =========================

  {
    id: 2,
    name: 'Premium Suite',
    category: 'Suite',
    price: 280,
    capacity: 2,
    size: 55,
    bed: '1 King Bed + Sofa bed',
    image: suiteRoom,
    description:
  'Experience refined comfort in our Premium Suite, featuring elegant interiors, a private balcony with beautiful sea views, and a spacious living area designed for a relaxing and memorable stay.',
    amenities: [
      'Sea View',
      'Free Wi-Fi',
      'Mini Bar',
      'Private Balcony'
    ]
  },

  {
    id: 6,
    name: 'Junior Suite (Sea View)',
    category: 'Suite',
    price: 310,
    capacity: 3,
    size: 60,
    bed: 'King Bed + Sofa Bed',
    image: junior,
    description:
  'Enjoy a relaxing stay in our elegant Junior Suite, featuring a spacious sitting area, modern interiors, and beautiful sea views from a private balcony. Designed to offer the perfect balance of comfort and style.',
    amenities: [
      'Separate Sitting Area',
      'Free Wi-Fi',
      'Mini Bar',
      'Luxury Bathroom',
      'Room Service'
    ]
  },

  // =========================
  // LUXURY COLLECTION
  // =========================

  {
    id: 3,
    name: 'Executive Luxury Suite',
    category: 'Luxury',
    price: 350,
    capacity: 3,
    size: 70,
    bed: '1 King Bed + Sofa Bed',
    image: executiveRoom,
    description:
      'Experience elevated comfort in an elegant suite featuring a spacious living area, premium furnishings, and refined amenities.',
    amenities: [
      'Living Area',
      'Free Wi-Fi',
      'Mini Bar',
      'Luxury Bathroom'
    ]
  },

  {
    id: 7,
    name: 'Royal Ocean Suite',
    category: 'Luxury',
    price: 420,
    capacity: 3,
    size: 85,
    bed: 'King Bed + Sofa Bed',
    image: royal,
    description:
      'A sophisticated ocean-inspired retreat offering panoramic views, a private balcony, and generous living space.',
    amenities: [
      'Panoramic Sea View',
      'Private Balcony',
      'Living Area',
      'Mini Bar',
      'Premium Bathroom'
    ]
  },

  // =========================
  // PRESIDENTIAL COLLECTION
  // =========================

  {
    id: 4,
    name: 'Royal Presidential Suite',
    category: 'Presidential',
    price: 520,
    capacity: 4,
    size: 110,
    bed: '2 King Beds',
    image: presidentialRoom,
    description:
      'Discover exceptional hospitality in a luxurious presidential suite featuring a private lounge, panoramic views, and exclusive amenities.',
    amenities: [
      'Private Lounge',
      'Panoramic View',
      'Jacuzzi',
      'Premium Service'
    ]
  },

  {
    id: 8,
    name: 'Imperial Presidential Suite',
    category: 'Presidential',
    price: 650,
    capacity: 5,
    size: 140,
    bed: '2 King Beds + Sofa Bed',
    image: imperial,
      descreption: 
      'Our finest accommodation, featuring an expansive private living room, elegant dining space, and exclusive luxury experiences.',
    amenities: [
      'Private Living Room',
      'Panoramic Sea View',
      'Private Jacuzzi',
      'Dining Area',
      'VIP Room Service',
      'Premium Amenities'
    ]
  }

];

export default rooms;
