"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const [Email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); 

  const handleClickShow = () => {
    setShow(!show);
  };

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
      <div className="bg-[#6984D4] bg-opacity-20 text-white translate-y-11 rounded-md px-[5%] py-[10%] shadow-lg">
        <div className="relative z-10 flex flex-col items-center text-white space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold -translate-y-16">LOGIN</p>
          </div>
          <div className="relative w-[320px]">
            <input
              type="text"
              name="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-14 pr-4 bg-[#D9D9D9] pb-[13px] pt-[15px] placeholder:text-black placeholder:text-[18px] text-[19px] placeholder:font-light text-black rounded-md"
            />
            <Image
              src="/icon/Group (2).svg"
              alt="Email"
              width={20}
              height={20}
              className="absolute top-1/2 left-4 -translate-y-1/2"
            />
          </div>
          <div className="relative w-[320px]">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-14 pr-8 bg-[#D9D9D9] pb-[13px] mt-6 pt-[15px] placeholder:text-black placeholder:text-[18px] text-[19px] placeholder:font-light text-black rounded-md"
            />
            <Image
              src="/icon/Group (1).svg"
              alt="Password"
              width={20}
              height={20}
              className="absolute left-4 -translate-y-10"
            />
            <span
              className="absolute right-4 translate-y-10 cursor-pointer text-black text-xl"
              onClick={handleClickShow}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="text-center">
            <div className="bg-[#252525] text-[#7994BC] rounded-md px-12 py-3 shadow-lg cursor-pointer">
              <p className="text-[20px] font-semibold">LOGIN</p>
            </div>
            <p className="mt-4 text-[#808080]">
              Belum punya akun?
              <span className="text-[#1E58BD] font-semibold cursor-pointer">
                <Link href='/components/register'>Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
