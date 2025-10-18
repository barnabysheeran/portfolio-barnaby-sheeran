import { th } from 'framer-motion/client';
import {
  Scene,
  Group,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Vector3,
} from 'three';

export default class Cursor {
  #GROUP: Group;
  #CUBE: Mesh;

  #POSITION_TARGET: Vector2;
  #POSITION_PREV: Vector2;

  #VELOCITY: Vector2;
  #VELOCITY_DECAY: number = 0.1;
  #VELOCITY_SCALE: number = 5.0;

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

    // Lerp to Target Position
    this.#GROUP.position.x +=
      (this.#POSITION_TARGET.x - this.#GROUP.position.x) * this.#LERP_FACTOR;
    this.#GROUP.position.y +=
      (this.#POSITION_TARGET.y - this.#GROUP.position.y) * this.#LERP_FACTOR;

    // Calculate new velocity (difference between new and previous position)
    const newVelX = this.#GROUP.position.x - this.#POSITION_PREV.x;
    const newVelY = this.#GROUP.position.y - this.#POSITION_PREV.y;

    // If there is movement, update velocity; otherwise, decay
    if (Math.abs(newVelX) > 1e-5 || Math.abs(newVelY) > 1e-5) {
      this.#VELOCITY.x = newVelX;
      this.#VELOCITY.y = newVelY;
    } else {
      this.#VELOCITY.x *= this.#VELOCITY_DECAY;
      this.#VELOCITY.y *= this.#VELOCITY_DECAY;
    }

    // Use velocity to rotate the cube (more free spin)
    this.#CUBE.rotation.x += this.#VELOCITY.y * this.#VELOCITY_SCALE;
    this.#CUBE.rotation.y += this.#VELOCITY.x * this.#VELOCITY_SCALE;

    // Store current position as previous for next frame
    this.#POSITION_PREV.x = this.#GROUP.position.x;
    this.#POSITION_PREV.y = this.#GROUP.position.y;
  }
}
