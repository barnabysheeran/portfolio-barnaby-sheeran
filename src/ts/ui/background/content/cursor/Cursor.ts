import {
  Scene,
  Group,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  OctahedronGeometry,
} from 'three';

export default class Cursor {
  #GROUP: Group;

  #POSITION_TARGET: Vector2;
  #POSITION_PREV: Vector2;

  #VELOCITY: Vector2;
  #VELOCITY_DECAY: number = 0.1;
  #VELOCITY_SCALE: number = 0.1;

  #LERP_FACTOR: number = 0.01;

  // ___________________________________________________________________________

  constructor(scene: Scene) {
    // Initialize Target and Previous Position
    this.#POSITION_TARGET = new Vector2(0, 0);
    this.#POSITION_PREV = new Vector2(0, 0);
    this.#VELOCITY = new Vector2(0, 0);

    // Create Group
    this.#GROUP = new Group();
    scene.add(this.#GROUP);

    // Create Sphere Material
    const SPHERE_MATERIAL = new MeshBasicMaterial({
      color: 0xffffff,
    });

    // Create Octahedron Geometry
    const OCTAHEDRON_GEOMETRY = new OctahedronGeometry(0.2, 2);

    // Create a Sphere at Vertex Positions
    for (let i = 0; i < OCTAHEDRON_GEOMETRY.attributes.position.count; i++) {
      const x = OCTAHEDRON_GEOMETRY.attributes.position.getX(i);
      const y = OCTAHEDRON_GEOMETRY.attributes.position.getY(i);
      const z = OCTAHEDRON_GEOMETRY.attributes.position.getZ(i);

      const SPHERE_GEOMETRY = new SphereGeometry(0.01, 16, 16);
      const sphere = new Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);
      sphere.position.set(x, y, z);
      this.#GROUP.add(sphere);
    }
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
      (this.#POSITION_TARGET.x - this.#GROUP.position.x) *
      frameDeltaMS *
      this.#LERP_FACTOR;
    this.#GROUP.position.y +=
      (this.#POSITION_TARGET.y - this.#GROUP.position.y) *
      frameDeltaMS *
      this.#LERP_FACTOR;

    // Add to Velocity
    this.#VELOCITY.x +=
      (this.#GROUP.position.x - this.#POSITION_PREV.x) * frameDeltaMS;
    this.#VELOCITY.y +=
      (this.#GROUP.position.y - this.#POSITION_PREV.y) * frameDeltaMS;

    // Rotate from Velocity
    this.#GROUP.rotation.x += this.#VELOCITY.y * this.#VELOCITY_SCALE;
    this.#GROUP.rotation.y += this.#VELOCITY.x * this.#VELOCITY_SCALE;

    // Store
    this.#POSITION_PREV.x = this.#GROUP.position.x;
    this.#POSITION_PREV.y = this.#GROUP.position.y;
  }
}
