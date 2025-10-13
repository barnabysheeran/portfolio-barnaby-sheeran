import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

export default class RenderController {
  #WEBGL_RENDERER: WebGLRenderer;

  // ___________________________________________________________________________

  constructor(canvas: HTMLCanvasElement) {
    // Create WebGL Renderer
    this.#WEBGL_RENDERER = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    // Set Pixel Ratio
    this.#WEBGL_RENDERER.setPixelRatio(window.devicePixelRatio);
  }

  // ______________________________________________________________________ Tick

  render(scene: Scene, camera: PerspectiveCamera): void {
    this.#WEBGL_RENDERER.render(scene, camera);
  }

  // ______________________________________________________________________ Size

  setSize(width: number, height: number): void {
    this.#WEBGL_RENDERER.setSize(width, height, false);
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
