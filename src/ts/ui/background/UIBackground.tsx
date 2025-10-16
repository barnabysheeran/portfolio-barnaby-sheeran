import { useEffect, useRef } from 'react';

import { useUIStateStore } from '../../store/uiState/uiStateStore';
import { BackgroundController } from './BackgroundController';

import styles from './UIBackground.module.css';

export default function UIBackground() {
  // ______________________________________________________________________ Refs

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<BackgroundController | null>(null);

  // _____________________________________________________________________ Store

  const theme = useUIStateStore((state) => state.theme);

  // ________________________________________________________________ Background

  useEffect(() => {
    if (canvasRef.current) {
      controllerRef.current = new BackgroundController(canvasRef.current);
    }

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  // _____________________________________________________________________ Theme

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setTheme(theme);
    }
  }, [theme]);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['ui-background']}>
      <canvas ref={canvasRef} className={styles['ui-background-canvas']} />
    </div>
  );
}
