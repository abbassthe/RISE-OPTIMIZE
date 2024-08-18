import Home from "./Components/Home/Home";
import Navbar from "./Components/navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import About2 from "./Components/About2/About2";
import Vid from "./Components/Vid/Vid";
import Vid2 from "./Components/Vid2/Vid";
import FibonacciDiv from "./Components/test/tst";
import "./App.css";
import Globe from "./Components/Globe/Globe";
import Model from "./Components/Locust/Model";
import Scene from "./Components/Locust/Scene";
import Scene2 from "./Components/robo_insect/Scene";
import { Preload } from "@react-three/drei";
import Preloader from "./Components/Preloader/Preloader";
import Spacer from "./Components/Spacer/spacer";
function App() {
  return (
    <>
      <div className="wrap">
        <section>
          <Preloader />
          <Navbar />
          <Home />
          <Globe />
          <div className="t">
            <span id="txt1">HELLO</span>
            <span id="txt2">World</span>
            <div className="testWrap">
              <Scene />
            </div>
          </div>
          <Vid />
          <About />
          <About2 />
          <Spacer />
          <Vid2 />
          <Scene2 />
          <Contact></Contact>
        </section>
      </div>
    </>
  );
}

export default App;
