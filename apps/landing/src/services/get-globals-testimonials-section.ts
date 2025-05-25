import { payload } from '../lib/payload';

export async function getGlobalsTestimonialsSection() {
  return await payload.findGlobal({
    slug: 'testimonials-section',
  });
}
