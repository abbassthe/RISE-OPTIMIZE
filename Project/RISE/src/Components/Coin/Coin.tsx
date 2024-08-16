import { motion } from "framer-motion";
import "./Coin.scss";
function Coin() {
  return (
    <div className="CoinWrapper ">
      <div className="InnerCoinWrapper">
        <div className="CoinTextWrapper">
          <span className="CoinText">8.5 billion</span>
          <span className="CoinSubtext">
            dollars expected to be lost in the now forming outbreak
          </span>
        </div>
        <div className="CoinVid">
          <motion.video
            className="CoinVideo"
            autoPlay
            muted
            loop
            playsInline
            src="\vp9.webm"
            id="vidC"
          ></motion.video>
        </div>
      </div>
    </div>
  );
}

export default Coin;
