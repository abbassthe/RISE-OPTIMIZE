"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import { useProgress, Html } from "@react-three/drei";
import "./Locust.scss";

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
      <directionalLight position={[0, 5, 0]} intensity={2} />
      <directionalLight position={[5, 0, 0]} intensity={1} />
      <directionalLight position={[-5, 0, 0]} intensity={1} />
      <directionalLight position={[0, 0, 5]} intensity={2} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
