import { motion } from 'framer-motion';
import { useState } from 'react';
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
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </a>
  );
}
