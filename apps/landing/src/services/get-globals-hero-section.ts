import { payload } from '../lib/payload';

export async function getGlobalsHeroSection() {
  return await payload.findGlobal({
    slug: 'hero-section',
  });
}
