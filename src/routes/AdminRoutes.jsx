// AdminRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";

const isAdmin = () => {
    const userRole = localStorage.getItem("role"); // Ambil role dari localStorage
    return userRole === "1"; // Cek apakah role adalah admin
};

const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Mengecek apakah ada token di localStorage
};

const AdminRoutes = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    if (!isAdmin()) {
        return <Navigate to="/not-authorized" />;
    }
    return <Outlet />; // Menggunakan Outlet untuk merender rute bersarang
};

export default AdminRoutes;
