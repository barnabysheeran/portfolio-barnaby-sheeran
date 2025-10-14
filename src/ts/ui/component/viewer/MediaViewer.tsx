import { useState } from 'react';

import styles from './MediaViewer.module.css';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface MediaViewerProps {
  media: MediaItem[];
}

export default function MediaViewer({ media }: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) {
    return <div className={styles['media-viewer']}>No media available</div>;
  }

  const currentMedia = media[currentIndex];

  const handleClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

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
