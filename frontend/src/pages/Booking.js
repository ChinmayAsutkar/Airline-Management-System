import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Booking() {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            const response = await axios.get('/api/bookings');
            setFlights(response.data);
        };
        fetchFlights();
    }, []);

    const handleBook = async (flightId) => {
        try {
            const response = await axios.post('/api/bookings', { flightId });
            if (response.data.success) {
                navigate('/itinerary');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error booking flight", error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl mb-4">Available Flights</h2>
            {flights.map(flight => (
                <div key={flight._id} className="p-4 bg-white shadow-md rounded mb-4">
                    <p>Flight from {flight.from} to {flight.to}</p>
                    <p>Price: ${flight.price}</p>
                    <p>Departure: {flight.departureTime}</p>
                    <button onClick={() => handleBook(flight._id)} className="bg-blue-500 text-white p-2 rounded">Book Now</button>
                </div>
            ))}
        </div>
    );
}

export default Booking;
