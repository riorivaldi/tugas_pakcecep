// services/classService.ts
import api from "../api"; // Pastikan path sesuai dengan konfigurasi Axios

export const getClasses = async () => {
  try {
    const response = await api.get("/kelas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error.response?.data || error);
    throw error;
  }
};
