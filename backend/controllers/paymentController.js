const stripe = require('stripe')(require('../config/config').STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');

exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent', error });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  const { userId, flightId, date, travelClass, price, paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }

    const booking = new Booking({ user: userId, flight: flightId, date, class: travelClass, price, status: 'Booked' });
    await booking.save();

    await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error processing booking', error });
  }
};
