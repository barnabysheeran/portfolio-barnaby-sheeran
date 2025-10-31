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
  const [loaded, setLoaded] = useState<{ [idx: number]: boolean }>({});

  // _____________________________________________________________________ Media

  const hasMultipleItems = media.length > 1;

  const handleMediaLoaded = (idx: number) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }));
  };

  // ________________________________________________________________ Navigation

  const handleNavigate = (index: number) => {
    prevIndex.current = currentIndex;

    setCurrentIndex(index);
  };

  const handleNavigateNext = () => {
    if (hasMultipleItems) {
      // Store Previous Index
      prevIndex.current = currentIndex;

      // Calculate Next Index
      let nextIndex = currentIndex + 1;
      if (nextIndex >= media.length) nextIndex = 0;

      setCurrentIndex(nextIndex);
    }
  };

  // ___________________________________________________________ Animation Props

  const getMotionProps = (idx: number) => ({
    className: styles['media-item-holder'],
    initial: { opacity: 0 },
    animate: { opacity: loaded[idx] ? 1 : 0 },
    exit: { opacity: 0 },
    transition: { duration: DURATION_SLOW, ease: EASE_DEFAULT },
  });

  // ____________________________________________________________________ Render

  return (
    <>
      <div
        className={styles['media-viewer']}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <AnimatePresence>
          {currentIndex === prevIndex.current ? (
            <motion.div key={currentIndex} {...getMotionProps(currentIndex)}>
              <MediaItem
                media={media[currentIndex]}
                index={currentIndex}
                onClick={hasMultipleItems ? handleNavigateNext : undefined}
                onMediaLoaded={() => handleMediaLoaded(currentIndex)}
              />
            </motion.div>
          ) : (
            [prevIndex.current, currentIndex].map((idx) => (
              <motion.div key={idx} {...getMotionProps(idx)}>
                <MediaItem
                  media={media[idx]}
                  index={idx}
                  onClick={hasMultipleItems ? handleNavigateNext : undefined}
                  onMediaLoaded={() => handleMediaLoaded(idx)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      {media.length > 0 && (
        <MediaNavigation
          media={media}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
          onNavigateNext={handleNavigateNext}
        />
      )}
    </>
  );
}
