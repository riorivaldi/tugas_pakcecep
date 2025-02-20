import api from "../api"; // Pastikan ini mengarah ke konfigurasi Axios yang benar

export const createClass = async (kelasData) => {
  try {
    const response = await api.post("/kelas/create", kelasData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating class:", error.response?.data || error);
    throw error;
  }
};
