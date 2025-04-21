import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import "./index.css";
import Sidebar from "./admin/components/Sidebar";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        
      <AuthProvider>
        <App />
      </AuthProvider>
   
  </React.StrictMode>
);
