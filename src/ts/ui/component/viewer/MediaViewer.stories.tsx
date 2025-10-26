import MediaViewer from './MediaViewer';
import type { MediaItemData } from '../../../types/project';

const sampleMedia: MediaItemData[] = [
  { type: 'image', url: '/public/asset/project/dev/1.avif' },
  { type: 'image', url: '/public/asset/project/dev/2.avif' },
  { type: 'image', url: '/public/asset/project/dev/3.avif' },
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
