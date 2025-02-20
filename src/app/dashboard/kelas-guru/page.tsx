"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { getClasses } from "@/app/services/buat-kelas/get_kelas";
import { uploadtugas } from "@/app/services/Upload-tugas/upload";
import { getAllTugas } from "@/app/services/Upload-tugas/get_upload";
import { FaCopy } from "react-icons/fa"; 

export default function Dashboard() {
    const [buat_kelas, setKelas] = useState<{ nama_kelas: string; matapelajaran: string } | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", deskripsi: "", file: null });
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
                const response = await getAllTugas(); // Ambil daftar tugas dari API
                if (response.success) {
                    setTasks(response.data.map((tugas: any) => ({
                        id: tugas.id,
                        title: tugas.judul_tugas,
                        deskripsi: tugas.deskripsi,
                        fileName: tugas.lampiran ? tugas.lampiran.split("/").pop() : null, // Ambil nama file jika ada
                    })));
                }
            } catch (error) {
                console.error("Gagal mengambil daftar tugas:", error);
            }
        };

        fetchData();
        fetchTasks(); // Panggil saat pertama kali halaman dimuat
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewTask({ ...newTask, file: e.target.files[0] });
        }
    };

    const handleSaveTask = async () => {
        if (!newTask.title.trim()) {
            alert("Judul tugas wajib diisi!");
            return;
        }

        const formData = new FormData();
        formData.append("judul_tugas", newTask.title);
        formData.append("deskripsi", newTask.deskripsi || "");
        if (newTask.file) {
            formData.append("lampiran", newTask.file);
        }

        try {
            const response = await uploadtugas(formData);
            console.log("Tugas berhasil diunggah:", response);
            alert("Tugas berhasil diunggah!");

            // Tambahkan tugas baru ke daftar tanpa harus refresh halaman
            setTasks([...tasks, {
                id: response.data.id, // Ambil ID dari respons API
                title: newTask.title,
                deskripsi: newTask.deskripsi,
                fileName: newTask.file?.name,
            }]);

            setModalOpen(false);
            setNewTask({ title: "", deskripsi: "", file: null }); // Reset form
        } catch (error) {
            console.error("Gagal mengunggah tugas:", error);
            alert("Gagal mengunggah tugas. Coba lagi.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1A4A] flex flex-col items-center p-6 text-white">
            {/* Kartu Informasi Kelas */}
            <div className="w-full max-w-4xl bg-white text-black rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold">{buat_kelas ? buat_kelas.nama_kelas : "Memuat..."}</h2>
                <p className="text-gray-500">{buat_kelas ? buat_kelas.matapelajaran : "Memuat..."}</p>
            </div>

            {/* Kotak Tambahkan Komentar */}
            <div className="w-full max-w-4xl mt-4 bg-white rounded-lg shadow-lg p-6">
                <p className="text-black font-semibold">Tugas Baru</p>
                <p className="text-gray-500">10:27</p>
                <hr className="my-2 border-gray-300" />
            </div>
            <br />

           {/* Daftar Tugas */}
<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-[100%] min-h-[260px] mx-auto">
    <h3 className="text-black font-bold mb-4">Daftar Tugas</h3>
    {tasks.length > 0 ? (
        tasks.map((task) => (
            <div key={task.id} className="bg-gray-100 p-4 rounded-lg mb-3 shadow">
                <h4 className="text-black font-semibold">{task.title}</h4>
                <p className="text-gray-700">{task.deskripsi}</p>
                {task.fileName && (
                 <img 
                    src={task.fileName.startsWith("http") ? task.fileName : `http://localhost:8000/storage/uploads/tugas/${task.fileName}`} 
                    alt="Lampiran tugas" 
                    className="mt-2 w-full max-w-[150px] h-auto rounded-lg shadow-md"
                />
                )}
            </div>
        ))
    ) : (
        <p className="text-gray-500">Belum ada tugas.</p>
    )}
</div>


            {/* Tombol Tambah */}
            <button
                onClick={() => setModalOpen(true)}
                className="fixed bottom-6 right-6 bg-white text-blue-600 p-4 rounded-full shadow-lg hover:bg-gray-100"
            >
                <FaPlus size={20} />
            </button>

            {/* Modal Popup Buat Tugas */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Buat Tugas Baru</h2>
                            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <input
                            type="text"
                            name="title"
                            placeholder="Judul Tugas"
                            value={newTask.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2 text-black"
                        />
                        <input
                            type="text"
                            name="deskripsi"
                            placeholder="Deskripsi"
                            value={newTask.deskripsi}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2 text-black"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded mb-4 text-black"
                        />
                        {newTask.file && <p className="text-sm text-gray-500">File: {newTask.file.name}</p>}

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                                Batal
                            </button>
                            <button onClick={handleSaveTask} className="px-4 py-2 bg-blue-600 text-white rounded">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
