// import Flight from '../models/Flight.js';

// export const getFlights = async (req, res) => {
//   const { from, to, date } = req.query;

//   try {
//     const flights = await Flight.find({
//       from,
//       to,
//       departureTime: { $gte: new Date(date) }
//     });

//     res.json(flights);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching flights', error });
//   }
// };


const Flight = require('../models/Flight');

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.bookFlight = async (req, res) => {
  const { user, flightId, seatsBooked, totalAmount } = req.body;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight || flight.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    flight.seatsAvailable -= seatsBooked;
    await flight.save();

    const booking = new Booking({
      user,
      flight: flightId,
      seatsBooked,
      totalAmount,
    });

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
