import { cn } from '@imphnen-frontend-service/utils';
import { Icon } from '@iconify/react';
import { FC, ReactElement, ReactNode } from 'react';
import { Button } from '../../atoms';
import { useAuthStore } from '@imphnen-frontend-service/service';

export type TBackofficeWrapperProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  classHeader?: string;
  classTitle?: string;
};

export const BackofficeWrapper: FC<TBackofficeWrapperProps> = ({
  children,
  title,
  className,
  classHeader,
  classTitle,
}): ReactElement => {
  const { session } = useAuthStore();
  const user = session?.user;

  return (
    <main
      className={cn(
        'w-full px-[48px] py-[40px] flex flex-col gap-8',
        className
      )}
    >
      <header
        className={cn(
          'bg-white py-5 px-7 rounded-md shadow flex items-center justify-between',
          classHeader
        )}
      >
        <h1
          className={cn(
            'text-[19px] text-primary-500 font-semibold',
            classTitle
          )}
        >
          {title}
        </h1>

        <div className="flex items-center gap-x-6">
          <Button type="button" variant="secondary" className="max-h-full p-3">
            <Icon icon="mdi:bell-outline" className="size-6" />
          </Button>
          <div className="flex items-center gap-x-6">
            <div className="text-neutral-600 font-medium">
              <p className="text-p3">{user?.fullname || 'Full Name'}</p>
              <p className="text-label1">Admin</p>
            </div>
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={user?.avatar || '/images/asd687hwq6nds4dfjj2983.webp'}
                alt="Profile"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <section>{children}</section>
    </main>
  );
};
