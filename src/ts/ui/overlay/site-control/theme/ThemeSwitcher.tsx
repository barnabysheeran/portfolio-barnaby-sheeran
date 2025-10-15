import { useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';

import { useUIStateStore } from '../../../../store/uiState/uiStateStore';

import ThemeSwitcherAnimator from './ThemeSwitcherAnimator';

import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  // _____________________________________________________________________ State

  const { theme, setTheme } = useUIStateStore();
  const animationControls = useAnimationControls();
  const animatorRef = useRef<ThemeSwitcherAnimator | null>(null);
  const controlsRef = useRef(animationControls);

  // _____________________________________________________________________ Theme

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // _________________________________________________________________ Animation

  // Keep the ref updated
  useEffect(() => {
    controlsRef.current = animationControls;
  }, [animationControls]);

  useEffect(() => {
    // Pass the controls to the animator instance
    animatorRef.current = new ThemeSwitcherAnimator(controlsRef.current);

    return () => {
      animatorRef.current?.destroy();
      animatorRef.current = null;
    };
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div
      className={styles['theme-switcher']}
      onMouseEnter={() => animatorRef.current?.onRollOver()}
      onMouseLeave={() => animatorRef.current?.onRollOut()}
    >
      {/* Invisible Button Layer - Top layer for interaction */}
      <button
        className={styles['invisible-button']}
        onClick={handleThemeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
      />

      {/* Icon Layer 1 - Sun (Light Theme) */}
      <div
        className={`${styles['icon-layer']} ${styles['sun-icon']} ${
          theme === 'light' ? styles['active'] : ''
        }`}
      >
        <Sun />
      </div>

      {/* Icon Layer 2 - Moon (Dark Theme) */}
      <div
        className={`${styles['icon-layer']} ${styles['moon-icon']} ${
          theme === 'dark' ? styles['active'] : ''
        }`}
      >
        <Moon />
      </div>

      {/* Background Layer - Now a motion component */}
      <motion.div
        className={styles['background-layer']}
        animate={animationControls}
        initial={{ scale: 1 }}
      />
    </div>
  );
}
