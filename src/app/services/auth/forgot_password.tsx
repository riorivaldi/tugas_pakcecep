import api from "../api";

export const forgotpasswordUser = async (email: string,) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
