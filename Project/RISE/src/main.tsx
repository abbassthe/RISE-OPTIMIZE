import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./Components/Map/Map.tsx";
import Login from "./Components/Login_Sigup/Login";
import Logout from "./Components/Logout/Logout.tsx";
import PasswordReset from './Components/PasswordReset/ResetPassword.tsx'
import PasswordResetConfirm from './Components/PasswordReset/ResetPasswordConfirm.tsx';
import Signup from "./Components/Login_Sigup/Signup.tsx";
import Insect2vect from "./Components/Insect2vect/Insect2vect.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/homepage" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:encodedPk/:token" element={<PasswordResetConfirm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Insect2vect" element={<Insect2vect />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
