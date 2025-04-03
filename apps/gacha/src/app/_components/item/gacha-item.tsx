import { cn } from '@imphnen-frontend-service/utils';
import { FC, ReactElement } from 'react';

type TGachaItem = {
  src: string;
  label: string;
  className?: string;
};

export const GachaItem: FC<TGachaItem> = ({
  src,
  label,
  className,
}): ReactElement => {
  return (
    <div className="snap-center flex-auto justify-center items-center flex flex-col min-w-full overflow-hidden">
      <div className="max-h-[180px] md:max-h-[270px] md:max-w-[500px] mb-2 md:mb-5 flex flex-1 justify-center items-center">
        <img
          src={src}
          alt="Banner"
          width={255}
          height={255}
          className={cn('h-[150px] md:h-[255px] object-contain', className)}
        />
      </div>
      <p className="font-semibold text-center md:text-p2">{label}</p>
    </div>
  );
};
