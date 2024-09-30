import { Navigate, Outlet } from "react-router-dom";

// Fungsi untuk mengecek apakah user sudah login berdasarkan keberadaan token
const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Mengecek apakah ada token di localStorage
};

// Komponen ProtectedRoute untuk user yang login
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />; // Jika tidak ada token, redirect ke halaman login
    }
    return <Outlet />;
};

export default ProtectedRoute;
