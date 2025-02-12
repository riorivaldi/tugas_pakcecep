import api from "../api";

export const registerUser = async (name: string, email: string, password: string, password_confirmation: string, ) => {
  try {
    const response = await api.post("/register", { name, email, password, password_confirmation });
    return response.data;
  } catch (error) {
    throw error;
  }
};
