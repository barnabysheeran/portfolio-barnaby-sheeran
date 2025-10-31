import { useState } from 'react';

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
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  // ____________________________________________________________________ Render

  return (
    <>
      <div
        className={styles['media-viewer']}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Media Items */}
        {media.map((item, idx) => (
          <MediaItemImage
            key={idx}
            media={item}
            isActive={idx === currentIndex}
            onClick={handleNavigateNext}
          />
        ))}
      </div>

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
