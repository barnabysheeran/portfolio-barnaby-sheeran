import { useState } from 'react';
import { motion } from 'framer-motion';

import type { MediaItemData } from '../../../../types';

import styles from './MediaItemImage.module.css';

interface MediaItemImageProps {
  media: MediaItemData;
  isActive: boolean;
  onClick?: () => void;
}

export default function MediaItemImage({
  media,
  isActive,
  onClick,
}: MediaItemImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className={styles['media-item']}
      style={{
        opacity: isActive && loaded ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <img
        className={styles['media-image']}
        src={media.url}
        alt=""
        onLoad={() => setLoaded(true)}
        onClick={onClick}
      />
    </motion.div>
  );
}
