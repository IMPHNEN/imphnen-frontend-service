import { Communities } from './_components/communities';
import { CTASection } from './_components/cta-section';
import { Hero } from './_components/hero';
import { TestimonialSection } from './_components/testimonial-section';
export default function Page() {
  return (
    <>
      <Hero />
      <Communities />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
