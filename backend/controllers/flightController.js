const Flight = require('../models/Flight');

exports.addFlight = async (req, res) => {
  try {
    const { flightNumber, from, to, departureTime, arrivalTime, price } = req.body;
    const flight = new Flight({ flightNumber, from, to, departureTime, arrivalTime, price });

    await flight.save();

    res.status(201).json({ message: 'Flight added successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Error adding flight', error });
  }
};

exports.editFlight = async (req, res) => {
  try {
    const { flightId, updates } = req.body;
    const flight = await Flight.findByIdAndUpdate(flightId, updates, { new: true });

    res.status(200).json({ message: 'Flight updated successfully', flight });
  } catch (error) {
    res.status(500).json({ message: 'Error updating flight', error });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json({ flights });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
};
