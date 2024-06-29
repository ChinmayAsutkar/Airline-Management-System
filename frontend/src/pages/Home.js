import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Home() {
    const [flights, setFlights] = useState([]);
    const [form, setForm] = useState({
        from: '',
        to: '',
        class: 'economy',
        date: ''
    });

    useEffect(() => {
        const fetchFlights = async () => {
            const response = await axios.get('/api/flights');
            setFlights(response.data);
        };
        fetchFlights();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/flights/search', form);
        setFlights(response.data);
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label>From</label>
                            <select name="from" value={form.from} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="">Select Airport</option>
                                {/* Populate with airports */}
                            </select>
                        </div>
                        <div>
                            <label>To</label>
                            <select name="to" value={form.to} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="">Select Airport</option>
                                {/* Populate with airports */}
                            </select>
                        </div>
                        <div>
                            <label>Class</label>
                            <select name="class" value={form.class} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="economy">Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First Class</option>
                            </select>
                        </div>
                        <div>
                            <label>Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-4 bg-blue-500 text-white p-2 rounded">
                        Search Flights
                    </button>
                </form>
                <div>
                    {flights.length > 0 ? (
                        flights.map(flight => (
                            <div key={flight._id} className="p-4 bg-white shadow-md rounded mb-4">
                                <p>Flight from {flight.from} to {flight.to}</p>
                                <p>Price: ${flight.price}</p>
                                <p>Departure: {flight.departureTime}</p>
                                {/* Add booking button */}
                            </div>
                        ))
                    ) : (
                        <p>No flights available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
