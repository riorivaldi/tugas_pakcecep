import React from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar"; 


export default function Page() {
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
          DAFTAR TUGAS ANDA
        </h2>
        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10 max-w-lg">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold">Tugas 1</h3>
            <p className="text-gray-600 mt-2">Deskripsi tugas pertama.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold">Tugas 2</h3>
            <p className="text-gray-600 mt-2">Deskripsi tugas kedua.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-bold">Tugas 3</h3>
            <p className="text-gray-600 mt-2">Deskripsi tugas ketiga.</p>
          </div>
        </div>
      </div>
    </div>
  );
}