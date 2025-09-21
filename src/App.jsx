import React from "react";
import {Routes, Route} from "react-router-dom"
import SplasScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Chat from "./pages/Chat";


export default function App(){
  return(
    <Routes>
      <Route path="/" element={<SplasScreen />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/*" element={<h1>404 Not Found</h1>}/>

    </Routes>
  )

}


  