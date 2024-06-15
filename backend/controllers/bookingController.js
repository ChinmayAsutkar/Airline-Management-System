const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const { userId, flightId, date, travelClass, price } = req.body;

    const booking = new Booking({ user: userId, flight: flightId, date, class: travelClass, price, status: 'Booked' });
    await booking.save();

    await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).populate('flight');

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
