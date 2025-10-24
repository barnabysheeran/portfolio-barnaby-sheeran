import MediaViewer from './MediaViewer';
import type { MediaItem } from '../../../types/project';

const sampleMedia: MediaItem[] = [
  { type: 'image', url: '/public/asset/project/battlebuilder/1.avif' },
  { type: 'image', url: '/public/asset/project/battlebuilder/2.avif' },
  { type: 'image', url: '/public/asset/project/battlebuilder/3.avif' },
];

export default {
  title: 'Viewer/MediaViewer',
  component: MediaViewer,
};

export const Default = {
  args: {
    media: sampleMedia,
  },
};
