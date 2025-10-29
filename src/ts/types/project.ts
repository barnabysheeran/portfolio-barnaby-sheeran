export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES];

export interface MediaItemData {
  type: MediaType;
  url: string;
}

export interface ProjectLinkData {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  title?: string;
  company?: string;
  description?: string;
  media?: MediaItemData[];
  links?: ProjectLinkData[];
}
