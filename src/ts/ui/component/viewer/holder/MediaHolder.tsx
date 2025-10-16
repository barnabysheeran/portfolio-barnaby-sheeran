import { AnimatePresence, motion } from 'framer-motion';

import type { MediaItem } from '../../../../types';
import { MediaHolderAnimator } from './MediaHolderAnimator';

import styles from './MediaHolder.module.css';

interface MediaHolderProps {
  media: MediaItem;
  index: number;
  onClick?: () => void;
}

export default function MediaHolder({
  media,
  index,
  onClick,
}: MediaHolderProps) {
  // ____________________________________________________________________ Render

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={index}
        className={`${styles['media-holder']} ${!onClick ? styles['media-holder--disabled'] : ''}`}
        variants={MediaHolderAnimator.getMediaVariants()}
        initial="enter"
        animate="center"
        exit="exit"
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt={`Project media ${index + 1}`}
            className={styles['media-image']}
            draggable={false}
          />
        ) : (
          <video
            src={media.url}
            controls
            className={styles['media-video']}
            aria-label={`Project video ${index + 1}`}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
