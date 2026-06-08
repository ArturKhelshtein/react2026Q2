import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.body.innerHTML = '';
});

function getModalRoot() {
  return document.getElementById('modal-root');
}

describe('Modal', () => {
  it('does not render when closed', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Test">Content</Modal>);
    expect(getModalRoot()?.children.length).toBe(0);
  });

  it('renders with title when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="My Title">
        <button>Inside</button>
      </Modal>
    );
    const modalRoot = getModalRoot();
    expect(modalRoot?.querySelector('[role="dialog"]')).toBeInTheDocument();
    expect(modalRoot).toHaveTextContent('My Title');
  });

  it('closes on overlay click', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>Inside</button>
      </Modal>
    );
    const overlay = getModalRoot()?.querySelector('.modal-overlay');
    if (!overlay) throw new Error('Overlay not found');
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes on Escape key', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>Inside</button>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes on close button click', async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>Inside</button>
      </Modal>
    );
    const closeBtn = getModalRoot()?.querySelector('[aria-label="Close modal"]');
    if (!closeBtn) throw new Error('Close button not found');
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledOnce();
  });
});