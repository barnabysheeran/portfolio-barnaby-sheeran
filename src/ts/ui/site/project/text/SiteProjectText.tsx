import type { ProjectData } from '../../../../types';

import styles from './SiteProjectText.module.css';

interface SiteProjectTextProps {
  projectData: ProjectData;
}

export default function SiteProjectText({ projectData }: SiteProjectTextProps) {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-project-text']}>
      <h3 className={styles['site-project-text__title']}>
        {projectData.title}
      </h3>
      <p className={styles['site-project-text__description']}>
        {projectData.description}
      </p>
    </div>
  );
}
