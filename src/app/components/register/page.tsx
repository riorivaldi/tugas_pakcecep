"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/img/popup.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={50}
        />
      </div>
      <div className="relative bg-[#6984D4] bg-opacity-20 text-white rounded-md px-8 py-10 shadow-lg w-[350px]">
        <h2 className="text-3xl font-bold text-center mb-6">REGISTER</h2>
        <div className="relative mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-[#D9D9D9] py-3 pl-12 pr-4 text-black text-lg rounded-md placeholder:text-black"
          />
          <Image
            src="/icon/userIcon.svg"
            alt="username"
            width={25}
            height={25}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          />
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-[#D9D9D9] py-3 pl-12 pr-4 text-lg text-black rounded-md placeholder:text-black"
          />
          <Image
            src="/icon/Group (2).svg"
            alt="Email"
            width={20}
            height={20}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#D9D9D9] py-3 pl-12 pr-10 text-lg text-black rounded-md placeholder:text-black"
          />
          <Image
            src="/icon/Group (1).svg"
            alt="Password"
            width={20}
            height={20}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          />
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-black text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full bg-[#D9D9D9] py-3 pl-12 pr-10 text-lg text-black rounded-md placeholder:text-black"
          />
          <Image
            src="/icon/Group (1).svg"
            alt="Confirm Password"
            width={20}
            height={20}
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
          />
          <span
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-black text-xl"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword}
          </span>
        </div>
        <button className="w-full bg-[#252525] text-[#7994BC] py-3 text-lg font-semibold rounded-md shadow-lg hover:bg-black">
          REGISTER
        </button>
        <p className="mt-4 text-center text-[#808080]">
          Sudah punya akun?{" "}
          <span className="text-[#1E58BD] font-semibold cursor-pointer">
            <Link href="/components/auths">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
