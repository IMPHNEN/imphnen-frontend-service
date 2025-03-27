import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './datatable';

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        address: '456 Elm St',
      },
    ],
    onEdit: (id: number) => console.log('Edit item with id:', id),
  },
};

Default.args = {
  data: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      address: '456 Elm St',
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'johns@example.com',
      phone: '456-789-1230',
      address: '789 Cedar St',
    },
  ],
  onEdit: (id: number) => console.log('Edit item with id:', id),
};
