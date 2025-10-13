import { useEffect, useRef } from 'react';
import { BackgroundController } from './BackgroundController';
import styles from './UIBackground.module.css';

export default function UIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<BackgroundController | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      controllerRef.current = new BackgroundController(canvasRef.current);
    }

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  return (
    <div className={styles['ui-background']}>
      <canvas ref={canvasRef} className={styles['background-canvas']} />
    </div>
  );
}
