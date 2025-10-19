import { Scene, PerspectiveCamera } from 'three';

import CursorController from './cursor/CursorController';
import Cursor from './cursor/Cursor';

export default class ContentController {
  #CURSOR_CONTROLLER: CursorController;
  #CURSOR: Cursor;

  // ___________________________________________________________________________

  constructor(scene: Scene, perspectiveCamera: PerspectiveCamera) {
    // Create Cursor Controller
    this.#CURSOR_CONTROLLER = new CursorController(scene, perspectiveCamera);

    // Create Cursor
    this.#CURSOR = new Cursor(scene);
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number): void {
    // Tick Cursor Controller
    const CURSOR_POSITION = this.#CURSOR_CONTROLLER.tick();

    // Tick Cursor
    this.#CURSOR.tick(frameDeltaMS, CURSOR_POSITION);
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    this.#CURSOR_CONTROLLER.destroy();
  }
}
