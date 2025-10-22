import { motion } from 'framer-motion';
import { useState } from 'react';

import { DURATION_QUICK } from '../../../../motion/duration';
import { EASE_DEFAULT } from '../../../../motion/ease';

import styles from './ButtonText.module.css';

type ButtonTextProps = {
  text: string;
  url: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export default function ButtonText({
  text,
  url,
  target = '_blank',
}: ButtonTextProps) {
  // _____________________________________________________________________ State

  const [hovered, setHovered] = useState(false);

  // ____________________________________________________________________ Render

  return (
    <a
      href={url}
      className={styles['button-text']}
      target={target}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
      <motion.span
        className={styles['underline']}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{
          scaleX: hovered ? 1 : 0,
          transformOrigin: hovered ? 'left' : 'right',
        }}
        transition={{
          type: 'tween',
          duration: DURATION_QUICK,
          ease: EASE_DEFAULT,
        }}
      />
    </a>
  );
}
