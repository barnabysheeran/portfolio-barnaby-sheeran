import { useScrollProgress } from '../../../hook/useScrollProgress';

import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  // _____________________________________________________________________ State

  const progress = useScrollProgress();

  // ____________________________________________________________________ Render

  return <div className={styles['scroll-progress']}>{progress}</div>;
}
