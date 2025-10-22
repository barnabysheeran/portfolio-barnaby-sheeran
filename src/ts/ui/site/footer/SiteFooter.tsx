import ButtonText from '../../component/button/text/ButtonText';

import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <div className={styles['site-footer']}>
      <ButtonText
        text="Creative Technology"
        url="https://www.barnabysheeran.com/ct"
      />
      <ButtonText text="GitHub" url="https://github.com/barnabysheeran" />
    </div>
  );
}
