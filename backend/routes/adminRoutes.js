const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', adminController.adminLogin);
router.post('/add-flight', authMiddleware.adminAuth, adminController.addFlight);

module.exports = router;
