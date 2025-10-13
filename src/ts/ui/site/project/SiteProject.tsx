import { type ProjectData } from '../../../type/project';

import styles from './SiteProject.module.css';

interface SiteProjectProps {
  project: ProjectData;
}

export default function SiteProject({ project }: SiteProjectProps) {
  return (
    <div className={styles['site-project']}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
