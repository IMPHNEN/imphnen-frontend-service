import { ArrowDownOutlined } from '@ant-design/icons';
import { FC, ReactElement } from 'react';

export const LandingPage: FC = (): ReactElement => {
  return (
    <section className="my-12">
      <div className="order-1 lg:order-2 flex flex-col items-center gap-7 text-primary-500">
        <img src="/logos/logo.svg" alt="IMPHNEN Logo" width={170} />

        <div className="font-semibold text-center">
          <div className="text-p1 md:text-h2 text-center">
            <p>New Merchandise</p>
            <p>Coming UP</p>
          </div>
          <div className="text-base md:text-p2 mt-3">
            Periode Gacha: 1 - 31 Maret 2025
          </div>
        </div>

        <div className="text-center font-semibold text-p3">
          <p>Let's Go Checkout Our Merch &</p>
          <p>Gacha Your Prize Here</p>
        </div>
        <div className="flex gap-3 px-3 py-2 bg-primary-100 border border-primary-500 border-dashed rounded animate-bounce">
          <ArrowDownOutlined />
          <span className="font-label2">Scroll For Gacha</span>
          <ArrowDownOutlined />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <div className="relative h-[150px]">
          <img
            src="/merch/1.png"
            alt="Merch 1"
            className="relative top-[3px] left-[4px] z-10 w-[165px]"
          />
          <img
            className="absolute top-0 left-0 min-w-[174px] z-0"
            src="/merch/Vector-1.svg"
            alt=""
          />
        </div>
        <div className="px-3 py-1 text-primary-500 font-semibold text-base bg-white shadow-md rounded">
          Official Merch IMPHNEN
        </div>
        <div className="mt-2 text-primary-500 font-bold text-p2">~ 175k ~</div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <div className="relative h-[130px]">
          <img
            src="/merch/2.png"
            alt="Merch 2"
            className="relative top-[5px] left-[5px] z-10 w-[165px]"
          />
          <img
            className="absolute top-0 left-0 z-0 min-w-[174px]"
            src="/merch/Vector-2.svg"
            alt=""
          />
        </div>
        <div className="px-3 py-1 text-primary-500 font-semibold text-base bg-white shadow-md rounded">
          IMPHNEN Mini Merch
        </div>
        <div className="mt-2 text-primary-500 font-bold text-p2">~ 90k ~</div>
      </div>
    </section>
  );
};
