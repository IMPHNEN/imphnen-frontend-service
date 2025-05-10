import { payload } from '../lib/payload';

export async function getGlobalsLearningResourcesSection() {
  return await payload.findGlobal({
    slug: 'learning-resources-section',
  });
}
