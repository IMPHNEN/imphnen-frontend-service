import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './pagination';

import { PaginationProps } from './index'; // Import PaginationProps

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default: StoryObj<PaginationProps> = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};
