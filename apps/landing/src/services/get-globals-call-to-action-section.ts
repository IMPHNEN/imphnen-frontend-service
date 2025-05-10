import { payload } from '../lib/payload';

export async function getGlobalsCallToActionSection() {
  return await payload.findGlobal({
    slug: 'call-to-action-section',
  });
}
