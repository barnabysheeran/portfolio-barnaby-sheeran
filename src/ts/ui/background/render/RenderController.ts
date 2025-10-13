import { Scene, WebGLRenderer } from 'three';

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
    this.#WEBGL_RENDERER.setSize(window.innerWidth, window.innerHeight);
    this.#WEBGL_RENDERER.setPixelRatio(window.devicePixelRatio);
  }

  // ______________________________________________________________________ Tick

  render(scene: Scene, camera: Camera): void {
    this.#WEBGL_RENDERER.render(scene, camera);
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
