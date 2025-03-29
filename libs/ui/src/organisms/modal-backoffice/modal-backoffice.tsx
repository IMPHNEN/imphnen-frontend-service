import { ReactElement, ReactNode } from 'react';

interface ModalBackofficeProps {
  children: ReactNode;
  className?: string;
}

export const ModalBackoffice = ({
  children,
  className,
  ...rest
}: ModalBackofficeProps): ReactElement => {
  return (
    <div
      className={`w-[400px] bg-primary-50 rounded-lg p-[40px] gap-[32px] ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ModalBackoffice;
