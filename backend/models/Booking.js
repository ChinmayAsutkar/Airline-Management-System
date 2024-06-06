import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
