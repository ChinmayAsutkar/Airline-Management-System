import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming user role is stored in localStorage
    return token && userRole === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRoute;
