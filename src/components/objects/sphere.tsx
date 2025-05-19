import { RigidBody } from "@react-three/rapier";
import React from "react";

interface Props {
  color?: string;
  position?: [number, number, number];
}

export const Sphere = ({ color, position = [0, 0.5, 0] }: Props) => {
  return (
    <RigidBody colliders="ball">
      <mesh position={position}>
        <sphereGeometry args={[0.5, 40, 40]} />
        <meshStandardMaterial color={color || "orange"} />
      </mesh>
    </RigidBody>
  );
};
