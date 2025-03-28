import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Large: Story = {
  args: {
    size: 'lg',
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const TextInput: Story = {
  args: {
    size: 'md',
    type: 'text',
  },
};

export const EmailInput: Story = {
  args: {
    size: 'md',
    type: 'email',
  },
};

export const PasswordInput: Story = {
  args: {
    size: 'md',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    type: 'text',
    disabled: true,
  },
};
