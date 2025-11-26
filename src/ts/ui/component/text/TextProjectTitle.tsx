import styles from './TextProjectTitle.module.css';

interface TextProjectTitleProps {
  text: string;
}

export default function TextProjectTitle({ text }: TextProjectTitleProps) {
  return (
    <>
      <div className={`${styles['text-project-title']} font-body-heading`}>
        {text}
      </div>
      <div className={`${styles['text-project-title']} font-body-heading`}>
        {text}
      </div>
    </>
  );
}
