import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
    var token = localStorage.getItem('Token');

    return token ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
