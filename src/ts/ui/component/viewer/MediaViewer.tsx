import { useState, useRef } from 'react';

import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

import type { MediaItemData } from '../../../types';

import MediaItemImage from './holder/MediaItemImage';
import MediaNavigation from './navigation/MediaNavigation';

import styles from './MediaViewer.module.css';

interface MediaViewerProps {
  media: MediaItemData[];
}

export default function MediaViewer({ media }: MediaViewerProps) {
  // _____________________________________________________________________ State

  const [currentIndex, setCurrentIndex] = useState(0);

  // ________________________________________________________________ Navigation

  const handleNavigate = (index: number) => setCurrentIndex(index);

  const handleNavigateNext = () => {
    console.log('handleNavigateNext');
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const handleNavigatePrev = () => {
    console.log('handleNavigatePrev');
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  // _____________________________________________________________ Swipe Support

  const handlePanEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    console.log('handlePanEnd', info.offset.x);

    const threshold = 50;

    if (info.offset.x < -threshold) {
      handleNavigatePrev();
    } else if (info.offset.x > threshold) {
      handleNavigateNext();
    }
  };

  const handleMouseDown = () => {
    if (swipeRef.current) {
      swipeRef.current = false;
      return;
    }

    handleNavigateNext();
  };

  // ____________________________________________________________________ Render

  return (
    <>
      <motion.div
        className={styles['media-viewer']}
        style={{ position: 'relative', overflow: 'hidden' }}
        onPanEnd={handlePanEnd}
      >
        {/* Media Items */}
        {media.map((item, idx) => (
          <MediaItemImage
            key={idx}
            media={item}
            isActive={idx === currentIndex}
          />
        ))}
      </motion.div>
      {/* Navigation */}
      {media.length > 1 && (
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
