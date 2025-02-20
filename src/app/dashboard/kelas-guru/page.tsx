"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { getClasses } from "@/app/services/buat-kelas/get_kelas";
import { getAllTugas } from "@/app/services/Upload-tugas/get_upload";

export default function Dashboard() {
    const router = useRouter();
    const [buat_kelas, setKelas] = useState<{ nama_kelas: string; matapelajaran: string } | null>(null);
    const [tasks, setTasks] = useState<{ id: number; title: string; deskripsi: string; fileName?: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getClasses();
                if (response && response.length > 0) {
                    setKelas(response[0]);
                }
            } catch (error) {
                console.error("Gagal mengambil data kelas:", error);
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await getAllTugas();
                if (response.success) {
                    setTasks(response.data.map((tugas: any) => ({
                        id: tugas.id,
                        title: tugas.judul_tugas,
                        deskripsi: tugas.deskripsi,
                        fileName: tugas.lampiran ? tugas.lampiran.split("/").pop() : null,
                    })));
                }
            } catch (error) {
                console.error("Gagal mengambil daftar tugas:", error);
            }
        };

        fetchData();
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-[#0A1A4A] flex flex-col items-center p-6 text-white">
            <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold">{buat_kelas ? buat_kelas.nama_kelas : "Memuat..."}</h2>
                <p className="text-gray-500">{buat_kelas ? buat_kelas.matapelajaran : "Memuat..."}</p>
            </div>
            <br />
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[90%] min-h-[260px] mx-auto">
                <h3 className="text-black font-bold mb-4">Daftar Tugas</h3>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div 
                            key={task.id} 
                            className="flex items-center bg-gray-200 p-4 rounded-lg mb-3 shadow-lg hover:shadow-xl transition cursor-pointer"
                            onClick={() => router.push(`/tugas/${task.id}`)}
                        >
                            <div className="w-20 h-20 bg-gray-400 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
                                {task.fileName && <img src={`http://localhost:8000/storage/uploads/tugas/${task.fileName}`} alt="Lampiran tugas" className="w-full h-full object-cover" />}
                            </div>
                            <div>
                                <h4 className="text-black font-semibold">{task.title}</h4>
                                <p className="text-gray-700">{task.deskripsi}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Belum ada tugas.</p>
                )}
            </div>

            <button onClick={() => console.log("Tambah Tugas")} className="fixed bottom-6 right-6 bg-white text-blue-600 p-4 rounded-full shadow-lg hover:bg-gray-100">
                <FaPlus size={20} />
            </button>
        </div>
    );
}
