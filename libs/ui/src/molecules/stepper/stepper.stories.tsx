import { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0 },
      description: 'Current step number',
    },
    totalSteps: {
      control: { type: 'number', min: 1 },
      description: 'Total number of steps',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A simple stepper component showing progress through steps',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};

export const MiddleStep: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
  },
};

export const LastStep: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
  },
};

export const WithCustomClass: Story = {
  args: {
    currentStep: 1,
    totalSteps: 5,
    className: 'custom-class',
  },
};
