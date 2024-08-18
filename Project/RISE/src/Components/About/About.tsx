import "./About.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";

function About() {
  const { scrollYProgress } = useScroll();
  const [scale, setScale] = useState(1);

  const z = useTransform(scrollYProgress, [0.63, 0.6648228281823952], [1, 9]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest >= 0.63 && latest <= 0.648) {
        setScale(1 / z.get());
      } else if (latest < 0.63) {
        setScale(1);
      } else {
        setScale(0.2);
      }
      console.log(scrollYProgress.get());
    });

    return () => unsubscribe();
  }, [scrollYProgress, z]);

  return (
    <div className="wrapperAbout">
      <div className="test">
        <div className="percentage">
          {Math.round(scale * 100)}%{" "}
          <span style={{ width: "190%", marginLeft: "-35%" }}>
            of earths land could be effected by locust swarms
          </span>
        </div>
      </div>
      <motion.div
        className="land"
        style={{ scale }}
        initial="hidden"
        whileInView="visible"
      // viewport={{ once: true }}
      >
        <img src="pexels-tomfisk-2476015.jpg" className="land_img"></img>
      </motion.div>
    </div>
  );
}

export default About;
