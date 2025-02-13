"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/services/auth/login";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); 
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleClickShow = () => {
    setShow(!show);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const data = await loginUser(email, password);
      
      localStorage.setItem("token", data.token);
  
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(errorObj.response?.data?.message || "Login gagal, periksa kembali email dan password!");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/img/popup.jpg" alt="Background" layout="fill" objectFit="cover" quality={50} />
      </div>

      {/* Form Container */}
      <div className="bg-[#6984D4] bg-opacity-20 text-white translate-y-11 rounded-md px-[5%] py-[10%] shadow-lg">
        <form onSubmit={handleLogin} className="relative z-10 flex flex-col items-center text-white space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold -translate-y-16">LOGIN</p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Email Input */}
          <div className="relative w-[320px]">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-14 pr-4 bg-[#D9D9D9] pb-[13px] pt-[15px] placeholder:text-black placeholder:text-[18px] text-[19px] placeholder:font-light text-black rounded-md"
            />
            <Image src="/icon/Group (2).svg" alt="Email" width={20} height={20} className="absolute top-1/2 left-4 -translate-y-1/2" />
          </div>

          {/* Password Input */}
          <div className="relative w-[320px]">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-14 pr-8 bg-[#D9D9D9] pb-[13px] mt-6 pt-[15px] placeholder:text-black placeholder:text-[18px] text-[19px] placeholder:font-light text-black rounded-md"
            />
            <Image src="/icon/Group (1).svg" alt="Password" width={20} height={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black text-xl" onClick={handleClickShow}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="w-[320px] text-right mt-2">
            <Link href="/components/Auth" className="text-[#1E58BD] font-semibold cursor-pointer">
              Lupa Password?
            </Link>
          </div>
          <br/>

          {/* Login Button */}
          <div className="text-center">
            <button type="submit" className="bg-[#252525] text-[#7994BC] rounded-md px-12 py-3 shadow-lg cursor-pointer text-[20px] font-semibold">
              LOGIN
            </button>
            <p className="mt-4 text-[#808080]">
              Belum punya akun?
              <span className="text-[#1E58BD] font-semibold cursor-pointer block">
                <Link href="/components/register">Register</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
