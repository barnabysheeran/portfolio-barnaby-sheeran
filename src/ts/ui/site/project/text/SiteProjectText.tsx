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
      {/* Title - Optional */}
      {projectData.title && (
        <div className={styles['row-title']}>
          <h3 className={styles['title']}>{projectData.title}</h3>
        </div>
      )}

      {/* Details Row */}
      <div className={styles['details-row']}>
        {/* Company - Optional */}
        {projectData.company && (
          <h4 className={styles['company']}>{projectData.company}</h4>
        )}

        {/* Description - Optional */}
        {Array.isArray(projectData.description) &&
          projectData.description.length > 0 &&
          projectData.description.map((desc, idx) => (
            <p className={styles['description']} key={idx}>
              {desc}
            </p>
          ))}

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
    </div>
  );
}
