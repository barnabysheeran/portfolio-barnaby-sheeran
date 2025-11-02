import { useScrollProgress } from '../../../../hook/useScrollProgress';
import { useState, useEffect, useRef } from 'react';

import ScrollProgressAnimator from './ScrollProgressAnimator';

import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  // _____________________________________________________________________ State

  const scrollProgress = useScrollProgress();
  const [scrollProgressDisplay, setScrollProgressDisplay] = useState(0);
  const animatorRef = useRef<ScrollProgressAnimator | null>(null);

  // Ring dimensions in pixels
  const ringSize = 50;
  const ringRadius = 19.8;

  const strokeWidthCircle = 3;

  const circumference = 2 * Math.PI * ringRadius;
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
        width={ringSize}
        height={ringSize}
        viewBox={`0 0 ${ringSize} ${ringSize}`}
      >
        {/* Progress circle */}
        <circle
          className={styles['progress-ring-circle']}
          r={ringRadius}
          cx={ringSize / 2}
          cy={ringSize / 2}
          strokeWidth={strokeWidthCircle}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
    </div>
  );
}
