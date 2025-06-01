import { KeyboardControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import { Experience } from "@/components/models/experience";

const KEYBOARD_MAP = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

const Page = () => {
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-neutral-300"
      onContextMenu={handleContextMenu}
    >
      <div className="bg-opacity-50 absolute top-1 left-1 z-10 rounded bg-black/50 p-4 text-white">
        <h3 className="mb-2 text-sm font-bold">Controls:</h3>
        <p className="text-xs">Use WASD or arrow keys to move</p>
        <p className="text-xs">Use the shift key to run</p>
      </div>
      <KeyboardControls map={KEYBOARD_MAP}>
        <Canvas
          shadows
          camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}
          style={{
            touchAction: "none",
          }}
        >
          <Suspense>
            <color attach="background" args={["#ececec"]} />
            <Experience />
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default Page;
