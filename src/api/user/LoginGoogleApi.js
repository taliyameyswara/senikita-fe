import { useAxiosInstance } from "../../config/axiosConfig";

export const useLoginGoogleApi = () => {
    const axiosInstance = useAxiosInstance();

    const loginGoogle = async () => {
        try {
            const response = await axiosInstance.get("/auth/google");

            if (response.status === 200) {
                return response.data.url;
            } else {
                throw new Error("Invalid response data from profile user API");
            }
        } catch (error) {
            console.error("Failed to fetch profile user:", error);
            throw error;
        }
    }



    return { loginGoogle };
}