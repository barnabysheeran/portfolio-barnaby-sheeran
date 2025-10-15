export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  media: MediaItem[];
}
