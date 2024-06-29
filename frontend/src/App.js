import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Itinerary from './pages/Itinerary';
// import Flights from './pages/Flights';
// import PaymentSuccess from './pages/PaymentSuccess';
// import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/itinerary" element={<PrivateRoute><Itinerary /></PrivateRoute>} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
