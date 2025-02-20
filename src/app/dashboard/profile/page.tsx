"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { getProfile } from "@/app/services/Profile/get_profile";

export default function Page() {
  const [user, setUser] = useState<{ name: string; email: string; photo: string } | null>(null);
  const [greeting, setGreeting] = useState<string>("Memuat...");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile.user);
        setGreeting(profile.message);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-white">
      {/* Sidebar */}
      <div className="relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col relative p-10">
        {/* Background Image */}
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

        {/* Kontainer Kartu Profil dan Informasi Pribadi */}
        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10">
          {/* Kartu Profil dengan Foto */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[100%] min-h-[100px] mx-auto flex items-center gap-4">
            {/* Foto Profil Bulat */}
            <label className="cursor-pointer relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={selectedImage || user?.photo || "/img/avatar_icons-removebg-preview.png"}
                  alt="Profile Picture"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Efek Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <p className="text-white text-xs">Klik untuk ubah</p>
              </div>
            </label>

            {/* Nama Pengguna & Salam */}
            <div>
              <h3 className="text-xl font-bold">{user ? user.name : "Memuat..."}</h3>
              <p className="text-gray-600">{greeting}</p>
            </div>
          </div>

          {/* Informasi Pribadi */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[100%] min-h-[260px] mx-auto">
            <h3 className="text-xl font-bold">Informasi Pribadi</h3>
            <p className="mt-2 text-gray-700">Email: {user ? user.email : "Memuat..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}