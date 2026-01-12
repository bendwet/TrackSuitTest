import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AddInsight } from "./add-insight.tsx";

describe("AddInsight", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders when open", () => {
    render(
      <AddInsight open onClose={() => undefined} />,
    );
    expect(screen.getByText("Add a new insight")).toBeTruthy();
  });

  it("does not render when closed", () => {
    render(
      <AddInsight open={false} onClose={() => undefined} />,
    );
    expect(screen.queryByText("Add a new insight")).toBeFalsy();
  });

  it("renders form elements", () => {
    render(
      <AddInsight open onClose={() => undefined} />,
    );
    expect(screen.getByText("Insight")).toBeTruthy();
    expect(screen.getByText("Add insight")).toBeTruthy();
    expect(screen.getByPlaceholderText("Something insightful...")).toBeTruthy();
  });
});
