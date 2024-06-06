import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { userId, flightId, transactionId } = req.body;

  try {
    const booking = new Booking({ user: userId, flight: flightId, transactionId });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

export const getBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
