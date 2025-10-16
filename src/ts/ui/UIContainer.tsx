import { useProjectStore } from '../store/project/projectStore';

import SiteHeader from './site/header/SiteHeader';
import SiteProject from './site/project/SiteProject';
import SiteFooter from './site/footer/SiteFooter';

import styles from './UIContainer.module.css';

export default function UIContainer() {
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className={`${styles['ui-container']}`}>
      <SiteHeader />
      {projects.map((project, index) => (
        <SiteProject
          key={project.id}
          projectData={project}
          isReversed={index % 2 === 1}
        />
      ))}
      <SiteFooter />
    </div>
  );
}
