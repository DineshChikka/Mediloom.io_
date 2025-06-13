import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // Get token and role from localStorage
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If role is not in allowedRoles, redirect to appropriate page
    if (!allowedRoles.includes(userRole)) {
        // Redirect based on role
        switch(userRole) {
            case 'Civilian':
                return <Navigate to="/civilian" replace />;
            case 'Doctor/Medical Professional':
                return <Navigate to="/doctor" replace />;
            case 'Hospital Admin':
                return <Navigate to="/hospital-admin" replace />;
            case 'Policymaker':
                return <Navigate to="/policymaker" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    // If authorized, render the protected component
    return children;
};

export default ProtectedRoute; 