import { useEffect } from 'react';

import { useUIStateStore } from '../../../store/uiState/uiStateStore';

import { Vector2 } from 'three';

export default function UIOverlaySurface() {
  // ___________________________________________________________ Cursor Position

  const setCursorPosition = useUIStateStore((state) => state.setCursorPosition);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setCursorPosition(new Vector2(e.clientX, e.clientY));
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setCursorPosition]);

  // ____________________________________________________________________ Render

  return <div></div>;
}
