import { getGlobalsCallToActionSection } from '../../services/get-globals-call-to-action-section';
import { getGlobalsCommunitiesSection } from '../../services/get-globals-communitues-section';
import { getGlobalsFeaturesSection } from '../../services/get-globals-features-section';
import { getGlobalsHeroSection } from '../../services/get-globals-hero-section';
import { getGlobalsLearningResourcesSection } from '../../services/get-globals-learning-resources-section';
import { getGlobalsTestimonialsSection } from '../../services/get-globals-testimonials-section';
import { CallToAction } from './_components/call-to-action';
import { Community } from './_components/community';
import { Features } from './_components/features';
import { Hero } from './_components/hero';
import { LearningResources } from './_components/learning-resources';
import { Testimonials } from './_components/testimonials';

export const revalidate = 10; // Seconds

export default async function Page() {
  const [
    heroData,
    featuresData,
    communitiesData,
    learningResourcesData,
    testimonialsData,
    callToActionData,
  ] = await Promise.all([
    getGlobalsHeroSection(),
    getGlobalsFeaturesSection(),
    getGlobalsCommunitiesSection(),
    getGlobalsLearningResourcesSection(),
    getGlobalsTestimonialsSection(),
    getGlobalsCallToActionSection(),
  ]);

  return (
    <>
      <Hero {...heroData} />
      <Features {...featuresData} />
      <Community {...communitiesData} />
      <LearningResources {...learningResourcesData} />
      <Testimonials {...testimonialsData} />
      <CallToAction {...callToActionData} />
    </>
  );
}
