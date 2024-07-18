import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

import "./Locust.scss";
useGLTF.preload("/uploads_files_3171586_drgnfly.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "/uploads_files_3171586_drgnfly.glb"
  );
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    console.log(actions);
    //@ts-ignore
    //actions["PoseLib"].play().play = true;
    actions["landing"].play().play = true;
    actions["PoseLib"].play().play = true;
  }, []);
  //useFrame(() => {
  //  // Get current scroll position
  //  const rotationZ = scrollY * 0.0005 * Math.PI; // Adjust the multiplier to control rotation speed
  //  if (group.current) {
  //    group.current.rotation.y = rotationZ;
  //  }
  //});
  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
