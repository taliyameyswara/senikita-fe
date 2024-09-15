// PublicRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";

const isAdmin = () => {
    const userRole = localStorage.getItem("role"); // Ambil role dari localStorage
    return userRole === "1"; // Cek apakah role adalah admin
};

const isAuthenticated = () => {
    return !!localStorage.getItem("token") && !!localStorage.getItem("name"); // Mengecek apakah ada token di localStorage
};

const PublicRoutes = () => {
    if (isAuthenticated()) {
        if (isAdmin()) {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return <Outlet />; // Menggunakan Outlet untuk merender rute bersarang
};

export default PublicRoutes;
