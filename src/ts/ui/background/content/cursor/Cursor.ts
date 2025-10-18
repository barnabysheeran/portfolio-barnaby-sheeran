import {
  Scene,
  Group,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
} from 'three';

export default class Cursor {
  #GROUP: Group;
  #CUBE: Mesh;

  #POSITION_TARGET: Vector2;
  #POSITION_PREV: Vector2;

  #VELOCITY: Vector2;
  #VELOCITY_DECAY: number = 0.1;
  #VELOCITY_SCALE: number = 0.1;

  #LERP_FACTOR: number = 0.1;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Initialize Target and Previous Position
    this.#POSITION_TARGET = new Vector2(0, 0);
    this.#POSITION_PREV = new Vector2(0, 0);
    this.#VELOCITY = new Vector2(0, 0);

    // Create Group
    this.#GROUP = new Group();
    scene.add(this.#GROUP);

    // Create a simple cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.#CUBE = new Mesh(geometry, material);
    this.#GROUP.add(this.#CUBE);
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number, cursorPosition: Vector2): void {
    // Set Target Position
    this.#POSITION_TARGET.x = cursorPosition.x;
    this.#POSITION_TARGET.y = cursorPosition.y;

    // Decay Velocity
    this.#VELOCITY.x *= this.#VELOCITY_DECAY;
    this.#VELOCITY.y *= this.#VELOCITY_DECAY;

    // Lerp to Target Position
    this.#GROUP.position.x +=
      (this.#POSITION_TARGET.x - this.#GROUP.position.x) * this.#LERP_FACTOR;
    this.#GROUP.position.y +=
      (this.#POSITION_TARGET.y - this.#GROUP.position.y) * this.#LERP_FACTOR;

    // Add to Velocity
    this.#VELOCITY.x +=
      (this.#GROUP.position.x - this.#POSITION_PREV.x) * frameDeltaMS;
    this.#VELOCITY.y +=
      (this.#GROUP.position.y - this.#POSITION_PREV.y) * frameDeltaMS;

    // Rotate from Velocity
    this.#CUBE.rotation.x += this.#VELOCITY.y * this.#VELOCITY_SCALE;
    this.#CUBE.rotation.y += this.#VELOCITY.x * this.#VELOCITY_SCALE;

    // Store
    this.#POSITION_PREV.x = this.#GROUP.position.x;
    this.#POSITION_PREV.y = this.#GROUP.position.y;
  }
}
