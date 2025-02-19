"use client";
import React, { useState } from "react";
import { forgotpasswordUser } from "@/app/services/auth/forgot_password";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await forgotpasswordUser(email);
      setMessage(response.message || "Email reset password telah dikirim!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(errorObj.response?.data?.message || "Terjadi kesalahan, coba lagi.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#02174A] to-white">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-[#02174A] mb-4">Lupa Password?</h2>
        
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full p-3 pl-10 text-black bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="absolute left-3 top-3 text-gray-500">
              📧
            </span>
          </div>

          <button type="submit" className="w-full bg-[#02174A] text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#012060] transition">
            Kirim Link Reset
          </button>
        </form>
      </div>
    </div>
  );
}
