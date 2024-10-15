import { useAxiosInstance } from "../../config/axiosConfig";

export const useServiceApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchRandomService = async (categoryId, cityId) => {
        try {
            const params = {};
            if (categoryId) params.category_id = categoryId;
            if (cityId) params.city_id = cityId;
            const response = await axiosInstance.get("/random-services", { params });

            if (response.status === 200 && response.data && response.data.data) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from service API");
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
            throw error;
        }
    };

    return { fetchRandomService };
};
