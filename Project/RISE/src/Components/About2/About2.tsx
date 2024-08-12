import React, { useEffect, useState, useRef } from "react";
import { useScroll } from "framer-motion";
import "./About2.scss";
// Define the types for props if necessary
interface PersonIconProps {
  dark: boolean;
}

const PersonIcon: React.FC<PersonIconProps> = ({ dark }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={dark ? "#468585" : "#9CDBA6"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="7" r="5" />
    <path d="M12 14c-4.418 0-8 2.682-8 6s8 6 8 6 8-2.682 8-6-3.582-6-8-6z" />
  </svg>
);

const About2: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: scrollRef });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      // Assuming 1000px scroll height corresponds to the progress range of 1
      setScrollY(progress * 1000);
      console.log(scrollY);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Calculate the displayed number based on scroll position
  const number = Math.min(Math.floor(scrollY / 100), 100);

  return (
    <div
      style={{ display: "flex", height: "200vh", backgroundColor: "#50B498" }}
    >
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          position: "sticky",
          top: 0,
        }}
      >
        <div
          className="ppl"
          style={{
            height: "30%",
            padding: "20px",
            display: "inline-block",
            position: "sticky",
            top: "30%",
            width: "40%",
            alignSelf: "flex-start",
          }}
        >
          {Array.from({ length: scrollY / 10 }).map((_, index) => (
            <PersonIcon key={index} dark={index < 10} />
          ))}
        </div>
      </div>
      <div
        id="stickyDiv"
        style={{
          display: "inline-block",
          position: "sticky",
          top: "20%",
          padding: "20px",
          width: "40%",
          alignSelf: "flex-start",
        }}
      >
        {number}
        <div className="subText">
          in 100 people's food security at risk because of locust
        </div>
      </div>
    </div>
  );
};

export default About2;
