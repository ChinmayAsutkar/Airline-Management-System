const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

router.post('/add-flight', flightController.addFlight);
router.put('/edit-flight', flightController.editFlight);
router.get('/flights', flightController.getFlights);

module.exports = router;
