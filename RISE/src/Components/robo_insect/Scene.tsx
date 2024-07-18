"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useRef } from "react";
import { useProgress, Html, ScrollControls, Scroll } from "@react-three/drei";
import "./Locust.scss";

function Loader() {
  const { progress, active } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene2() {
  return (
    //<Canvas
    //  gl={{ antialias: true }}
    //  dpr={[1, 1.5]}
    //  className="relative h-svh"
    //  camera={{ position: [2, 6, 4] }}
    //>
    //  <directionalLight position={[0, 5, 0]} intensity={2} />
    //  <directionalLight position={[5, 0, 0]} intensity={1} />
    //  <directionalLight position={[-5, 0, 0]} intensity={1} />
    //  <directionalLight position={[0, 0, 5]} intensity={2} />
    //  <Suspense fallback={<Loader />}>
    //    <Model />
    //  </Suspense>
    //</Canvas>
    <div id="lmd">
      <img
        id="lm"
        src="a1e92e73-7c4e-435d-8b13-342bb24f878d.max-1000x1000.png"
      ></img>
      <span id="vect">INSECT2VECT</span>
    </div>
  );
}
