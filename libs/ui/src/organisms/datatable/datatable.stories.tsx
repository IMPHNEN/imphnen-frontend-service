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
      {
        id: 3,
        name: 'John Smith',
        email: 'johns@example.com',
        phone: '456-789-1230',
        address: '789 Cedar St',
      },
    ],
    headers: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      { label: 'Address', key: 'address' },
    ],
    onRowClick: (item) => console.log('Row clicked:', item),
  },
};

export const WithCustomRender: Story = {
  args: {
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        status: 'active',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        address: '456 Elm St',
        status: 'inactive',
      },
      {
        id: 3,
        name: 'John Smith',
        email: 'johns@example.com',
        phone: '456-789-1230',
        address: '789 Cedar St',
        status: 'active',
      },
    ],
    headers: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      {
        label: 'Status',
        render: (item) => (
          <span
            className={`px-2 py-1 rounded-md text-xs ${
              item.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {item.status}
          </span>
        ),
      },
      {
        label: 'Actions',
        render: (item) => (
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit item with id:', item.id);
            }}
          >
            Edit
          </button>
        ),
      },
    ],
    onRowClick: (item) => console.log('Row clicked:', item),
  },
};

export const WithoutCheckbox: Story = {
  args: {
    ...Default.args,
    showCheckbox: false,
  },
};
