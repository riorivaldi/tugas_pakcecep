import api from "../api"; // Pastikan ini ada

export const uploadtugas = async (formData) => {
  try {
    const response = await api.post("/upload/tugas", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading tugas:", error);
    throw error;
  }
};
