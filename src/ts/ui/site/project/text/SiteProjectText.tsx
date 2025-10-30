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
      {/* Title Row- Optional */}
      {projectData.title && (
        <div className={styles['row-title']}>
          <p className={`${styles['title']} font-body-heading`}>
            {projectData.title}
          </p>
        </div>
      )}

      {/* Details Row */}
      <div className={styles['row-details']}>
        {/* Company - Optional */}
        {projectData.company && (
          <p className={`${styles['company']} font-body-heading`}>
            {projectData.company}
          </p>
        )}

        {/* Description - Optional */}
        {Array.isArray(projectData.description) &&
          projectData.description.length > 0 && (
            <div className={styles['holder-description']}>
              {projectData.description.map((desc, idx) => (
                <p
                  className={`${styles['description']} font-body-content`}
                  key={idx}
                >
                  - {desc}
                </p>
              ))}
            </div>
          )}
      </div>

      {/* Links Row - Optional */}
      {projectData.links && projectData.links.length > 0 && (
        <div className={`${styles['row-links']} font-body-link`}>
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
