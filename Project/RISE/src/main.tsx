import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./Components/Map/Map.tsx";
import Login from "./Components/Login_Sigup/Login";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/homepage" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
