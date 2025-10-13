import { Scene, AmbientLight } from 'three';

export default class LightController {
  #AMBIENT_LIGHT: AmbientLight;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Create Ambient Light
    this.#AMBIENT_LIGHT = new AmbientLight(0xffffff, 1);

    scene.add(this.#AMBIENT_LIGHT);
  }

  // ______________________________________________________________________ Tick

  // tick(frameDeltaMS: number): void {}

  // ___________________________________________________________________ Destroy

  destroy(): void {}
}
