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

  const isPanning = useRef(false);

  // ________________________________________________________________ Navigation

  const handleNavigate = (index: number) => setCurrentIndex(index);

  const handleNavigateNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const handleNavigatePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  // ________________________________________________________________ Pan Events

  const handlePanStart = () => {
    // Panning
    isPanning.current = true;
  };

  const handlePanEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    // Not Panning
    isPanning.current = false;

    // TODO Hard-Coded Pan Theshold
    const threshold = 50;

    // Swiped left or Right beyond Threshold ?
    if (info.offset.x < -threshold) {
      // Swiped Next
      handleNavigateNext();

      return;
    } else if (info.offset.x > threshold) {
      // Swiped Previous
      handleNavigatePrev();

      return;
    }

    // Treat as Click if not Swiped
    handleNavigateNext();
  };

  // ______________________________________________________________ Mouse Events

  const handleMouseDown = () => {
    // Not Panning
    isPanning.current = false;
  };

  // Mouse Up is triggered before handlePanEnd,
  const handleMouseUp = () => {
    // Click if not Panning
    if (isPanning.current === false) {
      // Reset Panning State
      handleNavigateNext();
    }
  };

  // ____________________________________________________________________ Render

  return (
    <>
      <motion.div
        className={styles['media-viewer']}
        style={{ position: 'relative', overflow: 'hidden' }}
        onPanStart={handlePanStart}
        onPanEnd={handlePanEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
