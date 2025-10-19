import UIOverlaySurface from './surface/UIOverlaySurface';
import UISiteControl from './site-control/UISiteControl';

import styles from './UIOverlay.module.css';

export default function UIOverlay() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['ui-overlay']}>
      <UIOverlaySurface />
      <UISiteControl />
    </div>
  );
}
