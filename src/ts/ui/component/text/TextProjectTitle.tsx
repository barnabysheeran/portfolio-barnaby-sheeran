import { motion } from 'framer-motion';

import { DURATION_VERY_QUICK } from '../../../motion/duration';

import styles from './TextProjectTitle.module.css';

interface TextProjectTitleProps {
  text: string;
}

export default function TextProjectTitle({ text }: TextProjectTitleProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: DURATION_VERY_QUICK,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['text-project-title']}>
      {/* Static Secondary Text */}
      <div
        className={`${styles['text-block']} ${styles['secondary']} font-body-heading`}
      >
        {text}
      </div>

      {/* Animated Primary Text */}
      <motion.div
        className={`${styles['text-block']} ${styles['primary']} font-body-heading`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {text.split('').map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
