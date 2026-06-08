import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HookForm from "./HookForm";
import { useFormStore } from "../store/formStore";

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("HookForm", () => {
  it("renders all fields", () => {
    render(<HookForm onClose={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Gender")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Image")).toBeInTheDocument();
    expect(
      screen.getByText("I accept Terms and Conditions"),
    ).toBeInTheDocument();
  });

  it("shows validation hint when invalid", async () => {
    render(<HookForm onClose={vi.fn()} />);
    await waitFor(() => {
      expect(
        screen.getByText("Please fix errors before submitting"),
      ).toBeInTheDocument();
    });
  });

  it("shows password strength indicator", async () => {
    render(<HookForm onClose={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Password"), "Abc1!");
    await waitFor(() => {
      expect(screen.getByText(/Strength:/)).toBeInTheDocument();
    });
  });

  it('submits with valid data', async () => {
    const onClose = vi.fn();
    render(<HookForm onClose={onClose} />);

    expect(screen.getByText('Please fix errors before submitting')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Name'), 'John');
    await userEvent.type(screen.getByLabelText('Age'), '25');
    await userEvent.type(screen.getByLabelText('Email'), 'john@test.com');
    await userEvent.selectOptions(screen.getByLabelText('Gender'), 'male');
    await userEvent.type(screen.getByLabelText('Country'), 'United States');
    await userEvent.type(screen.getByLabelText('Password'), 'Pass123!');
    await userEvent.type(screen.getByLabelText('Confirm Password'), 'Pass123!');

    const file = new File(['x'], 'test.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText('Image'), file);

    await userEvent.click(screen.getByLabelText('I accept Terms and Conditions'));

    await waitFor(() => {
        expect(screen.queryByText('Please fix errors before submitting')).not.toBeInTheDocument();
      }, { timeout: 3000 });
  });
});
