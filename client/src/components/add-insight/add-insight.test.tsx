import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AddInsight } from "./add-insight.tsx";

describe("add-insight", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders modal when open", () => {
    const mockAddInsight = vi.fn();
    const mockClose = vi.fn();
    render(
      <AddInsight
        open={true}
        onClose={mockClose}
        onAddInsight={mockAddInsight}
      />,
    );
    expect(screen.getByText("Add a new insight")).toBeTruthy();
  });

  it("calls onAddInsight with brand and text when form submitted", () => {
    const mockAddInsight = vi.fn();
    const mockClose = vi.fn();
    const { container } = render(
      <AddInsight
        open={true}
        onClose={mockClose}
        onAddInsight={mockAddInsight}
      />,
    );

    const textarea = container.querySelector("textarea");
    if (textarea) {
      fireEvent.change(textarea, { target: { value: "Test insight" } });
      const form = textarea.closest("form");
      if (form) {
        fireEvent.submit(form);
        expect(mockAddInsight).toHaveBeenCalledWith(1, "Test insight");
      }
    }
  });

  it("does not call onAddInsight when text is empty", () => {
    const mockAddInsight = vi.fn();
    const mockClose = vi.fn();
    const { container } = render(
      <AddInsight
        open={true}
        onClose={mockClose}
        onAddInsight={mockAddInsight}
      />,
    );

    const textarea = container.querySelector("textarea");
    if (textarea) {
      const form = textarea.closest("form");
      if (form) {
        fireEvent.submit(form);
        expect(mockAddInsight).not.toHaveBeenCalled();
      }
    }
  });
});
