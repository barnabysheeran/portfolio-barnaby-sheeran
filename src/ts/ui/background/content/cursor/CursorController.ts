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
  #PERSPECTIVE_CAMERA: PerspectiveCamera;

  #RAYCASTER: Raycaster;
  #PLANE: Mesh;

  // ___________________________________________________________________________

  constructor(scene: Scene, perspectiveCamera: PerspectiveCamera) {
    // Store
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
    this.#PLANE.name = 'CursorPlane';
    scene.add(this.#PLANE);
  }

  // ______________________________________________________________________ Tick

  tick(): Vector2 {
    // Get Data from Store
    const CURSOR_POSITION_PX = useUIStateStore.getState().cursorPositionPx;
    const SURFACE_SIZE_PX = useUIStateStore.getState().surfaceSizePx;

    // Calculate Normalized Coordinates
    const NORMALIZED_COORDINATES = new Vector2(
      (CURSOR_POSITION_PX.x / SURFACE_SIZE_PX.x) * 2 - 1,
      -(CURSOR_POSITION_PX.y / SURFACE_SIZE_PX.y) * 2 + 1,
    );

    // Set Raycaster
    this.#RAYCASTER.setFromCamera(
      NORMALIZED_COORDINATES,
      this.#PERSPECTIVE_CAMERA,
    );

    // Raycast to Plane
    const INTERSECTS = this.#RAYCASTER.intersectObject(this.#PLANE);

    // Calculate Cursor Position 3D
    const CURSOR_POSITION_3D = new Vector2();

    // Ensure intersection is with the plane
    const planeIntersect = INTERSECTS.find(
      (i) => i.object.name === 'CursorPlane',
    );

    if (planeIntersect) {
      const point = planeIntersect.point;
      CURSOR_POSITION_3D.set(point.x, point.y);
    }

    return CURSOR_POSITION_3D;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    // No event listeners to clean up
  }
}
