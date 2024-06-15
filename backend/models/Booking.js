const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  date: { type: Date, required: true },
  class: { type: String, enum: ['Economy', 'First Class', 'Business Class'], required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
