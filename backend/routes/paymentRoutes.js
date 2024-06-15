const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment-intent', paymentController.createPaymentIntent);
router.post('/handle-payment', paymentController.handlePaymentSuccess);

module.exports = router;
