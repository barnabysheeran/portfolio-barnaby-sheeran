import { Scene } from 'three';

import ContentController from './content/ContentController';
import LightController from './light/LightController';

export class BackgroundController {
  #CANVAS: HTMLCanvasElement;

  #SCENE: Scene;

  #CONTENT_CONTROLLER: ContentController;
  #LIGHT_CONTROLLER: LightController;

  #applicationRunTimeMS: number = 0;
  #animationFrameId: number | null = null;

  // ___________________________________________________________________________

  constructor(canvas: HTMLCanvasElement) {
    // Store
    this.#CANVAS = canvas;

    // Create Scene
    this.#SCENE = new Scene();

    // Create Controllers
    this.#CONTENT_CONTROLLER = new ContentController(this.#SCENE);
    this.#LIGHT_CONTROLLER = new LightController(this.#SCENE);

    // Start Main Loop
    this.#applicationRunTimeMS = performance.now();
    this.#animationFrameId = requestAnimationFrame(this.#tick.bind(this));
  }

  // ______________________________________________________________________ Tick

  #tick(applicationRunTimeMS: number): void {
    // Calculate Frame Delta MS
    const FRAME_DELTA_MS = applicationRunTimeMS - this.#applicationRunTimeMS;

    // Store
    this.#applicationRunTimeMS = applicationRunTimeMS;

    // Tick Controllers
    this.#CONTENT_CONTROLLER.tick(FRAME_DELTA_MS);
    this.#LIGHT_CONTROLLER.tick(FRAME_DELTA_MS);

    // Request Next Frame
    this.#animationFrameId = requestAnimationFrame(this.#tick.bind(this));
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    // TODO
  }
}
