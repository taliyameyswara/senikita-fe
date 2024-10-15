import { useAxiosInstance } from "../../config/axiosConfig";

export const useProductApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchRandomProduct = async (categoryId, cityId) => {
        try {
            const params = {};
            if (categoryId) params.category_id = categoryId;
            if (cityId) params.city_id = cityId;
            const response = await axiosInstance.get("/random-product", { params });

            if (response.status === 200 && response.data && response.data.data) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from service API");
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
            throw error;
        }
    };

    return { fetchRandomProduct };
};
