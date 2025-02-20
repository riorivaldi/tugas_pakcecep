"use client";
import { useRouter } from "next/navigation";

export default function TugasDetail({ params }: { params: { id: string } }) {
    const router = useRouter();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-xl font-bold">Detail Tugas {params.id}</h1>
                <button 
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => router.back()}
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}
