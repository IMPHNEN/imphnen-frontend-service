import type { Meta, StoryObj } from '@storybook/react';
import { Filter } from './filter';

const meta: Meta<typeof Filter> = {
  title: 'Organisms/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'neutral',
      values: [{ name: 'neutral', value: '#e7e7e7' }],
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {},
};
