import { useState } from 'react';

import type { MediaItem } from '../../../types';

import styles from './MediaViewer.module.css';

interface MediaViewerProps {
  media: MediaItem[];
}

export default function MediaViewer({ media }: MediaViewerProps) {
  // _____________________________________________________________________ State

  const [currentIndex, setCurrentIndex] = useState(0);

  // _____________________________________________________________________ Media

  const currentMedia = media[currentIndex];

  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['media-viewer']} onClick={handleClick}>
      {currentMedia.type === 'image' ? (
        <img src={currentMedia.url} alt="Project media" />
      ) : (
        <video src={currentMedia.url} controls />
      )}
    </div>
  );
}
