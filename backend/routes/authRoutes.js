// import express from 'express';
// import { register, login } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.userSignup);
router.post('/login', authController.userLogin);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
