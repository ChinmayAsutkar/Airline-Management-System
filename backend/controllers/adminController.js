const Admin = require('../models/Admin');
const Flight = require('../models/Flight');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addFlight = async (req, res) => {
  const { airline, from, to, departureTime, arrivalTime, price, seatsAvailable } = req.body;

  try {
    const newFlight = new Flight({
      airline,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      seatsAvailable,
    });

    const flight = await newFlight.save();
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
