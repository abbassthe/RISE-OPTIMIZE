import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./Components/Home/Home";
import Navbar from "./Components/navbar/Navbar";
import About from "./Components/About/About";
import "./App.css";

function App() {
  return (
    <>
      <div className="wrap">
        <section>
          <Navbar />
          <Home />
          <About />
        </section>
      </div>
    </>
  );
}

export default App;
