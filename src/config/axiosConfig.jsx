import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Sesuaikan dengan path auth context Anda

// Membuat fungsi untuk membuat axios instance
const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://api.senikita.my.id/api",
  });

  const { logout } = useContext(UserContext); // Memanggil useContext di dalam fungsi

  // Interceptor untuk request (menambahkan token)
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { status } = error.response;

      if (status === 401) {
        if (window.location.pathname !== "/login") {
          logout();
          window.location.href = "/login";
        }
      }
      if (status === 403) {
        window.location.href = "/not-authorized";
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const useAxiosInstance = () => {
  return createAxiosInstance();
};
