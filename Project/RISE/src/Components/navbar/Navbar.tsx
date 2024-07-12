import "./Navbar.scss";
import Sidebar from "./Sidebar/Sidebar";

function Navbar() {
  return (
    <div className="navbar">
      <Sidebar />
      <div className="wrappern">
        <span>FlutterForcast</span>
        <div className="social">
          <span>
            <a href="https://www.linkedin.com/in/abbass-naim-20404b1a5/">
              <img src="/icons8-linkedin-48.png" />
            </a>
          </span>
          <span>
            <a href="https://codeforces.com/profile/abbasslb">
              <img src="/icons8-codeforces.-programming-competitions-and-contests,-programming-community.-24.png" />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
