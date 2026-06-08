import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button label="Click me" onClick={onClick} />);
    await userEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
