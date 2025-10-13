import { Scene, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export default class ContentController {
  #SCENE: Scene;

  #CUBE: Mesh;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Store
    this.#SCENE = scene;

    // Create a simple cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 0x00ff00,
    });
    this.#CUBE = new Mesh(geometry, material);
    this.#SCENE.add(this.#CUBE);
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number): void {
    // Rotate cube
    this.#CUBE.rotation.x += 0.001 * frameDeltaMS;
    this.#CUBE.rotation.y += 0.001 * frameDeltaMS;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
