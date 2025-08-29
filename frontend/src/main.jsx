import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

// ✅ Import Bootstrap CSS first
import "bootstrap/dist/css/bootstrap.min.css";

// Import your custom CSS after Bootstrap to override its styles
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)
