import { OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";
import React from "react";

import { CharacterController } from "./character-controller";
import { Map } from "./map";

const maps: Record<string, { scale: number; position: [number, number, number] }> = {
  animal_crossing: {
    scale: 20,
    position: [-15, -1, 10],
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6],
  },
};

export const Experience = () => {
  const shadowCameraRef = React.useRef(new THREE.OrthographicCamera());
  const { map } = useControls("Map", {
    map: {
      value: "castle_on_hills",
      options: Object.keys(maps),
    },
  });

  return (
    <>
      {/* <Environment preset="city" /> */}
      <ambientLight intensity={1} castShadow />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        <CharacterController />
      </Physics>
    </>
  );
};
