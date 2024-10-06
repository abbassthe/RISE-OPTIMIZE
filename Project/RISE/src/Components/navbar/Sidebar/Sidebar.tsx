import { motion } from "framer-motion";
import "./Sidebar.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "https://backendflutterforecast.onrender.com",
});

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const variants = {
    open: {
      clipPath: "circle(900px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
    closed: {
      clipPath: "circle(23px at 50px 50px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };
  useEffect(() => {
    client
      .get("/userapi/user")
      .then(function () {
        setCurrentUser(true);
      })
      .catch(function () {
        setCurrentUser(false);
      });
  }, []);
  let items = [];

  if (currentUser) {
    // logged in
    items = [
      { name: "Homepage", path: "/homepage" },
      { name: "Map", path: "/map" },
      { name: "Insect2vect", path: "/Insect2vect" },
      { name: "Logout", path: "/logout" },
    ];
  } else {
    // not logged in
    items = [
      { name: "Homepage", path: "/homepage" },
      { name: "Login", path: "/login" },
      { name: "SignUp", path: "/signup" },
    ];
  }

  return (
    <motion.div className="sidebar" animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <div className="links">
          {items.map((item) => (
            <NavLink to={item.path} key={item.name}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </motion.div>
      <button onClick={() => setOpen((prev) => !prev)}>
        <svg width="23" height="23" viewBox="0 0 23 23">
          <motion.path
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              closed: { d: " M 2 2.5 L 20 2.5 " },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          ></motion.path>
          <motion.path
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
          ></motion.path>
          <motion.path
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: " M 3 2.5 L 17 16.346 " },
            }}
          ></motion.path>
        </svg>
      </button>
    </motion.div>
  );
}
export default Sidebar;
