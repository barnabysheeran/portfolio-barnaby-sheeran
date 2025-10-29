import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  return (
    <div className={styles['site-header']}>
      <div className={`${styles['title']} font-header-title`}>
        Barnaby Sheeran
      </div>
    </div>
  );
}
