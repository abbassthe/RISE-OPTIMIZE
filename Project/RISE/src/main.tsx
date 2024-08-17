import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./Components/Map/Map.tsx";
import Login from "./Components/Login_Sigup/Login";
import Insects from "./Components/Insects/insects"
import Signup from "./Components/Login_Sigup/Signup.tsx";
import Logout from "./Components/Logout/Logout.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/homepage" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/insects" element={<Insects />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
