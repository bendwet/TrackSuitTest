import { describe, expect, it, vi } from "vitest";
import { Header, HEADER_TEXT } from "./header.tsx";
import { render } from "@testing-library/react";

describe("header", () => {
  it("renders", () => {
    const mockAddInsight = vi.fn();
    const { getByText } = render(<Header onAddInsight={mockAddInsight} />);
    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });
});
