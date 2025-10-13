import { useUIStateStore } from '../../store/uiState/uiStateStore';

import ButtonTheme from '../component/button/theme/ButtonTheme';

import styles from './UIOverlay.module.css';

export default function UIOverlay() {
  const { theme, setTheme } = useUIStateStore();

  return (
    <div className={styles['ui-overlay']}>
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
