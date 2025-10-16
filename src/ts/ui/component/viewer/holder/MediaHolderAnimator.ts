import type { Variants } from 'framer-motion';

export class MediaHolderAnimator {
  // _________________________________________________________________ Variants

  static getMediaVariants(): Variants {
    return {
      enter: {
        opacity: 0,
        scale: 0.95,
        zIndex: 0,
      },
      center: {
        opacity: 1,
        scale: 1,
        zIndex: 1,
        transition: {
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        zIndex: 0,
        transition: {
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        },
      },
    };
  }
}
