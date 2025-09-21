import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AvatarContextProvider from './context/AvatarContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AvatarContextProvider>
    <App />

    </AvatarContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
