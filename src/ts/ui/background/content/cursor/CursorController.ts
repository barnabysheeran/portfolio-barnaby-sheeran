import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2,
} from 'three';

import { useUIStateStore } from '../../../../store/uiState/uiStateStore';

export default class CursorController {
  #CANVAS: HTMLCanvasElement;
  #PERSPECTIVE_CAMERA: PerspectiveCamera;

  #RAYCASTER: Raycaster;
  #PLANE: Mesh;

  // ___________________________________________________________________________

  constructor(
    canvas: HTMLCanvasElement,
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
  ) {
    // Store
    this.#CANVAS = canvas;
    this.#PERSPECTIVE_CAMERA = perspectiveCamera;

    // Create Raycaster
    this.#RAYCASTER = new Raycaster();

    // Create Camera Facing Plane
    const GEOMETRY = new PlaneGeometry(10, 10, 10, 10);
    const MATERIAL = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0,
      transparent: true,
    });
    this.#PLANE = new Mesh(GEOMETRY, MATERIAL);
    scene.add(this.#PLANE);
  }

  // ______________________________________________________________________ Tick

  tick(): Vector2 {
    // Get Cursor Position Px
    const CURSOR_POSITION_PX = useUIStateStore.getState().cursorPositionPx;

    console.log('CursorController.tick CURSOR_POSITION_PX', CURSOR_POSITION_PX);

    // Set Raycaster from Camera and Cursor Position Px
    this.#RAYCASTER.setFromCamera(CURSOR_POSITION_PX, this.#PERSPECTIVE_CAMERA);

    // Raycast to Plane
    const INTERSECTS = this.#RAYCASTER.intersectObject(this.#PLANE);

    console.log('CursorController.tick INTERSECTS', INTERSECTS);

    // Calculate Cursor Position 3D
    const CURSOR_POSITION_3D = new Vector2();

    if (INTERSECTS.length > 0) {
      const point = INTERSECTS[0].point;
      CURSOR_POSITION_3D.set(point.x, point.y);
    }

    return CURSOR_POSITION_3D;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    // No event listeners to clean up
  }
}
