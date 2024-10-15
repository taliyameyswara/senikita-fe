import { useAxiosInstance } from "../../config/axiosConfig";

export const useCityApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchAllCities = async () => {
        try {
            const response = await axiosInstance.get("/cities");
            if (response.status === 200 && response.data && response.data.cities) {
                return response.data.cities;
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error fetching cities:", error.message);
            throw error; // Re-throw the error if you need further error handling in the component
        }
    };

    return { fetchAllCities };
};
