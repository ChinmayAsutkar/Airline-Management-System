import Flight from '../models/Flight.js';

export const getFlights = async (req, res) => {
  const { from, to, date } = req.query;

  try {
    const flights = await Flight.find({
      from,
      to,
      departureTime: { $gte: new Date(date) }
    });

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
};
