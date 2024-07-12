import React, { useEffect, useState } from "react";
import "./About2.scss";

function About2() {
  const [width, setWidth] = useState("100vw");
  const [height, setHeight] = useState("100vh");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY * 0.001;
      if (scrollPosition <= 15) {
        const newWidth = Math.max(
          Math.min((8.36 / scrollPosition) * 100, 100),
          50
        ); // Adjust width based on scroll position
        setWidth(`${newWidth}vw`);
      } else if (scrollPosition >= 30) {
        const newWidth = Math.max((30 / scrollPosition) * 50, 25); // Adjust width based on scroll position
        setWidth(`${newWidth}vw`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY * 0.001;
      if (scrollPosition >= 15 && scrollPosition < 30) {
        const newH = Math.max((15 / scrollPosition) * 100, 50); // Adjust width based on scroll position
        setHeight(`${newH}vh`);
      } else if (scrollPosition < 15) {
        setHeight(`100vh`);
      } else if (scrollPosition >= 60) {
        const newH = Math.max((60 / scrollPosition) * 50, 25); // Adjust width based on scroll position
        setHeight(`${newH}vh`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div
        className="scroll-div"
        style={{ width: width, height: height }}
      ></div>
    </div>
  );
}

export default About2;
