// lib/db.js
const fakeData = [
  {
    _id: '1',
    name: 'Cappuccino',
    description: 'Hot espresso with steamed milk and foam.',
    price: 3.5,
    category: 'Heiß Getränke',
    available: true,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0'
  },
  {
    _id: '2',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 2.5,
    category: 'Alkoholfreie Getränke',
    available: true,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce'
  },
  {
    _id: '3',
    name: 'Red Wine',
    description: 'Premium red wine.',
    price: 5.0,
    category: 'Alkoholische Getränke',
    available: true,
    image: 'https://images.unsplash.com/photo-1542038784456-8e3195a1e0b4'
  },
  {
    _id: '4',
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake.',
    price: 4.0,
    category: 'Desserts',
    available: true,
    image: 'https://images.unsplash.com/photo-1599785209707-28d8a509fc95'
  },
  {
    _id: '5',
    name: 'Caesar Salad',
    description: 'Classic Caesar salad with crispy croutons.',
    price: 6.0,
    category: 'Vorspeise',
    available: true,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307'
  },
  {
    _id: '6',
    name: 'Grilled Steak',
    description: 'Juicy grilled steak with side salad.',
    price: 12.0,
    category: 'Hauptspeise',
    available: true,
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be86b'
  }
];

export const getMenuItems = () => {
  return fakeData;
};

// lib/db.js

const fakeImages = [
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
  "https://images.unsplash.com/photo-1533025780125-2c0b2dc6b4cb"
];

export const getHomeImages = () => {
  return fakeImages;
};
