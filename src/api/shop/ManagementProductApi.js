import { useAxiosInstance } from "../../config/axiosConfig";

export const useManagementProductApi = () => {
    const axios = useAxiosInstance();

    const getAllProducts = async () => {
        try {
            const response = await axios.get('/user/shop/products');
            return response.data.products;
        } catch (error) {
            console.error(error);
        }
    }

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

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`/user/shop/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createProduct = async (product) => {
        try {
            const response = await axios.post('/user/shop/products', product);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { createProduct, updateProduct, getProductById, deleteProduct, getAllProducts };
} 