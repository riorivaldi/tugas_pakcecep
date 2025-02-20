import api from "../api"; // Pastikan ini sudah diimport

export const getAllTugas = async () => {
  try {
    const response = await api.get("/upload", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tugas:", error);
    throw error;
  }
};
