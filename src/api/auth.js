// src/api/auth.js
import { useAxiosInstance } from '../config/axiosConfig'; // Import the hook

export const useAuthApi = () => {
    const axiosInstance = useAxiosInstance();

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('auth/login', {
                email,
                password,
            });

            if (response.data.status === 'success') {
                const userData = response.data.user;
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                return {
                    success: true,
                    code: response.data.code,
                    data: userData,
                };
            } else {
                return {
                    success: false,
                    code: response.data.code,
                    message: response.data.message,
                };
            }
        } catch (error) {
            return {
                success: false,
                code: error.response ? error.response.data.code : 'SERVER_ERROR',
                message: error.response ? error.response.data.message : 'Something went wrong',
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axiosInstance.post('auth/register', {
                name,
                email,
                password,
            });

            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message,
                };
            } else {
                return {
                    success: false,
                    message: response.data.message,
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response ? error.response.data.message : 'Something went wrong',
            };
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const response = await axiosInstance.post('auth/verify-otp', {
                email,
                otp,
            });

            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message,
                };
            } else {
                return {
                    success: false,
                    message: response.data.message,
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response ? error.response.data.message : 'Something went wrong',
            };
        }
    };

    const resendOtp = async (email) => {
        try {
            const response = await axiosInstance.post('auth/resend-otp', {
                email,
            });

            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message,
                };
            } else {
                return {
                    success: false,
                    message: response.data.message,
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response ? error.response.data.message : 'Something went wrong',
            };
        }
    };

    return {
        login,
        register,
        verifyOtp,
        resendOtp,
    };
};
