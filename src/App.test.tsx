import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useFormStore } from "./store/formStore";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
  useFormStore.setState({ submissions: [] });
});

afterEach(() => {
  document.body.innerHTML = "";
  useFormStore.setState({ submissions: [] });
});

describe("App", () => {
  it("renders title and buttons", () => {
    render(<App />);
    expect(screen.getByText("React Forms")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Uncontrolled Form" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "React Hook Form" }),
    ).toBeInTheDocument();
  });

  it("opens uncontrolled form modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Uncontrolled Form" }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens hook form modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "React Hook Form" }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays submissions", () => {
    useFormStore.getState().addSubmission({
      name: "Test User",
      age: 30,
      email: "test@test.com",
      gender: "male",
      country: "US",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      image: "",
      terms: true,
    });
    render(<App />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows no submissions message", () => {
    render(<App />);
    expect(screen.getByText("No submissions yet")).toBeInTheDocument();
  });
});
