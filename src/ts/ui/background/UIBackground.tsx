import { useEffect, useRef } from 'react';

import { BackgroundController } from './BackgroundController';

import styles from './UIBackground.module.css';

export default function UIBackground() {
  // ______________________________________________________________________ Refs

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<BackgroundController | null>(null);

  // ________________________________________________________________ Background

  useEffect(() => {
    if (canvasRef.current) {
      controllerRef.current = new BackgroundController(canvasRef.current);
    }

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['ui-background']}>
      <canvas ref={canvasRef} className={styles['ui-background-canvas']} />
    </div>
  );
}
