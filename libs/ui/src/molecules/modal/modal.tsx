'use client';

import * as React from 'react';
import { cn } from '@imphnen-frontend-service/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../atoms/dialog';

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

/**
 * Modal — backward-compat wrapper around the shadcn Dialog primitives.
 * Existing callers use `<Modal isOpen onClose>` + `Modal.Header/Content/Footer/Title/Description`.
 */
function ModalRoot({
  isOpen,
  onClose,
  children,
  className,
  disableEscapeKeyDown = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent
        className={cn('sm:max-w-md', className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onEscapeKeyDown={(e) => {
          if (disableEscapeKeyDown) e.preventDefault();
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

type ModalHeaderProps = React.ComponentProps<'div'>;
const ModalHeader = ({ className, ...props }: ModalHeaderProps) => (
  <DialogHeader className={className} {...props} />
);

type ModalContentProps = React.ComponentProps<'div'>;
const ModalContent = ({ className, ...props }: ModalContentProps) => (
  <div className={cn('py-2', className)} {...props} />
);

type ModalFooterProps = React.ComponentProps<'div'>;
const ModalFooter = ({ className, ...props }: ModalFooterProps) => (
  <DialogFooter className={className} {...props} />
);

type ModalTitleProps = React.ComponentProps<'h2'>;
const ModalTitle = ({ className, children, id }: ModalTitleProps) => (
  <DialogTitle id={id} className={className}>
    {children}
  </DialogTitle>
);

type ModalDescriptionProps = React.ComponentProps<'p'>;
const ModalDescription = ({
  className,
  children,
  id,
}: ModalDescriptionProps) => (
  <DialogDescription id={id} className={className}>
    {children}
  </DialogDescription>
);

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
});

export type {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
  ModalTitleProps,
  ModalDescriptionProps,
};
