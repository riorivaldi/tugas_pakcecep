"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../../services/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleResetPassword = async () => {
    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage("Password berhasil diubah. Silakan login kembali.");
      setTimeout(() => router.push("/components/login"), 2000);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(
          (error as any)?.response?.data?.error || "Gagal mereset password."
        );
      } else {
        setMessage("Terjadi kesalahan yang tidak terduga.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="Masukkan password baru"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Konfirmasi password"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded mt-4"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}
