import { useAxiosInstance } from "../../config/axiosConfig";

export const useCheckStatusApi = () => {
    const axiosInstance = useAxiosInstance();

    const checkStatusShop = async () => {
        try {
            const response = await axiosInstance.get("/user/shop/check-status");

            if (response.status === 200) {
                return response.data.status_shop;
            } else {
                throw new Error("Invalid response data from profile user API");
            }
        } catch (error) {
            console.error("Failed to fetch profile user:", error);
            throw error;
        }
    }



    return { checkStatusShop };
}