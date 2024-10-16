import { useAxiosInstance } from "../../config/axiosConfig";

export const useProfileUserApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchProfileUser = async () => {
        try {
            const response = await axiosInstance.get("/user/profile");

            if (response.status === 200 && response.data && response.data.data) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from profile user API");
            }
        } catch (error) {
            console.error("Failed to fetch profile user:", error);
            throw error;
        }
    }

    const updateProfileUser = async (data) => {
        try {
            const response = await axiosInstance.post("/user/edit-profile", data);

            if (response.status === 200) {
                return response.data.data;
            } else {
                throw new Error("Invalid response data from update profile user API");
            }
        } catch (error) {
            console.error("Failed to update profile user:", error);
            throw error;
        }
    }

    const updatePassword = async (data) => {
        try {
            const response = await axiosInstance.put("/user/edit-profile/password", data);

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("Invalid response data from update password user API");
            }
        } catch (error) {
            console.error("Failed to update password user:", error);
            throw error;
        }
    }

    return { fetchProfileUser, updateProfileUser, updatePassword };
}