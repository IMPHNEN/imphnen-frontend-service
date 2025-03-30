import { cn } from '@imphnen-frontend-service/utils';
import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  return (
    <div className={cn('text-center mb-4', className)}>
      <p className="text-neutral-400 text-lg">
        Langkah {currentStep} dari {totalSteps}
      </p>
    </div>
  );
};

export { Stepper };
export type { StepperProps };
