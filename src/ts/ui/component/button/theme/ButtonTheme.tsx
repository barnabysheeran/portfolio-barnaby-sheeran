import styles from './ButtonTheme.module.css';

interface ButtonThemeProps {
  theme: 'light' | 'dark';
  isActive?: boolean;
  onClick: () => void;
}

export default function ButtonTheme({
  theme,
  isActive = false,
  onClick,
}: ButtonThemeProps) {
  const className = [
    styles['button-theme'],
    styles[`button-theme--${theme}`],
    isActive ? styles['button-theme--active'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${theme} theme`}
    />
  );
}
