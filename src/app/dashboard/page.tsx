"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { getClasses } from "@/app/services/buat-kelas/get_kelas";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

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
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <h1 className="absolute top-10 left-10 text-white text-4xl font-bold">
          BRAIN ROOM
        </h1>
        <h2 className="text-white text-xl font-semibold mt-20 ml-10 relative z-10">
          DAFTAR KELAS ANDA
        </h2>
        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10 max-w-lg">
  {classes.length > 0 ? (
    classes.map((buat_kelas) => (
      <div key={buat_kelas.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
        <h3 className="text-xl font-bold">{buat_kelas.nama_kelas}</h3>
        <p className="text-gray-600 mt-1">Mata Pelajaran: {buat_kelas.matapelajaran}</p>
        <p className="text-gray-500 mt-1">Guru: {buat_kelas.nama_guru}</p>
      </div>
    ))
  ) : (
    <p className="text-white">Belum ada kelas tersedia.</p>
  )}
</div>


        {/* Tombol Tambah */}
        <button
          onClick={() => setShowPopup(true)}
          className="absolute bottom-12 right-10 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center w-14 h-14"
        >
          <span className="text-3xl font-bold text-blue-900">+</span>
        </button>
          {/* Popup */}
        {showPopup && (
          <div className="absolute bottom-24 right-10 bg-white p-4 rounded-lg shadow-lg w-60 border">
            <h3 className="text-lg font-semibold text-center mb-3">Pilih Opsi</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-gray-300 p-2 rounded-md mb-2 text-center text-sm"
            >
              Gabung Kelas
            </button>
            <button
              onClick={() => router.push("/dashboard/buat-kelas")}
              className="w-full bg-blue-900 text-white p-2 rounded-md text-center text-sm"
            >
              Buat Kelas
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-2 text-center text-red-500 text-sm"
            >
              Batal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
