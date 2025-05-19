import React from "react";

import { useControlStore } from "@/store/z-stores/control";

export const useKeyControls = () => {
  const { addKeyPressed, removeKeyPressed } = useControlStore();

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      addKeyPressed(e.key);
    },
    [addKeyPressed],
  );

  const handleKeyUp = React.useCallback(
    (e: KeyboardEvent) => {
      removeKeyPressed(e.key);
    },
    [removeKeyPressed],
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};
