import { useScrollProgress } from '../../../../hook/useScrollProgress';
import { useState, useEffect, useRef } from 'react';
import { ScrollProgressAnimator } from './ScrollProgressAnimator';

import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  // _____________________________________________________________________ State

  const scrollProgress = useScrollProgress();
  const [scrollProgressDisplay, setScrollProgressDisplay] = useState(0);
  const animatorRef = useRef<ScrollProgressAnimator | null>(null);

  // Convert rem to pixels for calculations (assuming 1rem = 16px)
  const radiusRem = 2.8125;
  const radiusPx = radiusRem * 16;

  const circumference = 2 * Math.PI * radiusPx;
  const strokeDashoffset =
    circumference - scrollProgressDisplay * circumference;

  // _________________________________________________________________ Animation

  // Initialize Animator Only Once
  useEffect(() => {
    animatorRef.current = new ScrollProgressAnimator(
      setScrollProgressDisplay,
      0, // Start from 0 on mount
    );

    // Cleanup on unmount
    return () => {
      if (animatorRef.current) {
        animatorRef.current.destroy();
        animatorRef.current = null;
      }
    };
  }, []);

  // Update target when scroll progress changes
  useEffect(() => {
    if (animatorRef.current) {
      animatorRef.current.setTarget(scrollProgress);
    }
  }, [scrollProgress]);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['scroll-progress']}>
      <svg
        className={styles['progress-ring']}
        width="6.25rem"
        height="6.25rem"
        viewBox="0 0 100 100"
      >
        <circle
          className={styles['progress-ring-circle']}
          stroke="currentColor"
          strokeWidth="0.25rem"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
    </div>
  );
}
