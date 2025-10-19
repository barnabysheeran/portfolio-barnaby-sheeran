import { Vector2 } from 'three';

import { useUIStateStore } from '../../../store/uiState/uiStateStore';

const setCursorPositionPx = useUIStateStore.getState().setCursorPositionPx;

function handleMouseMove(e: MouseEvent) {
  // ________________________________________________________ Cursor Position Px

  setCursorPositionPx(new Vector2(e.clientX, e.clientY));
}

window.addEventListener('mousemove', handleMouseMove);
