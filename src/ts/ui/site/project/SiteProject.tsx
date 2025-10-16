import { motion } from 'framer-motion';

import { type ProjectData } from '../../../types/project';

import MediaViewer from '../../component/viewer/MediaViewer';
import SiteProjectText from './text/SiteProjectText';

import styles from './SiteProject.module.css';

interface SiteProjectProps {
  projectData: ProjectData;
  isReversed?: boolean;
}

export default function SiteProject({
  projectData,
  isReversed = false,
}: SiteProjectProps) {
  // ____________________________________________________________________ Render

  return (
    <motion.div
      className={`${styles['site-project']} ${isReversed ? styles['site-project--reversed'] : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <SiteProjectText projectData={projectData} />
      <MediaViewer media={projectData.media} />
    </motion.div>
  );
}
