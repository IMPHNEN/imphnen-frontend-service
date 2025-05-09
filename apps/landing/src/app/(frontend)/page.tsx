import { getGlobalsCommunitiesSection } from '../../services/get-globals-communitues-section';
import { getGlobalsFeaturesSection } from '../../services/get-globals-features-section';
import { getGlobalsHeroSection } from '../../services/get-globals-hero-section';
import { CallToAction } from './_components/call-to-action';
import { Community } from './_components/community';
import { Features } from './_components/features';
import Footer from './_components/footer';
import { Header } from './_components/header';
import { Hero } from './_components/hero';
import { LearningResources } from './_components/learning-resources';
import { Testimonials } from './_components/testimonials';

export const revalidate = 10; // Seconds

export default async function Page() {
  const [heroData, featuresData, communitiesData] = await Promise.all([
    getGlobalsHeroSection(),
    getGlobalsFeaturesSection(),
    getGlobalsCommunitiesSection(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero {...heroData} />
        <Features {...featuresData} />
        <Community {...communitiesData} />
        <LearningResources />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
