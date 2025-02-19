"use client";
import React, { useState, useEffect } from "react";
import { Home, Search, User, Settings, LogOut } from "lucide-react"; // Import LogOut icon
import { useRouter, usePathname } from "next/navigation"; // Menggunakan usePathname untuk mendapatkan rute aktif

export default function Sidebar() {
  const [active, setActive] = useState<string>("Home"); // Set default active menu
  const router = useRouter();
  const pathname = usePathname(); // Dapatkan rute aktif

  // Fungsi untuk mengubah menu aktif dan mengarahkan ke rute baru
  const handleActive = (menu: string, route: string) => {
    if (active !== menu) {
      setActive(menu);
      router.push(route); // Lakukan navigasi ke rute baru
    }
  };

  // Menyinkronkan state active dengan pathname (rute yang aktif)
  useEffect(() => {
    if (pathname === "/dashboard") {
      setActive("Home");
    } else if (pathname === "/dashboard/search") {
      setActive("Search");
    } else if (pathname === "/dashboard/profile") {
      setActive("Profile");
    } else if (pathname === "/dashboard/settings") {
      setActive("Settings");
    }
  }, [pathname]); // Re-run effect ketika pathname berubah

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    console.log("Logging out...");
    // Tambahkan logika logout di sini
  };

  const handleGoBack = () => {
    router.push("components/loading");
  };

  return (
    <div className="w-64 min-h-screen bg-[#010C4B] text-white p-5">
      <nav>
        <ul className="space-y-10">
          <li
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              active === "Home" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleActive("Home", "/dashboard")}
          >
            <div className="relative">
              <Home size={30} />
              {active === "Home" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <span>Home</span>
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              active === "Search" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleActive("Search", "/dashboard/search")}
          >
            <div className="relative">
              <Search size={30} />
              {active === "Search" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <span>Search</span>
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              active === "Profile" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleActive("Profile", "/dashboard/profile")}
          >
            <div className="relative">
              <User size={30} />
              {active === "Profile" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <span>Profile</span>
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              active === "Settingss" ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => handleActive("Settings", "/dashboard/settings")}
          >
            <div className="relative">
              <Settings size={30} />
              {active === "Settingss" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      {/* Add a "Logout" item at the bottom */}
      <div className="mt-auto">
        <ul>
          <li
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 translate-y-40"
            onClick={handleLogout}
          >
            <div className="relative">
              <LogOut size={20} />
            </div>
            <span onClick={handleGoBack}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
