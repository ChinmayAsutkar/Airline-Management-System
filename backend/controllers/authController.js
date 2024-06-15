const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USERNAME,
    pass: config.EMAIL_PASSWORD,
  },
});

exports.register = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const user = isAdmin ? new Admin({ email, password }) : new User({ email, password });
    await user.save();

    const otp = speakeasy.totp({
      secret: config.OTP_SECRET,
      encoding: 'base32',
    });

    const mailOptions = {
      from: config.EMAIL_USERNAME,
      to: email,
      subject: 'OTP for Registration',
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email', error });
      }
      res.status(201).json({ message: 'User registered successfully', user });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const user = isAdmin ? await Admin.findOne({ email }) : await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, isAdmin }, config.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  const verified = speakeasy.totp.verify({
    secret: config.OTP_SECRET,
    encoding: 'base32',
    token: otp,
    window: 1,
  });

  if (verified) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
