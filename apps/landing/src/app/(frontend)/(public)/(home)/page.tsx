import { CallToAction } from './_components/call-to-action';
import { Communities } from './_components/communites';
import { Events } from './_components/events';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

export default function Page() {
  return (
    <>
      <Hero />
      <Events />
      <Communities />
      <Testimonials />
      <CallToAction />
    </>
  );
}
