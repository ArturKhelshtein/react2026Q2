import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from './UncontrolledForm';
import { useFormStore } from '../store/formStore';

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('UncontrolledForm', () => {
  it('renders all fields', () => {
    render(<UncontrolledForm onClose={vi.fn()} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(screen.getByText('I accept Terms and Conditions')).toBeInTheDocument();
  });

  it('shows validation errors on submit', async () => {
    render(<UncontrolledForm onClose={vi.fn()} />);
    await userEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('submits with valid data', async () => {
    const onClose = vi.fn();
    render(<UncontrolledForm onClose={onClose} />);

    await userEvent.type(screen.getByLabelText('Name'), 'John');
    await userEvent.type(screen.getByLabelText('Age'), '25');
    await userEvent.type(screen.getByLabelText('Email'), 'john@test.com');
    await userEvent.selectOptions(screen.getByLabelText('Gender'), 'male');
    await userEvent.type(screen.getByLabelText('Country'), 'United States');
    await userEvent.type(screen.getByLabelText('Password'), 'Pass123!');
    await userEvent.type(screen.getByLabelText('Confirm Password'), 'Pass123!');

    const file = new File(['x'], 'test.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Image'), file);

    await userEvent.click(screen.getByText('I accept Terms and Conditions'));

    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});