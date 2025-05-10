import { Media } from '../payload-types';

export function formatCMSImageDataToMedia(
  image: number | Media | null | undefined
): Media | null {
  if (image && typeof image === 'object' && 'url' in image) {
    return image as Media;
  }
  return null;
}
