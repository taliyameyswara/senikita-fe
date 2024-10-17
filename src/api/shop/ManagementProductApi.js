import { useAxiosInstance } from "../../config/axiosConfig";

export const useManagementProductApi = () => {
    const axios = useAxiosInstance();

    const updateProduct = async (id, data) => {
        try {
            const response = await axios.post(`/user/shop/products/${id}`, data);
            return response.data.product;
        } catch (error) {
            console.error(error);
        }
    }

    const getProductById = async (id) => {
        try {
            const response = await axios.get(`/user/shop/products/${id}`);
            return response.data.product;
        } catch (error) {
            console.error(error);
        }
    }

    return { updateProduct, getProductById };
} 