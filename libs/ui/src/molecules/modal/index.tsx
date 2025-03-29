import { CloseOutlined } from '@ant-design/icons';
import { cn } from '@imphnen-frontend-service/utils';
import React, { useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeButtonClassName?: string;
  disableEscapeKeyDown?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  closeButtonClassName,
  disableEscapeKeyDown = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !disableEscapeKeyDown) {
        onClose();
      }
    },
    [isOpen, onClose, disableEscapeKeyDown]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);

  const modalNode = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(modalNode);
    return () => {
      document.body.removeChild(modalNode);
    };
  }, [modalNode]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className={cn(
          'fixed inset-0 bg-gray-900/80 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0',
          overlayClassName
        )}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={cn(
          'fixed left-[50%] top-[50%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-[#F0F8FF] rounded-lg p-6 shadow-xl transition-all duration-200',
          'sm:rounded-lg sm:max-w-md',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {children}
        <button
          onClick={onClose}
          className={cn(
            'absolute right-4 top-4 rounded-sm p-1 text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
            closeButtonClassName
          )}
          aria-label="Close modal"
        >
          <CloseOutlined className="h-4 w-4 cursor-pointer" />
        </button>
      </div>
    </div>,
    modalNode
  );
};

interface ModalHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const ModalHeader = ({ className, children }: ModalHeaderProps) => (
  <div
    className={cn(
      'mb-4 flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
  >
    {children}
  </div>
);

interface ModalContentProps {
  className?: string;
  children: React.ReactNode;
}

const ModalContent = ({ className, children }: ModalContentProps) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

const ModalFooter = ({ className, children }: ModalFooterProps) => (
  <div className={cn('flex gap-2 sm:flex-row sm:justify-end', className)}>
    {children}
  </div>
);

interface ModalTitleProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const ModalTitle = ({ className, children, id }: ModalTitleProps) => (
  <h2
    id={id}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
  >
    {children}
  </h2>
);

interface ModalDescriptionProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const ModalDescription = ({
  className,
  children,
  id,
}: ModalDescriptionProps) => (
  <p id={id} className={cn('text-sm text-gray-500', className)}>
    {children}
  </p>
);

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
export type {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
  ModalTitleProps,
  ModalDescriptionProps,
};
