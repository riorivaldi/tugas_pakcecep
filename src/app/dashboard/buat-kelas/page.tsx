"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClass } from "@/app/services/buat-kelas/Create_kelas";

export default function BuatKelas() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_kelas: "",
    nama_guru: "",
    matapelajaran: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createClass(formData);
      alert("Kelas berhasil dibuat!");
      router.push("/dashboard/kelas-guru"); // Redirect ke halaman daftar kelas
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Gambar */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/popup.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Container Form */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-[450px]">
        <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">
          Buat Kelas
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Nama Kelas</label>
            <input
              type="text"
              name="nama_kelas"
              className="w-full border-b-2 p-2 outline-none focus:border-blue-900 bg-transparent"
              value={formData.nama_kelas}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Nama Guru</label>
            <input
              type="text"
              name="nama_guru"
              className="w-full border-b-2 p-2 outline-none focus:border-blue-900 bg-transparent"
              value={formData.nama_guru}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              name="matapelajaran"
              className="w-full border-b-2 p-2 outline-none focus:border-blue-900 bg-transparent"
              value={formData.matapelajaran}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Membuat Kelas..." : "Buat Kelas"}
          </button>
        </form>
      </div>
    </div>
  );
}
