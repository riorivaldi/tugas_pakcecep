import api from "../api"; // Pastikan ini ada

export const getProfile = async () => {
  try {
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
