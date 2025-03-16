import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC, ReactElement } from 'react';

export const LandingPage: FC = (): ReactElement => {
  const scrollToRoulette = () => {
    const rouletteSection = document.getElementById('roulette');
    if (rouletteSection) {
      rouletteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="landing-page"
      className="my-12 md:my-24 flex flex-col md:flex-row flex-wrap max-w-[1280px] items-center justify-center lg:mx-auto"
    >
      <div className="order-none lg:order-1 flex flex-col xl:flex-2 md:w-full lg:w-fit items-center gap-7 md:gap-13 text-primary-500 mb-10 md:mb-20">
        <img
          src="/logos/logo.svg"
          alt="IMPHNEN Logo"
          className="w-[170px] md:w-[317px]"
        />

        <div className="font-semibold text-center">
          <div className="text-p1 md:text-h2 lg:font-bold text-center">
            <p>New Merchandise</p>
            <p>Coming UP</p>
          </div>
          <div className="text-base md:text-p2 mt-3">
            Periode Gacha: 1 - 31 Maret 2025
          </div>
        </div>

        <div className="text-center font-semibold text-p3 md:text-p1">
          <p>Let's Go Checkout Our Merch &</p>
          <p>Gacha Your Prize Here</p>
        </div>
        <Button
          size="sm"
          variant="bordered"
          className="flex gap-3 px-3 md:px-5 py-2 md:py-4 bg-primary-100 border border-primary-500 border-dashed rounded md:rounded-md animate-bounce text-label2 md:text-p2"
          onClick={scrollToRoulette}
        >
          <ArrowDownOutlined />
          <span>Scroll For Gacha</span>
          <ArrowDownOutlined />
        </Button>
      </div>

      <div className="order-1 lg:order-none flex flex-col flex-1 justify-center items-center mb-8 relative">
        <div className="relative h-[150px] md:h-[230px]">
          <img
            src="/merch/1.png"
            alt="Merch 1"
            className="relative top-[3px] md:top-[6px] left-[4px] md:left-[7px] z-10 w-[165px] md:w-[266px]"
          />
          <img
            className="absolute top-0 left-0 min-w-[174px] md:min-w-[280px] z-0"
            src="/merch/Vector-1.svg"
            alt=""
          />
        </div>
        <div className="px-3 py-1 text-primary-500 font-semibold text-base md:text-p2 bg-white shadow-md rounded">
          Official Merch IMPHNEN
        </div>
        <div className="mt-2 text-primary-500 font-bold text-p2 md:text-h3">
          ~ 175k ~
        </div>
        <img
          className="absolute bottom-12 -right-10"
          src="/landing-arrow-1.svg"
          alt=""
        />
      </div>
      <div className="order-2 flex flex-col flex-1 justify-center items-center mb-8 relative">
        <div className="relative h-[130px] md:h-[230px]">
          <img
            src="/merch/2.png"
            alt="Merch 2"
            className="relative top-[5px] md:top-[8px] left-0 md:left-[5px] z-10 w-[165px] md:w-[277px]"
          />
          <img
            className="absolute top-0 -left-[5px] md:-left-[8px] z-0 min-w-[174px] md:min-w-[302px]"
            src="/merch/Vector-2.svg"
            alt=""
          />
        </div>
        <div className="px-3 py-1 text-primary-500 font-semibold text-base md:text-p2 bg-white shadow-md rounded">
          IMPHNEN Mini Merch
        </div>
        <div className="mt-2 text-primary-500 font-bold text-p2 md:text-h3">
          ~ 90k ~
        </div>
        <img
          className="absolute -bottom-10 -left-12"
          src="/landing-arrow-2.svg"
          alt=""
        />
      </div>
    </section>
  );
};
