"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useRef } from "react";
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei";
import "./Contact.scss";
import "./ccontainer.scss";
import ContactForm from './ContactForm';
import 'bootstrap/dist/css/bootstrap.min.css';
function Loader() {
  const { progress, active } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}


function Contact() {
  return (
    <div className="wrapperContact">
      {/* <div className="section1"> */}
      <h1 className='text-center' style={{ color: '#468585' }}>Contact Us</h1>
      <ContactForm />
      {/* <div className="text">Contact US</div> */}
      {/* </div> */}
    </div >
  );
}
export default Contact;
