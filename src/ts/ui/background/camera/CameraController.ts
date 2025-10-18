import { Scene, PerspectiveCamera } from 'three';

export default class CameraController {
  #SCENE: Scene;

  #PERSPECTIVE_CAMERA: PerspectiveCamera;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Store
    this.#SCENE = scene;

    // Create Perspective Camera
    this.#PERSPECTIVE_CAMERA = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.#PERSPECTIVE_CAMERA.position.z = 5;
    this.#SCENE.add(this.#PERSPECTIVE_CAMERA);
  }

  // ______________________________________________________________________ Tick

  // tick(frameDeltaMS: number): void {}

  // ____________________________________________________________________ Access

  getPerspectiveCamera(): PerspectiveCamera {
    return this.#PERSPECTIVE_CAMERA;
  }

  // ______________________________________________________________________ Size

  setSize(width: number, height: number): void {
    this.#PERSPECTIVE_CAMERA.aspect = width / height;
    this.#PERSPECTIVE_CAMERA.updateProjectionMatrix();
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
