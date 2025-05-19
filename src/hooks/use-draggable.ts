import { useCallback, useRef, useState } from "react";

export const useDraggable = (onDrag: (delta: { x: number; y: number }) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const previousPosition = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    previousPosition.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      if (isDragging) {
        const deltaX = e.clientX - previousPosition.current.x;
        const deltaY = e.clientY - previousPosition.current.y;

        onDrag({ x: deltaX, y: deltaY });

        previousPosition.current = { x: e.clientX, y: e.clientY };
      }
    },
    [isDragging, onDrag],
  );

  return {
    isDragging,
    dragHandlers: {
      onPointerDown,
      onPointerUp,
      onPointerMove,
    },
  };
};
