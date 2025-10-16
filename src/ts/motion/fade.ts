import type { Variants } from 'framer-motion';

import { DURATION_QUICK, DURATION_SLOW } from './duration';

// _______________________________________________________________________ Quick

export const fadeQuickVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_QUICK,
      ease: 'circOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_QUICK,
      ease: 'circOut',
    },
  },
};

// ________________________________________________________________________ Slow

export const fadeSlowVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: 'circOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: 'circOut',
    },
  },
};
