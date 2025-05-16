import { getGlobalsCallToActionSection } from '../../../services/get-globals-call-to-action-section';
import { getGlobalsCommunitiesSection } from '../../../services/get-globals-communitues-section';
import { getGlobalsHeroSection } from '../../../services/get-globals-hero-section';
import { getGlobalsTestimonialsSection } from '../../../services/get-globals-testimonials-section';
import { CallToAction } from './_components/call-to-action';
import { Community } from './_components/community';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

export const revalidate = 10; // Seconds

export default async function Page() {
  const [heroData, communitiesData, testimonialsData, callToActionData] =
    await Promise.all([
      getGlobalsHeroSection(),
      getGlobalsCommunitiesSection(),
      getGlobalsTestimonialsSection(),
      getGlobalsCallToActionSection(),
    ]);

  return (
    <>
      <Hero {...heroData} />
      <Community {...communitiesData} />
      <Testimonials {...testimonialsData} />
      <CallToAction {...callToActionData} />
    </>
  );
}
