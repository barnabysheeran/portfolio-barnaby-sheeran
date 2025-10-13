import { useProjectStore } from '../store/project/projectStore';

import SiteHeader from './site/header/SiteHeader';
import SiteProject from './site/project/SiteProject';
import SiteFooter from './site/footer/SiteFooter';

import styles from './UIContainer.module.css';

export default function UIContainer() {
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className={`${styles['ui-container']}`}>
      UI Container
      <SiteHeader />
      {projects.map((project) => (
        <SiteProject key={project.id} project={project} />
      ))}
      <SiteFooter />
    </div>
  );
}
