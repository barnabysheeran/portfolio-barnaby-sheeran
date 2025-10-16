import { motion } from 'framer-motion';

import { fadeQuickVariants } from '../../../motion/fade';

import ScrollProgress from './scroll/ScrollProgress';
import ThemeSwitcher from './theme/ThemeSwitcher';

import styles from './UISiteControl.module.css';

export default function UISiteControl() {
  // ____________________________________________________________________ Render

  return (
    <motion.div
      className={styles['ui-site-control']}
      initial="hidden"
      animate="visible"
      variants={fadeQuickVariants}
    >
      <ScrollProgress />
      <ThemeSwitcher />
    </motion.div>
  );
}
