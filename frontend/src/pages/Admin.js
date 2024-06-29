import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [flights, setFlights] = useState([]);
    const [form, setForm] = useState({
        from: '',
        to: '',
        price: '',
        departureTime: ''
    });

    useEffect(() => {
        const fetchFlights = async () => {
            const response = await axios.get('/api/admin/flights');
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
        try {
            const response = await axios.post('/api/admin/flights', form);
            setFlights([...flights, response.data]);
        } catch (error) {
            console.error("Error adding flight", error);
        }
    };

    const handleEdit = async (id, updatedFlight) => {
        try {
            const response = await axios.put(`/api/admin/flights/${id}`, updatedFlight);
            setFlights(flights.map(flight => (flight._id === id ? response.data : flight)));
        } catch (error) {
            console.error("Error editing flight", error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl mb-4">Admin Panel</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>From</label>
                        <input
                            type="text"
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>To</label>
                        <input
                            type="text"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>Departure Time</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={form.departureTime}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 bg-blue-500 text-white p-2 rounded">Add Flight</button>
            </form>
            <h2 className="text-xl mb-4">Existing Flights</h2>
            {flights.map(flight => (
                <div key={flight._id} className="p-4 bg-white shadow-md rounded mb-4">
                    <p>Flight from {flight.from} to {flight.to}</p>
                    <p>Price: ${flight.price}</p>
                    <p>Departure: {flight.departureTime}</p>
                    {/* Add edit form and handleEdit function here */}
                </div>
            ))}
        </div>
    );
}

export default Admin;
