import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold">Flight Booking</Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-300">Home</Link>
                    {token ? (
                        <>
                            <Link to="/itinerary" className="text-gray-300">Itinerary</Link>
                            <button onClick={handleLogout} className="text-gray-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300">Login</Link>
                            <Link to="/signup" className="text-gray-300">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
