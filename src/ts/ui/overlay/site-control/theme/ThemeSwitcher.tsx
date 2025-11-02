import { useRef } from 'react';

import { Sun, Moon } from 'lucide-react';

import { useUIStateStore } from '../../../../store/uiState/uiStateStore';
import { THEMES } from '../../../../types';

import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  // _____________________________________________________________________ State

  const { theme, setTheme } = useUIStateStore();

  const refMoon = useRef<HTMLDivElement>(null);
  const refSun = useRef<HTMLDivElement>(null);

  // _____________________________________________________________________ Theme

  const handleThemeToggle = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  const handlePointerEnter = () => {
    refSun.current?.classList.add(styles['hover']);
    refMoon.current?.classList.add(styles['hover']);
  };

  const handlePointerLeave = () => {
    refSun.current?.classList.remove(styles['hover']);
    refMoon.current?.classList.remove(styles['hover']);
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['theme-switcher']}>
      {/* Invisible Button - Interaction */}
      <button
        className={styles['invisible-button']}
        onClick={handleThemeToggle}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        aria-label={`Switch to ${theme === THEMES.LIGHT ? 'Dark' : 'Light'} theme`}
      />

      {/* Sun */}
      <div className={styles['icon']}>
        <div
          ref={refSun}
          className={` ${styles['sun-icon']} ${
            theme === THEMES.DARK ? styles['active'] : ''
          }`}
        >
          <Sun />
        </div>
      </div>

      {/* Moon */}
      <div className={styles['icon']}>
        <div
          ref={refMoon}
          className={` ${styles['moon-icon']} ${
            theme === THEMES.LIGHT ? styles['active'] : ''
          }`}
        >
          <Moon />
        </div>
      </div>

      {/* Background Blur */}
      <div className={styles['background-blur']}></div>
    </div>
  );
}
