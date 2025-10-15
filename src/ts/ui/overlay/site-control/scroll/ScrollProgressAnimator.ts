export default class ScrollProgressAnimator {
  #currentValue: number = 0;
  #targetValue: number = 0;
  #lerpFactor: number = 0.05;
  #threshold: number = 0.001;

  #animationFrameId: number | null = null;

  #callback: (value: number) => void;

  // ___________________________________________________________________________

  constructor(callback: (value: number) => void, initialValue: number = 0) {
    // Store
    this.#callback = callback;
    this.#currentValue = initialValue;
  }

  // _________________________________________________________________ Animation

  #startAnimation(): void {
    // Only start animation if one isn't already running
    if (!this.#animationFrameId) {
      // console.log(
      //   'Starting animation ' + this.#currentValue + ' to ' + this.#targetValue,
      // );

      this.#animate();
    }
  }

  #animate = (): void => {
    // Calculate Delta
    const DELTA = this.#targetValue - this.#currentValue;

    // Lerp Towards Target
    this.#currentValue += DELTA * this.#lerpFactor;

    if (Math.abs(DELTA) > this.#threshold) {
      // Continue Animation

      // Loop
      this.#animationFrameId = requestAnimationFrame(this.#animate);

      // Update React Component
      this.#callback(this.#currentValue);
    } else {
      // End Animation

      // To End Value
      this.#currentValue = this.#targetValue;

      // End Loop
      this.#animationFrameId = null;

      // Update React Component
      this.#callback(this.#currentValue);
    }
  };

  // ____________________________________________________________________ Access

  setTarget(target: number): void {
    this.#targetValue = target;
    this.#startAnimation(); // This will only start if not already running
  }

  getCurrentValue(): number {
    return this.#currentValue;
  }

  // ___________________________________________________________________ Destroy

  destroy(): void {
    if (this.#animationFrameId) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#animationFrameId = null;
    }
  }
}
