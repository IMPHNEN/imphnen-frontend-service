import { payload } from '../lib/payload';

export async function getGlobalsFeaturesSection() {
  return await payload.findGlobal({
    slug: 'features-section',
  });
}
