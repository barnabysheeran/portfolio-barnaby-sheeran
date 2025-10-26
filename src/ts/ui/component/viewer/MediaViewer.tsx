import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { MediaItemData } from '../../../types';

import MediaItem from './holder/MediaItem';
import MediaNavigation from './navigation/MediaNavigation';

import { DURATION_SLOW } from '../../../motion/duration';
import { EASE_DEFAULT } from '../../../motion/ease';

import styles from './MediaViewer.module.css';

interface MediaViewerProps {
  media: MediaItemData[];
}

export default function MediaViewer({ media }: MediaViewerProps) {
  // _____________________________________________________________________ State

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = useRef<number>(0);

  // _____________________________________________________________________ Media

  const hasMultipleItems = media.length > 1;

  const handleMediaClick = () => {
    if (hasMultipleItems) {
      prevIndex.current = currentIndex;
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }
  };

  const handleNavigate = (index: number) => {
    prevIndex.current = currentIndex;
    setCurrentIndex(index);
  };

  // ____________________________________________________________________ Render

  return (
    <div
      className={styles['media-viewer']}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <AnimatePresence>
        {media.map((item, idx) =>
          idx === currentIndex || idx === prevIndex.current ? (
            <motion.div
              key={idx}
              className={styles['media-item-holder']}
              initial={{ opacity: idx === currentIndex ? 0 : 1 }}
              animate={{ opacity: idx === currentIndex ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION_SLOW, ease: EASE_DEFAULT }}
            >
              <MediaItem
                media={item}
                index={idx}
                onClick={hasMultipleItems ? handleMediaClick : undefined}
              />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
      <MediaNavigation
        media={media}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
