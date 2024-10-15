import { useAxiosInstance } from "../../config/axiosConfig";

export const useCategoryApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchAllCategories = async () => {
        try {
            const response = await axiosInstance.get("/category");

            if (response.status === 200 && response.data && response.data.data) {
                return response.data.data.data;
            } else {
                throw new Error("Invalid response data from category API");
            }
        } catch (error) {
            console.error("Failed to fetch category:", error);
            throw error;
        }
    };

    return { fetchAllCategories };
};
