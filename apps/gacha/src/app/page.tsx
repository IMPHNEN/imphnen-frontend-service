import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { cn } from '@imphnen-frontend-service/utils';
import { FC, Fragment, ReactElement, useEffect } from 'react';

interface GachaItemProps {
  src: string;
  label: string;
  className?: string;
}

export const Components: FC = (): ReactElement => {
  const scrollToRoulette = () => {
    const rouletteSection = document.getElementById('roulette');
    if (rouletteSection) {
      rouletteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const gachaPlaySection = document.getElementById('gacha-play');
    if (gachaPlaySection) {
      let currentIndex = 0;
      const items = gachaPlaySection.children;
      const totalItems = items.length;

      const scrollItems = () => {
        if (currentIndex >= totalItems) {
          currentIndex = 0;
        }
        items[currentIndex].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
        });
        currentIndex++;
      };

      const intervalId = setInterval(scrollItems, 2800);

      return () => clearInterval(intervalId);
    }
  }, []);

  const GachaItem: FC<GachaItemProps> = ({
    src,
    label,
    className,
  }): ReactElement => {
    return (
      <div className="snap-center flex-auto justify-center items-center flex flex-col min-w-full">
        <div className="max-h-[180px] md:max-h-[270px] md:max-w-[500px] mb-2 md:mb-5 flex flex-1 justify-center items-center">
          <img
            src={src}
            alt=""
            className={cn('h-[150px] md:h-[255px] object-contain', className)}
          />
        </div>
        <p className="font-semibold text-center md:text-p2">{label}</p>
      </div>
    );
  };

  return (
    <Fragment>
      {/* Landing Page */}
      <section
        id="landing-page"
        className="my-12 md:my-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 justify-items-center max-w-[1280px] items-center justify-center mx-[32px] md:mx-[60px] lg:mx-[80px] xl:mx-auto"
      >
        <div className="order-none lg:order-1 flex flex-col col-span-4 md:col-span-8 lg:col-span-4 md:w-full lg:w-fit items-center gap-7 md:gap-13 text-primary-500 mb-10 md:mb-20">
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

        <div className="order-1 lg:order-none flex flex-col col-span-4 justify-center items-center mb-8 relative">
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
            <img
              className="absolute hidden lg:block -bottom-[50px] -right-[50px]"
              src="/landing-arrow-1.svg"
              alt=""
            />
          </div>
          <div className="px-3 py-1 text-primary-500 font-semibold text-base md:text-p2 bg-white shadow-md rounded">
            Official Merch IMPHNEN
          </div>
          <div className="mt-2 text-primary-500 font-bold text-p2 md:text-h3">
            ~ 175k ~
          </div>
        </div>
        <div className="order-2 flex flex-col col-span-4 justify-center items-center mb-8 relative">
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
            <img
              className="absolute hidden lg:block -bottom-[100px] -left-[55px]"
              src="/landing-arrow-2.svg"
              alt=""
            />
          </div>
          <div className="px-3 py-1 text-primary-500 font-semibold text-base md:text-p2 bg-white shadow-md rounded">
            IMPHNEN Mini Merch
          </div>
          <div className="mt-2 text-primary-500 font-bold text-p2 md:text-h3">
            ~ 90k ~
          </div>
        </div>
      </section>
      {/* Roulette Page */}
      <section
        id="roulette"
        className="mt-20 pb-50 lg:py-90 mx-[32px] md:mx-[60px] lg:mx-[80px] xl:mx-auto lg:max-w-[1280px] grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 justify-items-center gap-y-16 md:gap-y-28"
      >
        <div className="col-span-4 md:col-span-8 lg:col-span-6 text-primary-500 bg-white rounded-lg md:rounded-xl p-5 md:py-9 md:px-13 shadow md:max-w-[430px]">
          <header className="mb-4">
            <h3 className="font-semibold text-p3 md:text-h2">Gacha Roulette</h3>
          </header>
          <h4 className="font-semibold my-2 text-base md:text-p1">
            How to participate
          </h4>
          <p className="text-base md:text-p2">
            Kamu harus melakukan pembelian merch batch 2 di shopee IMPHNEN
          </p>
          <h4 className="font-semibold my-2 text-base md:text-p1">
            How to gacha
          </h4>
          <ol className="text-base md:text-p2 list-decimal list-outside ml-4 md:ml-6">
            <li>First, press the "Spin Now" button</li>
            <li>
              If the merch does not match you can reroll by paying IDR5,000
            </li>
            <li>If it is appropriate you can submit</li>
            <li>Then fill in the data for your merch delivery process</li>
          </ol>
        </div>

        <div
          id="roulette-spin"
          className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-4 md:gap-8 overflow-x-hidden"
        >
          <div className="bg-white text-primary-500 font-medium text-p3 md:text-h3 shadow py-2 px-4 md:py-4 md:px-8 max-w-fit rounded-md md:rounded-lg">
            Here Take Your Prize
          </div>
          <section
            id="gacha-play"
            className="flex flex-nowrap overflow-auto w-full gap-x-8 snap-x snap-mandatory"
          >
            <GachaItem
              src="/gacha/certificate.png"
              label="Sertifikat + Laminating"
            />
            <GachaItem
              src="/gacha/lanyard-id-card.png"
              label="Lanyard + ID Card"
            />
            <GachaItem src="/gacha/pin.png" label="Pin" />
            <GachaItem src="/gacha/sticker.png" label="Sticker Isi 3" />
            <GachaItem src="/gacha/sticker.png" label="Sticker Isi 5" />
            <GachaItem
              src="/gacha/gelang-karet.png"
              label="Gelang Karet"
              className="h-[86px] md:h-[160px]"
            />
          </section>
          <Button variant="secondary" size="md">
            Spin Now
          </Button>
        </div>
      </section>
    </Fragment>
  );
};

export default Components;
