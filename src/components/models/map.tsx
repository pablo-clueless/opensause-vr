import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import React from "react";

import type { ModelProps } from "@/types";

interface Props extends ModelProps {
  model: string;
}

export const Map = ({ model, ...props }: Props) => {
  const { scene, animations } = useGLTF(model);
  const group = React.useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  React.useEffect(() => {
    if (actions && animations.length > 0 && animations[0]?.name) {
      const action = actions[animations[0].name];
      if (action) {
        action.play();
      }
    }
  }, [actions, animations]);

  return (
    <group>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={scene} {...props} ref={group} />
      </RigidBody>
    </group>
  );
};
