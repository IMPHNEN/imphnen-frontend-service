import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Password Input',
  component: PasswordInput,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Placeholder',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Placeholder',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Placeholder',
  },
};

export const Input: Story = {
  args: {
    size: 'md',
    placeholder: 'Placeholder',
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    size: 'md',
    error: 'This field is required',
  },
};
