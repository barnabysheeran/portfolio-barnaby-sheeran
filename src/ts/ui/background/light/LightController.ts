import { Scene } from 'three';

export default class LightController {
  #SCENE: Scene;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Store
    this.#SCENE = scene;
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number): void {}

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
