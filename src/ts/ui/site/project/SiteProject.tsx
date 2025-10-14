import { motion } from 'framer-motion';

import { type ProjectData } from '../../../type/project';
import MediaViewer from '../../component/viewer/MediaViewer';

import styles from './SiteProject.module.css';

interface SiteProjectProps {
  projectData: ProjectData;
}

export default function SiteProject({ projectData }: SiteProjectProps) {
  return (
    <motion.div
      className={styles['site-project']}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <h3>{projectData.title}</h3>
      <p>{projectData.description}</p>
      <MediaViewer media={projectData.media} />
    </motion.div>
  );
}
