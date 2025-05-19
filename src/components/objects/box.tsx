import { RigidBody } from "@react-three/rapier";
import React from "react";

interface Props {
  color?: string;
  position?: [number, number, number];
}

export const Box = ({ color, position = [0, 0.5, 0] }: Props) => {
  return (
    <RigidBody>
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color || "blue"} />
      </mesh>
    </RigidBody>
  );
};
