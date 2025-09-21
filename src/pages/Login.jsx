import React, { useContext, useEffect } from "react";
import { AvatarContext } from "../context/AvatarContextProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { avatar, setAvatar } = useContext(AvatarContext);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    let user = localStorage.getItem("chat_app_user");
    if (user) {
      navigate("/chat");
    }
  }, []);

  // Fetch initial avatar when component mounts
  useEffect(() => {
    // Cek jika avatar belum ada, maka fetch yang baru
    if (!avatar) {
      handleAvatar();
    }
  }, []); // <-- Array kosong berarti hanya dijalankan sekali saat render pertama

  // Fungsi untuk mengganti avatar
  const handleAvatar = () => {
    // Menggunakan string acak agar lebih unik
    const randomId = Math.random().toString(36).substring(2);
    setAvatar(`https://api.multiavatar.com/${randomId}.svg`);
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    let username = e.target.username.value;

    if (username.trim() && avatar) {
      localStorage.setItem(
        "chat_app_user",
        JSON.stringify({
          id: Date.now(),
          username: username,
          avatar: avatar,
        })
      );
      // Gunakan navigate untuk berpindah halaman, lebih baik dari window.location
      navigate("/chat");
    }
  };

  return (
    // 1. Perbaikan Layout Utama: Tambahkan justify-center & items-center
    <main className="relative w-screen h-screen p-4 bg-gradient-to-t from-cyan-900 to-cyan-800 flex justify-center items-center">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/5081918/pexels-photo-5081918.jpeg?w=500"
        alt="background"
        className="w-full h-full object-cover absolute top-0 left-0 opacity-25 z-0"
      />

      {/* 2. Perbaikan Form: Tambahkan items-center dan max-w-sm */}
      <form
        className="relative z-10 w-full max-w-sm flex flex-col items-center bg-white shadow-lg rounded-lg p-6 gap-4"
        onSubmit={handleLogin}
      >
        <div className="relative w-28 h-28 mb-4">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full rounded-full border-2 border-gray-200"
          />
          <button
            className="w-10 h-10 bg-green-600 text-white text-xl font-bold rounded-full absolute -right-2 -bottom-2 flex items-center justify-center hover:bg-green-700 transition-colors"
            type="button"
            onClick={handleAvatar}
          >
            ?
          </button>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Tambahkan atribut name
            required
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>

        {/* 3. Perbaikan Tombol: Tambahkan class hover & transition */}
        <button
          className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}