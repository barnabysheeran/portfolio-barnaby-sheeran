import { Scene } from 'three';

import ContentController from './content/ContentController';
import LightController from './light/LightController';
import CameraController from './camera/CameraController';
import RenderController from './render/RenderController';

export class BackgroundController {
  #CANVAS: HTMLCanvasElement;

  #SCENE: Scene;

  #CONTENT_CONTROLLER: ContentController;
  #LIGHT_CONTROLLER: LightController;
  #CAMERA_CONTROLLER: CameraController;
  #RENDER_CONTROLLER: RenderController;

  #width: number = 0;
  #height: number = 0;

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
    this.#CAMERA_CONTROLLER = new CameraController(this.#SCENE);

    this.#RENDER_CONTROLLER = new RenderController(this.#CANVAS);

    // Start Main Loop
    this.#applicationRunTimeMS = performance.now();
    this.#animationFrameId = requestAnimationFrame(this.#loop);
  }

  // ______________________________________________________________________ Tick

  #loop = (time: number) => {
    this.#tick(time);
    this.#animationFrameId = requestAnimationFrame(this.#loop);
  };

  #tick(applicationRunTimeMS: number): void {
    // Calculate Frame Delta MS
    const FRAME_DELTA_MS = applicationRunTimeMS - this.#applicationRunTimeMS;

    // Store
    this.#applicationRunTimeMS = applicationRunTimeMS;

    // Resized ?
    if (
      this.#width !== this.#CANVAS.clientWidth ||
      this.#height !== this.#CANVAS.clientHeight
    ) {
      this.#setSize(this.#CANVAS.clientWidth, this.#CANVAS.clientHeight);
    }

    // Tick Controllers - Order Important - Render Last
    this.#CONTENT_CONTROLLER.tick(FRAME_DELTA_MS);
    // this.#LIGHT_CONTROLLER.tick(FRAME_DELTA_MS);
    // this.#CAMERA_CONTROLLER.tick(FRAME_DELTA_MS);

    // Render
    this.#RENDER_CONTROLLER.render(
      this.#SCENE,
      this.#CAMERA_CONTROLLER.getPerspectiveCamera(),
    );
  }

  // ______________________________________________________________________ Size

  #setSize(width: number, height: number): void {
    console.log('BackgroundController. setSize', width, height);

    // Renderer
    this.#RENDER_CONTROLLER.setSize(width, height);

    // Store
    this.#width = width;
    this.#height = height;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    if (this.#animationFrameId !== null) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
    // Destroy Controllers
    this.#CONTENT_CONTROLLER.destroy();
    this.#LIGHT_CONTROLLER.destroy();
    this.#CAMERA_CONTROLLER.destroy();
    this.#RENDER_CONTROLLER.destroy();
  }
}
