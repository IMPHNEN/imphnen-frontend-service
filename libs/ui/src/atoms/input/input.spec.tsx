import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Test Input Component", () => {
  it("renders the input with placeholder text", () => {
    render(<Input placeholder="Placeholder" />);
    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  // it("renders the input with different sizes", () => {
  //   const sizeClasses = {
  //     sm: "text-[10px] max-h-[28px]",
  //     md: "text-[12px] max-h-[30px]",
  //     lg: "text-[15px] max-h-[34px]",
  //   };
  //   Object.entries(sizeClasses).forEach(([size, className]) => {
  //     render(<Input size={size} />);
  //     expect(screen.getByRole("textbox")).toHaveClass(className);
  //   });
  // });

  // it("renders the input with different types", () => {
  //   const types = ["text", "password", "email", "number"];
  //   types.forEach((type) => {
  //     render(<Input type={type} />);
  //     const input = screen.getByRole("textbox");
  //     expect(input).toHaveAttribute("type", type);
  //   });
  // });

  it("disables the input field when 'disabled' prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
