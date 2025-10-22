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
  return (
    <a
      href={url}
      className={styles['button-text']}
      target={target}
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
