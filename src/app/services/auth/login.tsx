import api from "../api";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login Error:", error);
      throw error;
    }

    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw err.response?.data?.message || "Terjadi kesalahan pada server";
    }

    throw "Terjadi kesalahan yang tidak diketahui";
  }
};
