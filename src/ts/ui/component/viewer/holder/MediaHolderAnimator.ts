import type { Variants } from 'framer-motion';

export class MediaHolderAnimator {
  // _________________________________________________________________ Variants

  static getMediaVariants(): Variants {
    return {
      enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        scale: 0.9,
        zIndex: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 1,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
        },
      },
      exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0,
        scale: 0.9,
        zIndex: 0,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        },
      }),
    };
  }

  // _______________________________________________________________ Transitions

  static getSwipeConfidenceThreshold(): number {
    return 10000;
  }

  static swipePower(offset: number, velocity: number): number {
    return Math.abs(offset) * velocity;
  }
}
