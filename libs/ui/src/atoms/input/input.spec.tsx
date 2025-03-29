import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Test Input Component', () => {
  it('renders the input with placeholder text', () => {
    render(<Input placeholder="Placeholder" />);
    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it("disables the input field when 'disabled' prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
