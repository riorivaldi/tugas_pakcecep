"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { getClasses } from "@/app/services/buat-kelas/get_kelas";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Gagal mengambil data kelas.");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(
    (kelas) =>
      kelas?.nama_kelas?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kelas?.nama_guru?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kelas?.matapelajaran?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex bg-white">
      {/* Sidebar */}
      <div className="relative z-10">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col relative p-10">
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
        {/* Search Bar */}
        <div className="relative mt-10 ml-10 max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kelas..."
            className="w-full pl-4 pr-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10 max-w-lg">
          {loading ? (
            <p className="text-white">Memuat data kelas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredClasses.length === 0 ? (
            <p className="text-white">Tidak ada kelas yang ditemukan.</p>
          ) : (
            filteredClasses.map((buat_kelas) => (
              <div
                key={buat_kelas.id || Math.random()}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold">{buat_kelas.nama_kelas || "Nama tidak tersedia"}</h3>
                <h3 className="text-xl font-bold">{buat_kelas.matapelajaran || "Guru tidak tersedia"}</h3>
                <p className="text-gray-600 mt-2">{buat_kelas.nama_guru || "Mata pelajaran tidak tersedia"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
