const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.createBooking);
router.get('/bookings/:userId', bookingController.getBookingsByUser);

module.exports = router;
