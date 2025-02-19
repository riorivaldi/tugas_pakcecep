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
        <div className="flex flex-col gap-6 mt-6 ml-10 relative z-10 max-w-lg">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[170%] h-[130px]">
            <h3 className="text-xl font-bold ml-[20%]">Username</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[170%] h-[300px]">
            <h3 className="text-xl font-bold">Settings</h3>
          </div>
        </div>
      </div>
    </div>
  );
}