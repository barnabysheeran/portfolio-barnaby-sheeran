import type { MediaItemData } from '../../../../types';

import styles from './MediaItem.module.css';

interface MediaItemProps {
  media: MediaItemData;
  index: number;
  onClick?: () => void;
  onMediaLoaded?: () => void;
}

export default function MediaItem({
  media,
  index,
  onClick,
  onMediaLoaded,
}: MediaItemProps) {
  // ____________________________________________________________________ Render

  return (
    <div
      className={`${styles['media-item']} ${!onClick ? styles['media-item--disabled'] : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {media.type === 'image' ? (
        <img
          src={media.url}
          alt={`Project media ${index + 1}`}
          className={styles['media-image']}
          draggable={false}
          onLoad={onMediaLoaded}
        />
      ) : (
        <video
          src={media.url}
          controls
          className={styles['media-video']}
          aria-label={`Project video ${index + 1}`}
          onLoadedData={onMediaLoaded}
        />
      )}
    </div>
  );
}
