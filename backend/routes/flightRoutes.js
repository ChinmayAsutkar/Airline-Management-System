// import express from 'express';
// import { getFlights } from '../controllers/flightController.js';

// const router = express.Router();

// router.get('/', getFlights);

// export default router;

const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', flightController.getFlights);
router.get('/:id', flightController.getFlightById);
router.post('/book', authMiddleware.userAuth, flightController.bookFlight);

module.exports = router;
