import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './modal';
import { vi } from 'vitest';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Close modal'));
    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalledTimes(1));
  });

  it('calls onClose when overlay is clicked', async () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByRole('presentation'));
    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalledTimes(1));
  });

  it('closes on Escape key press when disableEscapeKeyDown is false', async () => {
    render(<Modal {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalledTimes(1));
  });

  it('does not close on Escape key press when disableEscapeKeyDown is true', async () => {
    render(<Modal {...defaultProps} disableEscapeKeyDown={true} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(defaultProps.onClose).not.toHaveBeenCalled());
  });

  it('renders sub-components correctly', () => {
    render(
      <Modal {...defaultProps}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Description>Modal Description</Modal.Description>
        </Modal.Header>
        <Modal.Content>Modal Content</Modal.Content>
        <Modal.Footer>
          <button>Footer Button</button>
        </Modal.Footer>
      </Modal>
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Description')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    render(
      <Modal
        {...defaultProps}
        className="custom-modal"
        overlayClassName="custom-overlay"
        closeButtonClassName="custom-close"
      />
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
    expect(screen.getByRole('presentation')).toHaveClass('custom-overlay');
    expect(screen.getByLabelText('Close modal')).toHaveClass('custom-close');
  });

  it('sets ARIA attributes correctly', () => {
    render(
      <Modal
        {...defaultProps}
        aria-label="Test Modal"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <Modal.Header>
          <Modal.Title id="modal-title">Title</Modal.Title>
          <Modal.Description id="modal-desc">Description</Modal.Description>
        </Modal.Header>
      </Modal>
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', 'Test Modal');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-describedby', 'modal-desc');
  });
});
