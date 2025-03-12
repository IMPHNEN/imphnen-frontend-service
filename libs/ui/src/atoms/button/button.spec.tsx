import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Test Button Component', () => {
  it('renders the button with children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const user = userEvent.setup();
    await user.click(screen.getByText('Click Me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant class', () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByText('Delete');

    expect(button).toHaveClass('bg-danger-500');
    expect(button).toHaveClass('hover:bg-danger-600');
    expect(button).toHaveClass('text-white');
  });

  it("disables the button when 'disabled' prop is set", async () => {
    const handleClick = vi.fn();
    render(
      <Button variant="primary" disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const user = userEvent.setup();
    const button = screen.getByText('Disabled');

    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
