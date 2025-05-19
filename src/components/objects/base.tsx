import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import React from "react";

type MaterialType =
  | "concrete"
  | "glass"
  | "metal"
  | "paper"
  | "plastic"
  | "rubber"
  | "wood";

const PHYSICS_CONFIG: Record<
  MaterialType,
  {
    restitution: number;
    friction: number;
    density: number;
  }
> = {
  concrete: { restitution: -3, friction: 1, density: 4.5 },
  glass: { restitution: -0.5, friction: 0.3, density: 2.5 },
  metal: { restitution: -2, friction: 0.4, density: 7.8 },
  paper: { restitution: -2, friction: 0.5, density: 0.7 },
  plastic: { restitution: 0.4, friction: 0.3, density: 1.0 },
  rubber: { restitution: 0.9, friction: 0.9, density: 1.1 },
  wood: { restitution: 0.3, friction: 0.6, density: 0.7 },
};

interface Props {
  geometry: React.JSX.Element;
  id: string;
  material: React.JSX.Element;
  color?: string;
  material_type?: MaterialType;
  position?: [number, number, number];
}

export const Base = ({
  geometry,
  material,
  color = "blue",
  material_type = "rubber",
  position = [0, 0.5, 0],
}: Props) => {
  const { WALK_SPEED, RUN_SPEED } = useControls("Character Control", {
    WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
    RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
  });

  const [, get] = useKeyboardControls();

  const cameraLookAtWorldPosition = React.useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraWorldPosition = React.useRef<THREE.Vector3>(new THREE.Vector3());
  const cameraLookAt = React.useRef<THREE.Vector3>(new THREE.Vector3());
  const materialRef = React.useRef<THREE.Material>(null);
  const cameraPosition = React.useRef<THREE.Group>(null);
  const cameraTarget = React.useRef<THREE.Group>(null);
  const object = React.useRef<RapierRigidBody>(null);
  const container = React.useRef<THREE.Group>(null);
  const character = React.useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (object.current) {
      const velocity = object.current.linvel();
      const movement = { x: 0, y: 0, z: 0 };

      if (get().forward) {
        console.log("forward");
        movement.z = 1;
      }
      if (get().backward) {
        console.log("backward");
        movement.z = -1;
      }
      if (get().left) {
        console.log("left");
        movement.x = -1;
      }
      if (get().right) {
        console.log("right");
        movement.x = 1;
      }
      if (get().up) {
        console.log("up");
        movement.y = 1;
      }
      if (get().down) {
        console.log("down");
        movement.y = -1;
      }
    }

    cameraPosition.current?.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current?.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
    }
  });

  const { density, friction, restitution } = PHYSICS_CONFIG[material_type];

  return (
    <RigidBody
      ref={object}
      density={density}
      friction={friction}
      restitution={restitution}
      colliders="trimesh"
      lockRotations
    >
      <group ref={container}>
        <group ref={cameraPosition} position-z={1.5} />
        <group ref={cameraTarget} position-y={4} position-z={-4} />
        <group ref={character}>
          <mesh position={position}>
            {geometry}
            {React.cloneElement(material, { ref: materialRef, color })}
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
};
