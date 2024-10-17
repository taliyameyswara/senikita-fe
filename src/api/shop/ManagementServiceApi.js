import { useAxiosInstance } from "../../config/axiosConfig";

export const useManagementServiceApi = () => {
    const axios = useAxiosInstance();

    const getServices = async () => {
        try {
            const response = await axios.get("/services");
            return response.data.service;
        } catch (error) {
            console.error(error);
        }
    }

    const createService = async (service) => {
        try {
            const response = await axios.post("/services", service);
            return response.data.service;
        } catch (error) {
            console.error(error);
        }
    }

    const updateService = async (id, data) => {
        try {
            const response = await axios.put(`/user/shop/service/${id}`, data);
            return response.data.service;
        } catch (error) {
            console.error(error);
        }
    }

    const getServiceById = async (id) => {
        try {
            const response = await axios.get(`/user/shop/service/${id}`);
            return response.data.service;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteService = async (id) => {
        try {
            const response = await axios.delete(`/services/${id}`);
            return response.data.service;
        } catch (error) {
            console.error(error);
        }
    }

    return { getServices, createService, updateService, getServiceById, deleteService };

}