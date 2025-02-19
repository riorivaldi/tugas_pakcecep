"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Daftar tugas yang bisa diubah sesuai dengan data nyata
  const tasks = [
    { id: 1, title: "Tugas 1", description: "Deskripsi tugas pertama." },
    { id: 2, title: "Tugas 2", description: "Deskripsi tugas kedua." },
    { id: 3, title: "Tugas 3", description: "Deskripsi tugas ketiga." },
  ];

  // Filter tugas berdasarkan query pencarian
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Cari tugas..."
            className="w-full pl-4 pr-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10 max-w-lg">
          {/* Daftar tugas yang difilter */}
          {filteredTasks.length === 0 ? (
            <p className="text-white">Tidak ada tugas yang ditemukan.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
