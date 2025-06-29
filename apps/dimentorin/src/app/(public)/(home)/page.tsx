import { FC, ReactElement } from 'react';
import { HeroSection } from './_components/hero-section';
import { WhatWeOfferSection } from './_components/what-we-offer-section';
import { TestimonialSection } from './_components/testimonial-section';

export const Components: FC = (): ReactElement => {
  return (
    <>
      <HeroSection />
      <WhatWeOfferSection />
      <TestimonialSection />
    </>
  );
};

export default Components;
