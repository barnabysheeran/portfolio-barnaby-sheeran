import ScrollProgress from './scroll/ScrollProgress';
import ThemeSwitcher from './theme/ThemeSwitcher';

import styles from './UISiteControl.module.css';

export default function UISiteControl() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['ui-site-control']}>
      <ScrollProgress />
      <ThemeSwitcher />
    </div>
  );
}
