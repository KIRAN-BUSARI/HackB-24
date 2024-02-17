import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { RecoilRoot } from 'recoil'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Toaster />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
)
