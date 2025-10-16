import { useState } from 'react';

import type { MediaItem } from '../../../types';

import MediaHolder from './holder/MediaHolder';
import MediaNavigation from './navigation/MediaNavigation';

import styles from './MediaViewer.module.css';

interface MediaViewerProps {
  media: MediaItem[];
}

export default function MediaViewer({ media }: MediaViewerProps) {
  // _____________________________________________________________________ State

  const [currentIndex, setCurrentIndex] = useState(0);

  // _____________________________________________________________________ Media

  const currentMedia = media[currentIndex];
  const hasMultipleItems = media.length > 1;

  const handleMediaClick = () => {
    if (hasMultipleItems) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }
  };

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['media-viewer']}>
      <MediaHolder
        media={currentMedia}
        index={currentIndex}
        onClick={hasMultipleItems ? handleMediaClick : undefined}
      />
      <MediaNavigation
        media={media}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
