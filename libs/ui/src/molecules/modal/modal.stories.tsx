import { Modal } from './modal';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    className: { control: 'text' },
    overlayClassName: { control: 'text' },
    closeButtonClassName: { control: 'text' },
    disableEscapeKeyDown: { control: 'boolean' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    'aria-describedby': { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {
      console.log('Modal closed');
    },
    children: (
      <>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Description>
            This is a simple modal description.
          </Modal.Description>
        </Modal.Header>
        <Modal.Content>This is the main content of the modal.</Modal.Content>
        <Modal.Footer>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        </Modal.Footer>
      </>
    ),
  },
};

export const CustomClasses: Story = {
  args: {
    ...Default.args,
    className: 'bg-red-100',
    overlayClassName: 'bg-opacity-50',
    closeButtonClassName: 'text-red-500',
  },
};

export const NoEscapeClose: Story = {
  args: {
    ...Default.args,
    disableEscapeKeyDown: true,
  },
};

export const WithAria: Story = {
  args: {
    ...Default.args,
    'aria-label': 'Custom Modal',
    'aria-labelledby': 'modal-title',
    'aria-describedby': 'modal-desc',
    children: (
      <>
        <Modal.Header>
          <Modal.Title id="modal-title">Modal Title</Modal.Title>
          <Modal.Description id="modal-desc">
            This is a modal with ARIA attributes.
          </Modal.Description>
        </Modal.Header>
        <Modal.Content>Modal content here.</Modal.Content>
      </>
    ),
  },
};
