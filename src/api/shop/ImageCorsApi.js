import { useAxiosInstance } from "../../config/axiosConfig";

export const useImageCorsApi = () => {
    const axiosInstance = useAxiosInstance();

    const fetchImage = async (path) => {
        try {
            // Check if path includes '/storage/' and split, or return an error message if not.
            if (!path.includes('/storage/')) {
                throw new Error("Invalid path format. Expected '/storage/' in the path.");
            }
            const url = path.split('/storage/')[1];

            const response = await axiosInstance.get('fetch-image', {
                params: { path: url },
                responseType: 'blob'
            });

            return response.data;
        } catch (error) {
            console.error("Failed to fetch image:", error);
            return null; // Return null or handle the error as needed
        }
    };

    return { fetchImage };
};
