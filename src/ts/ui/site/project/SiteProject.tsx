import { motion } from 'framer-motion';

import { type ProjectData } from '../../../type/project';

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
      {projectData.title} - {projectData.description}
    </motion.div>
  );
}
