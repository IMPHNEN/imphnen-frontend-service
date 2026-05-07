import { FC, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-[#23A1EB] hover:bg-[#1e90d6] text-white shadow-[0px_4px_12px_0px_rgba(35,161,235,0.28)]';
    case 'secondary':
      return 'bg-white hover:bg-gray-100 text-[#23A1EB] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]';
    case 'danger':
      return 'bg-red-600 hover:bg-red-500 text-white shadow-[0px_4px_12px_0px_rgba(220,38,38,0.25)]';
    default:
      return 'bg-[#23A1EB] hover:bg-[#1e90d6] text-white shadow-[0px_4px_12px_0px_rgba(35,161,235,0.28)]';
  }
};

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return 'h-8 px-3 text-sm';
    case 'md':
      return 'h-10 min-w-[100px] px-5 text-sm leading-5';
    case 'lg':
      return 'h-12 min-w-[120px] px-6 text-base';
    default:
      return 'h-10 min-w-[100px] px-5 text-sm leading-5';
  }
};

export const ModalButton: FC<ModalButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-[6px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23A1EB] disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
