import ScrollProgress from './scroll/ScrollProgress';
import ThemeSwitcher from './theme/ThemeSwitcher';

import styles from './UIOverlay.module.css';

export default function UIOverlay() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['ui-overlay']}>
      <ScrollProgress />
      <ThemeSwitcher />
    </div>
  );
}
