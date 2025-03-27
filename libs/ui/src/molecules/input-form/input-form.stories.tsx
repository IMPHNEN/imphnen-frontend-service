import type { Meta, StoryObj } from '@storybook/react';
import { InputForm } from './input-form';

const meta = {
  title: 'Molecules/InputForm',
  component: InputForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Komponen input form yang menggabungkan label dengan kolom input.

## Aksesibilitas
Ketika prop \`htmlFor\` disediakan:
- Atribut \`htmlFor\` pada label akan diatur ke nilai tersebut
- Atribut \`id\` pada input akan otomatis diatur ke nilai yang sama
- Ini menciptakan asosiasi label-input yang tepat untuk aksesibilitas

Cek dan inspect element pada story With HtmlFor untuk melihat hasilnya.

## Helper Text dan Error
- Jika prop \`error\` disediakan, akan ditampilkan dalam warna merah di bawah input
- Jika prop \`helperText\` disediakan dan tidak ada error, akan ditampilkan dalam warna abu-abu di bawah input
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
    size: 'lg',
    helperText: 'Helper Text',
  },
};

export const Medium: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
    size: 'md',
    helperText: 'Helper Text',
  },
};

export const Small: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
    size: 'sm',
    helperText: 'Helper Text',
  },
};

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Enter your name',
    type: 'text',
    size: 'md',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    size: 'md',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    size: 'md',
    helperText: 'We will never share your email',
  },
};

export const WithoutHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
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

export const WithHtmlFor: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
    size: 'md',
    htmlFor: 'fullname-input',
    helperText: 'Click on the label',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'This field is disabled',
    type: 'text',
    size: 'md',
    disabled: true,
  },
};
