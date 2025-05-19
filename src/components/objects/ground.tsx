import React, { useEffect, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export const Ground = () => {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.receiveShadow = true;
    }
  }, []);

  return (
    <RigidBody type="fixed" restitution={1}>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
};
