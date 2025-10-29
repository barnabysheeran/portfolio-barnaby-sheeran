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
      {/* Company - Optional */}
      {projectData.company && (
        <h4 className={styles['company']}>{projectData.company}</h4>
      )}

      {/* Title - Optional */}
      {projectData.title && (
        <h3 className={styles['title']}>{projectData.title}</h3>
      )}

      {/* Description - Optional */}
      {projectData.description !== undefined && (
        <p className={styles['description']}>{projectData.description}</p>
      )}

      {/* Links - Optional */}
      {projectData.links && projectData.links.length > 0 && (
        <div>
          {projectData.links.map((link) => (
            <ButtonText
              key={link.url}
              text={'/ ' + link.label}
              url={link.url}
              target="_blank"
            />
          ))}
        </div>
      )}
    </div>
  );
}
