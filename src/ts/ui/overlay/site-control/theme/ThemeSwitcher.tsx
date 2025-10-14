import { useUIStateStore } from '../../../../store/uiState/uiStateStore';

import ButtonTheme from '../../../component/button/theme/ButtonTheme';

import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  // _____________________________________________________________________ State

  const { theme, setTheme } = useUIStateStore();

  // ____________________________________________________________________ Render

  return (
    <div className={styles['theme-switcher']}>
      <ButtonTheme
        theme="light"
        isActive={theme === 'light'}
        onClick={() => setTheme('light')}
      />
      <ButtonTheme
        theme="dark"
        isActive={theme === 'dark'}
        onClick={() => setTheme('dark')}
      />
    </div>
  );
}
