import { Sun, Moon } from 'lucide-react';

import { useUIStateStore } from '../../../../store/uiState/uiStateStore';
import { THEMES } from '../../../../types';

import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  // _____________________________________________________________________ State

  const { theme, setTheme } = useUIStateStore();

  // _____________________________________________________________________ Theme

  const handleThemeToggle = () => {
    setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['theme-switcher']}>
      {/* Invisible Button - Interaction */}
      <button
        className={styles['invisible-button']}
        onClick={handleThemeToggle}
        aria-label={`Switch to ${theme === THEMES.LIGHT ? 'Dark' : 'Light'} theme`}
      />

      {/* Sun */}
      <div
        className={`${styles['icon']} ${styles['sun-icon']} ${
          theme === THEMES.DARK ? styles['active'] : ''
        }`}
      >
        <Sun />
      </div>

      {/* Moon */}
      <div
        className={`${styles['icon']} ${styles['moon-icon']} ${
          theme === THEMES.LIGHT ? styles['active'] : ''
        }`}
      >
        <Moon />
      </div>

      {/* Background Blur */}
      <div className={styles['background-blur']}></div>
    </div>
  );
}
