import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <Toaster
            className="!mt-[200px]"
            position="top-right"
            toastOptions={{
                className: "!bg-white/10 backdrop-blur-md border border-white/20 !text-white",
            }}
            reverseOrder={true}
        />
    </BrowserRouter>,
)
