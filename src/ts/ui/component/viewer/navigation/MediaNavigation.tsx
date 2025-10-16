import type { MediaItem } from '../../../../types';

import styles from './MediaNavigation.module.css';

interface MediaNavigationProps {
  media: MediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function MediaNavigation({
  media,
  currentIndex,
  onNavigate,
}: MediaNavigationProps) {
  // ____________________________________________________________________ Render

  if (media.length <= 1) {
    return null;
  }

  return (
    <nav
      className={styles['media-navigation']}
      role="tablist"
      aria-label="Media navigation"
    >
      {media.map((item, index) => (
        <button
          key={index}
          className={`${styles['navigation-dot']} ${
            index === currentIndex ? styles['navigation-dot--active'] : ''
          }`}
          onClick={() => onNavigate(index)}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`View ${item.type} ${index + 1} of ${media.length}`}
          tabIndex={index === currentIndex ? 0 : -1}
        />
      ))}
    </nav>
  );
}
