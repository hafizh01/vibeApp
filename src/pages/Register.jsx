import React, { useContext, useEffect } from "react";
import { AvatarContext } from "../context/AvatarContextProvider";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { avatar, setAvatar } = useContext(AvatarContext);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    let user = localStorage.getItem("chat_app_user");
    if (user) {
      navigate("/login");
    }
  }, []);

  // Fetch initial avatar when component mounts
  useEffect(() => {
    let user  = localStorage.getItem("chat_app_user");
    if(user){
      navigate("/login");
      return;
    }
    
    // Cek jika avatar belum ada, maka fetch yang baru
    if (!avatar) {
      handleAvatar();
    }
  }, []); // <-- Array kosong berarti hanya dijalankan sekali saat render pertama

  // Fungsi untuk mengganti avatar
  // const handleAvatar = () => {
  //   // Menggunakan string acak agar lebih unik
  //   const randomId = Math.random().toString(36).substring(2);
  //   setAvatar(`https://api.multiavatar.com/${randomId}.svg`);
  // };

  // Fungsi untuk navigasi ke halaman login
  const handleToLogin = () => {
    navigate("/login");
  }

 

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;

    

    if (username.trim()&&password && avatar) {
      localStorage.setItem(
        "chat_app_user",
        JSON.stringify({
          id: Date.now(),
          username: username,
          avatar: avatar,
        })
      );
      // Gunakan navigate untuk berpindah halaman, lebih baik dari window.location
      navigate("/login");
    }else{
      alert("Username and password are required")
    }
  };

  return (
    // 1. Perbaikan Layout Utama: Tambahkan justify-center & items-center
    //  relative w-screen h-screen  bg-gradient-to-t from-cyan-900 to-cyan-800 flex justify-center items-center
   <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 ">
      {/* Background Image */}

    <div className="pl-5 md:block bg:cover bg-center rounded-lg pt-5 object-cover"
      style={{backgroundImage : "url('https://images.pexels.com/photos/5081918/pexels-photo-5081918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}
    >
      <button onClick={handleToLogin} className="   w-14 h-6 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors cursor-pointer m-2">
          <span class="material-symbols-outlined">
            keyboard_backspace
          </span>
      </button>
      
    </div>
      
       {/* 2. Perbaikan Form: Tambahkan class untuk styling form */}
 
  <div className="bg-gradient-to-t from-cyan-900 to-cyan-800 flex justify-center items-center p-4">

      <form  
        className="relative z-10 w-full max-w-sm flex flex-col items-center bg-white shadow-lg rounded-lg p-6 gap-4"
        onSubmit={handleLogin}
      >
        <div className="relative w-28 h-28 mb-4">
            <h1 className="font-bold text-center text-2xl justify-center"> REGISTER</h1>

          {/* memasukkan Avatar yang ada di Login */}
          {/* <img
            src={avatar}
            alt="avatar"
            className="w-full h-full rounded-full border-2 border-gray-200"
          /> */}
          {/* <button
            className="w-10 h-10 bg-green-600 text-white text-xl font-bold rounded-full absolute -right-2 -bottom-2 flex items-center justify-center hover:bg-green-700 transition-colors"
            type="button"
            onClick={handleAvatar}
          >
            ?
          </button> */}
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
         <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Tambahkan atribut name
            required
            className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>


      <div className="w-full flex flex-col gap-2 ">

        {/* 3. Perbaikan Tombol: Tambahkan class hover & transition */}
        <button className="w-full h-12 bg-cyan-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"type="submit" >C R E A T E</button>
        <button className="w-full h-12 bg-white text-black rounded-lg font-bold hover:bg-gray-300 transition-colors"type="button" >Login with google</button>
          </div>

        </form>
    </div>
    </main>

  );
}