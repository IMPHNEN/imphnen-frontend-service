import { CallToAction } from './_components/call-to-action';
import { Community } from './_components/community';
import { Features } from './_components/features';
import { Hero } from './_components/hero';
import { LearningResources } from './_components/learning-resources';
import { Testimonials } from './_components/testimonials';

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Community />
      <LearningResources />
      <Testimonials />
      <CallToAction />
    </>
  );
}
