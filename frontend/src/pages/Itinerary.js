import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Itinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItineraries = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setItineraries(response.data);
            } catch (error) {
                console.error('Error fetching itineraries', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchItineraries();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-4">Your Itineraries</h1>
                {itineraries.length > 0 ? (
                    <div className="space-y-4">
                        {itineraries.map(itinerary => (
                            <div key={itinerary._id} className="p-4 bg-white rounded-lg shadow">
                                <h2 className="text-xl font-semibold">Flight: {itinerary.flight.flightNumber}</h2>
                                <p>From: {itinerary.flight.from}</p>
                                <p>To: {itinerary.flight.to}</p>
                                <p>Date: {new Date(itinerary.flight.date).toLocaleDateString()}</p>
                                <p>Class: {itinerary.class}</p>
                                <p>Price: ${itinerary.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No itineraries found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Itinerary;
