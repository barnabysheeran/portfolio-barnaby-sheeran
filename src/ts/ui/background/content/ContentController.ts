import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
} from 'three';

import CursorController from './cursor/CursorController';

export default class ContentController {
  #SCENE: Scene;

  #CUBE: Mesh;

  #CURSOR_CONTROLLER: CursorController;

  // ___________________________________________________________________________

  constructor(
    canvas: HTMLCanvasElement,
    scene: Scene,
    perspectiveCamera: PerspectiveCamera,
  ) {
    // Store
    this.#SCENE = scene;

    // Create Cursor Controller
    this.#CURSOR_CONTROLLER = new CursorController(
      canvas,
      scene,
      perspectiveCamera,
    );

    // Create a simple cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.#CUBE = new Mesh(geometry, material);
    this.#SCENE.add(this.#CUBE);
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number): void {
    // Tick Cursor Controller
    const CURSOR_POSITION = this.#CURSOR_CONTROLLER.tick();

    // Position Cube
    this.#CUBE.position.set(CURSOR_POSITION.x, CURSOR_POSITION.y, 0);

    // Rotate cube
    this.#CUBE.rotation.x += 0.00001 * frameDeltaMS;
    this.#CUBE.rotation.y += 0.00001 * frameDeltaMS;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    this.#CURSOR_CONTROLLER.destroy();
  }
}
