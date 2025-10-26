import type { ProjectData } from '../../../../types';

import styles from './SiteProjectText.module.css';
import ButtonText from '../../../component/button/text/ButtonText';

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
      {projectData.links && projectData.links.length > 0 && (
        <div>
          {projectData.links.map((link) => (
            <ButtonText
              key={link.url}
              text={link.label}
              url={link.url}
              target="_blank"
            />
          ))}
        </div>
      )}
    </div>
  );
}
