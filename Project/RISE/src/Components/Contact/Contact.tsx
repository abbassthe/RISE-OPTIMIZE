"use client";

import { useProgress, Html } from "@react-three/drei";
import "./Contact.scss";
import "./ccontainer.scss";
import ContactForm from "./ContactForm";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  return (
    <div
      className="wrapperContact d-flex flex-row justify-content-evenly align-items-center"
      style={{ overflowY: "hidden" }}
    >

      <ContactForm />
      <div
        className="wrapperContact d-flex flex-column justify-content-evenly align-items-center"
        style={{ width: "30%", overflow: "hidden" }}
      >
        <h1
          className="text-center ml-3"
          style={{ color: "#468585", marginBottom: "-5rem" }}
        >
          Contact Us
        </h1>
        <h5 style={{ color: "#468585", textAlign: "center" }}>
          Get in touch with us to request an invoice for a specific area
        </h5>
      </div>

    </div>
  );
}
export default Contact;
