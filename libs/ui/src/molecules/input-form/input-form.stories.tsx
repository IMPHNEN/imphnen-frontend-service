import type { Meta, StoryObj } from '@storybook/react';
import { InputForm } from './input-form';

const meta = {
  title: 'Molecules/InputForm',
  component: InputForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    size: 'md',
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    size: 'md',
    error: 'This field is required',
  },
};

export const Large: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    label: 'Phone',
    placeholder: 'Enter your phone number',
    type: 'text',
    size: 'sm',
  },
};
