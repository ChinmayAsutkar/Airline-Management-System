const crypto = require('crypto');

exports.generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

exports.verifyOTP = (otp, userOtp, otpExpiry) => {
  return otp === userOtp && otpExpiry > new Date();
};
