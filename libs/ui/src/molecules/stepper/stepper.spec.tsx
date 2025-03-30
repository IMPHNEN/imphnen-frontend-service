import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Stepper, StepperProps } from './Stepper';

vi.mock('@imphnen-frontend-service/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('Stepper', () => {
  const renderStepper = (props: StepperProps) => render(<Stepper {...props} />);

  it('renders with correct step information', () => {
    renderStepper({ currentStep: 2, totalSteps: 5 });

    expect(screen.getByText('Langkah 2 dari 5')).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-stepper';
    renderStepper({
      currentStep: 1,
      totalSteps: 3,
      className: customClass,
    });

    const stepperElement = screen.getByText('Langkah 1 dari 3').parentElement;
    expect(stepperElement).toHaveClass('text-center');
    expect(stepperElement).toHaveClass('mb-4');
    expect(stepperElement).toHaveClass(customClass);
  });

  it('handles step 0 correctly', () => {
    renderStepper({ currentStep: 0, totalSteps: 3 });
    expect(screen.getByText('Langkah 0 dari 3')).toBeInTheDocument();
  });

  it('handles equal currentStep and totalSteps', () => {
    renderStepper({ currentStep: 3, totalSteps: 3 });
    expect(screen.getByText('Langkah 3 dari 3')).toBeInTheDocument();
  });

  it('applies correct text styling classes', () => {
    renderStepper({ currentStep: 1, totalSteps: 2 });
    const textElement = screen.getByText('Langkah 1 dari 2');
    expect(textElement).toHaveClass('text-neutral-400');
    expect(textElement).toHaveClass('text-lg');
  });
});
