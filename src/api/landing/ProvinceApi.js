import { useAxiosInstance } from "../../config/axiosConfig";

export const useProvinceApi = () => {
  const axiosInstance = useAxiosInstance();

  const fetchAllProvince = async () => {
    try {
      const response = await axiosInstance.get("/art-provinces");

      if (response.status === 200 && response.data?.data) {
        return response.data.data;
      } else {
        console.error("Unexpected response structure:", response);
        throw new Error("Invalid response structure from province API");
      }
    } catch (error) {
      console.error("Failed to fetch provinces:", error.message);
    }
  };

  return { fetchAllProvince };
};
