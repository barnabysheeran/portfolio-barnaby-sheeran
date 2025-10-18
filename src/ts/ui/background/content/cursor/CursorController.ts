import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  Vector2,
} from 'three';

export default class CursorController {
  #CANVAS: HTMLCanvasElement;
  #PERSPECTIVE_CAMERA: PerspectiveCamera;

  #POSITION_MOUSE: Vector2;
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

    // Initialize Mouse Position
    this.#POSITION_MOUSE = new Vector2();

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

    // Add Event Listeners
    this.#CANVAS.addEventListener('mousemove', this.#onMouseMove.bind(this));
    this.#CANVAS.addEventListener('mouseout', this.#onMouseOut.bind(this));
  }

  // ______________________________________________________________ Mouse Events

  #onMouseMove(event: MouseEvent): void {
    // Get Client Rectangle
    const RECT = this.#CANVAS.getBoundingClientRect();

    // Get Mouse Position
    this.#POSITION_MOUSE.x = ((event.clientX - RECT.left) / RECT.width) * 2 - 1;
    this.#POSITION_MOUSE.y =
      -((event.clientY - RECT.top) / RECT.height) * 2 + 1;
  }

  #onMouseOut(): void {
    this.#POSITION_MOUSE.x = 0;
    this.#POSITION_MOUSE.y = 0;
  }

  // ______________________________________________________________________ Tick

  tick(): Vector2 {
    // Update Raycaster from Mouse Position
    this.#RAYCASTER.setFromCamera(
      this.#POSITION_MOUSE,
      this.#PERSPECTIVE_CAMERA,
    );

    // Raycast to plane
    const intersects = this.#RAYCASTER.intersectObject(this.#PLANE);

    const POSITION = new Vector2();

    if (intersects.length > 0) {
      const point = intersects[0].point;
      POSITION.set(point.x, point.y);
    }

    return POSITION;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    this.#CANVAS.removeEventListener('mousemove', this.#onMouseMove);
  }
}
