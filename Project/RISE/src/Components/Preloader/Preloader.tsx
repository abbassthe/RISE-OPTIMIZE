import "./Preloader.scss";
import { useEffect, useState } from "react";
import "./Preloader.scss";

interface Combination {
  configuration: number;
  roundness: number;
}
function Preloader() {
  const [isVisible] = useState(true);
  useEffect(() => {
    const wrapper = document.getElementById("wrapperPre") as HTMLElement;

    const rand = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const uniqueRand = (min: number, max: number, prev: number): number => {
      let next = prev;
      while (prev === next) next = rand(min, max);
      return next;
    };

    const combinations: Combination[] = [
      { configuration: 1, roundness: 1 },
      { configuration: 1, roundness: 2 },
      { configuration: 1, roundness: 4 },
      { configuration: 2, roundness: 2 },
      { configuration: 2, roundness: 3 },
      { configuration: 3, roundness: 3 },
    ];

    let prev = 0;

    const intervalId = setInterval(() => {
      const index = uniqueRand(0, combinations.length - 1, prev);
      const combination = combinations[index];

      if (wrapper) {
        wrapper.dataset.configuration = combination.configuration.toString();
        wrapper.dataset.roundness = combination.roundness.toString();
      }

      prev = index;
    }, 1500);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`bodyPre ${isVisible ? "visible" : "hidden"}`}>
      <div
        id="wrapperPre"
        className="preloader-wrapper"
        data-configuration="1"
        data-roundness="1"
      >
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
    </div>
  );
}

export default Preloader;
