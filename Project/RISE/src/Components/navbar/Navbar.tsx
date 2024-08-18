import "./Navbar.scss";
import Sidebar from "./Sidebar/Sidebar";

function Navbar() {
  return (
    <div className="navbar">
      <Sidebar />
      <div className="wrappern">
        <span style={{ color: "#50B498", marginLeft: "2%" }}>
          FlutterForcast
        </span>
        <div className="social"></div>
      </div>
    </div>
  );
}
export default Navbar;
