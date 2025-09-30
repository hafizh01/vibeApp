import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  // Fungsi ini sudah benar
  const  toLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let user = localStorage.getItem("vibe-app_user");
    if (user) {
      return navigate("/chat");
    }
  }, []);

  return (
    <main className="relative w-screen h-screen bg-cyan-900 flex items-center justify-center p-4 ">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/5081918/pexels-photo-5081918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-25 z-0"
      />

      {/* Foreground Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center text-white w-full max-w-lg">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 ">
          VibeApp
        </h1>

        <p className="text-lg md:text-xl font-semibold mb-8 text-align-justify ">
          VibeApp bukan hanya tentang mengirim pesan, tapi merasakan koneksi nyata di setiap obrolan. Bagikan momen, ekspresikan diri, dan temukan vibe-mu.
        </p>

        <button
          className="w-full h-12 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer "
          onClick={toLogin}
          type="button" // Gunakan type="button" jika tidak di dalam <form>
        >
          Get Started
        </button>
      </div>
    </main>
  );
}