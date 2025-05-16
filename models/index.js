// models/index.js

import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Heiß Getränke', 'Alkoholfreie Getränke', 'Alkoholische Getränke', 'Desserts', 'Vorspeise', 'Hauptspeise'],
  },
  image: {
    type: String,
    default: 'https://example.com/default-image.jpg',
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;