import { getGlobalsFeaturesSection } from '../../repositories/get-globals-features-section';
import { getGlobalsHeroSection } from '../../repositories/get-globals-hero-section';
import { CallToAction } from './_components/call-to-action';
import { Community } from './_components/community';
import { Features } from './_components/features';
import Footer from './_components/footer';
import { Header } from './_components/header';
import { Hero } from './_components/hero';
import { LearningResources } from './_components/learning-resources';
import { Testimonials } from './_components/testimonials';

export const revalidate = 60 * 5; // Seconds

export default async function Page() {
  const [heroData, featuresData] = await Promise.all([
    getGlobalsHeroSection(),
    getGlobalsFeaturesSection(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero {...heroData} />
        <Features {...featuresData} />
        <Community />
        <LearningResources />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
