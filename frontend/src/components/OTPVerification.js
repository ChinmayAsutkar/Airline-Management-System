import React, { useState } from 'react';
import axios from 'axios';

function OTPVerification({ email }) {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleVerify = async () => {
        try {
            const response = await axios.post('/api/auth/verify-otp', { email, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('OTP verification failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl mb-4">OTP Verification</h2>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={handleVerify}
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Verify OTP
            </button>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}

export default OTPVerification;
