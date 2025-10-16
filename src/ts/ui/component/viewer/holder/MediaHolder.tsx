import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { MediaItem } from '../../../../types';
import { MediaHolderAnimator } from './MediaHolderAnimator';

import styles from './MediaHolder.module.css';

interface MediaHolderProps {
  media: MediaItem;
  index: number;
  onClick: () => void;
}

export default function MediaHolder({
  media,
  index,
  onClick,
}: MediaHolderProps) {
  // _____________________________________________________________________ State

  const [direction, setDirection] = useState(0);

  // ___________________________________________________________________ Swipe

  const swipeConfidenceThreshold =
    MediaHolderAnimator.getSwipeConfidenceThreshold();

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const swipe = MediaHolderAnimator.swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      setDirection(1);
      onClick();
    } else if (swipe > swipeConfidenceThreshold) {
      setDirection(-1);
      onClick();
    }
  };

  // ____________________________________________________________________ Render

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        key={index}
        className={styles['media-holder']}
        custom={direction}
        variants={MediaHolderAnimator.getMediaVariants()}
        initial="enter"
        animate="center"
        exit="exit"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        onClick={onClick}
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
