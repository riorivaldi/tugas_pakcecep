import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Loading() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
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

      {/* Welcome Text */}
      <div className="relative z-10 text-black text-center text-4xl font-bold mt-32">
        <p>
          WELCOME
          <br />
          TO
          <br />
          BRAIN ROOM
        </p>
      </div>

      {/* Get Started Button */}
      <Link href='/components/register'>
        <button className="relative z-10 mt-6 bg-[#252525] text-[#7994BC] text-lg font-semibold px-6 py-3 rounded-lg shadow-lg">
          Get Started
        </button>
      </Link>
    </div>
  );
}
