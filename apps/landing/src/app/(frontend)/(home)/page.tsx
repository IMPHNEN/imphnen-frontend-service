import { Communities } from './_components/communites';
import { Hero } from './_components/hero';
import { Testimonials } from './_components/testimonials';

export default async function Page() {
  return (
    <>
      <Hero />
      <Communities />
      <Testimonials />
    </>
  );
}
