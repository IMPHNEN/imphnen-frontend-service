import { render, screen } from '@testing-library/react';
import { InputField } from './input-field';

describe('InputForm Component', () => {
  it('renders correctly with disabled prop', () => {
    render(<InputField label="Test Label" disabled={true} />);

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50 cursor-not-allowed');
  });

  it('renders correctly without disabled prop', () => {
    render(<InputField label="Test Label" disabled={false} />);

    const input = screen.getByLabelText('Test Label');
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveClass('opacity-50 cursor-not-allowed');
  });
});
