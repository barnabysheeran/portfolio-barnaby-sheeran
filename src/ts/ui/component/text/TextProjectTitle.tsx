import styles from './TextProjectTitle.module.css';

interface TextProjectTitleProps {
  text: string;
}

export default function TextProjectTitle({ text }: TextProjectTitleProps) {
  // ____________________________________________________________________ Render

  return (
    <>
      <div className={`${styles['text-project-title']} font-body-heading`}>
        {text}
      </div>

      {/* TODO: Duplicate for styling purposes */}
      {/* <div className={`${styles['text-project-title']} font-body-heading`}>
        {text}
      </div> */}
    </>
  );
}
