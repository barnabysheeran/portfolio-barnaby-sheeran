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
    this.#setDevicePixelRatio();
  }

  // ____________________________________________________________________ Render

  render(scene: Scene, camera: PerspectiveCamera): void {
    this.#WEBGL_RENDERER.render(scene, camera);
  }

  // ________________________________________________________ Device Pixel Ratio

  #setDevicePixelRatio(): void {
    const PIXEL_RATIO = window.devicePixelRatio || 1;
    this.#WEBGL_RENDERER.setPixelRatio(PIXEL_RATIO);
  }

  // ______________________________________________________________________ Size

  setSize(width: number, height: number): void {
    // Update Pixel Ratio
    this.#setDevicePixelRatio();

    // Set Size
    this.#WEBGL_RENDERER.setSize(width, height, true);
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    this.#WEBGL_RENDERER.dispose();
  }
}
