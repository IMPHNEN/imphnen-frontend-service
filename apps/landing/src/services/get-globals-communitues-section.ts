import { payload } from '../lib/payload';

export async function getGlobalsCommunitiesSection() {
  return await payload.findGlobal({
    slug: 'communities-section',
  });
}
