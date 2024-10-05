import "./Vid.scss";
import { useScroll, useTransform, motion } from "framer-motion";

function Vid2() {
  const { scrollY } = useScroll();
  const spacerHeight = 81000;
  const scale = useTransform(
    scrollY,
    [spacerHeight, spacerHeight + window.innerHeight],
    [0.2, 1]
  );
  const textTrans = useTransform(
    scrollY,
    [spacerHeight, spacerHeight + window.innerHeight],
    [window.innerHeight, 0]
  );
  //const scale = useTransform(scrollY, [0, window.innerHeight], [0.2, 1]);
  //const textTrans = useTransform(
  //  scrollY,
  //  [0, window.innerHeight],
  //  [window.innerHeight, 0]
  //);

  return (
    <div>
      <div className="spacer"></div>
      <section id="video">
        <div className="shim"></div>
        <div className="video__sticky">
          <motion.video
            className="main__video"
            autoPlay
            muted
            loop
            playsInline
            src="https://framerusercontent.com/modules/assets/BcIElVBzSD9P1ht5PhehnVyzTA~0iRDOKjSaNyoXJfsXAcSsdeEYSbJ8aAp3MvS5ts7LL0.mp4"
            style={{ scale }}
          ></motion.video>
          <div className="video__text__overlay">
            <motion.h2
              className="text__header__left"
              style={{ x: useTransform(textTrans, (value) => -value) }}
            >
              SHOW
            </motion.h2>
            <motion.h2
              className="text__header__right"
              style={{ x: useTransform(textTrans, (value) => value) }}
            >
              CASE
            </motion.h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vid2;
