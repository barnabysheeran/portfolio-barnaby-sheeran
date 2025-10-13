import { useEffect } from 'react';

import styles from './Application.module.css';

import Engine from './engine/Engine';

import UIBackground from './ui/background/UIBackground';
import UIContainer from './ui/UIContainer';
import UIOverlay from './ui/overlay/UIOverlay';

export default function Application() {
  // ____________________________________________________________________ Engine

  // Initialise Engine Once
  useEffect(() => {
    Engine.init();
    Engine.start();

    return () => {
      Engine.stop();
    };
  }, []);

  // ____________________________________________________________________ Layout

  return (
    <div className={styles['application']}>
      <UIBackground />
      <UIContainer />
      <UIOverlay />
    </div>
  );
}
