"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JoinClass() {
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (link) {
      // Redirect ke halaman sesuai dengan link yang dimasukkan
      router.push(link);
    } else {
      alert("Masukkan link kelas terlebih dahulu!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/popup.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={50}
        />
      </div>
      {/* Form Container */}
      <div className="bg-[#6984D4] bg-opacity-20 text-white translate-y-11 rounded-md px-[5%] py-[10%] shadow-lg relative z-10">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white text-xl"
        >
          ⬅
        </button>

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Gabung <span className="italic">Kelas</span>
        </h2>

        <form onSubmit={handleJoinClass} className="space-y-4">
          <div className="text-center">
            <label className="text-gray-200 text-sm">Masukkan Link Kelas</label>
          </div>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Masukkan Link Kelas"
            className="w-full bg-gray-300 text-gray-700 px-4 py-3 rounded-lg focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#252525] text-[#7994BC] py-3 rounded-lg font-semibold shadow-lg"
          >
            Gabung Kelas
          </button>
        </form>
      </div>
    </div>
  );
}
