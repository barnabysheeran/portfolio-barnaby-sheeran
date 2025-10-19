import { Vector2 } from 'three';

import { useUIStateStore } from '../../../store/uiState/uiStateStore';

// _______________________________________________________________________ Store

const setCursorPositionPx = useUIStateStore.getState().setCursorPositionPx;
const setSurfaceSizePx = useUIStateStore.getState().setSurfaceSizePx;

let lastClientX = 0;
let lastClientY = 0;

function handleMouseMove(e: MouseEvent) {
  lastClientX = e.clientX;
  lastClientY = e.clientY;
}

window.addEventListener('mousemove', handleMouseMove);

function updateLoop() {
  // Multiply by devicePixelRatio for physical pixels (DPI aware)
  const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

  setCursorPositionPx(
    new Vector2(
      lastClientX * DEVICE_PIXEL_RATIO,
      lastClientY * DEVICE_PIXEL_RATIO,
    ),
  );
  setSurfaceSizePx(
    new Vector2(
      window.innerWidth * DEVICE_PIXEL_RATIO,
      window.innerHeight * DEVICE_PIXEL_RATIO,
    ),
  );
  requestAnimationFrame(updateLoop);
}

// Start the update loop
updateLoop();
