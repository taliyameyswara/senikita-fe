import { useAxiosInstance } from "../../config/axiosConfig";

export const useProfileShopApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchProfileShop = async () => {
        try {
            const response = await axiosInstance.get("/user/shop/view-login");

            if (response.status === 200 && response.data && response.data.data) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from profile shop API");
            }
        } catch (error) {
            console.error("Failed to fetch profile shop:", error);
            throw error;
        }
    }

    const updateProfileShop = async (data, id) => {
        try {
            const response = await axiosInstance.post(`/user/shop/${id}`, data);

            if (response.status === 200) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from update profile shop API");
            }
        } catch (error) {
            console.error("Failed to update profile shop:", error);
            throw error;
        }
    }

    return { fetchProfileShop, updateProfileShop };

}