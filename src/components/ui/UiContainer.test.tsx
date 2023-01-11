import { renderWithProviders } from "test-utils";
import UiContainer from "./UiContainer";
import { screen } from "@testing-library/react";

describe("UiContainer", () => {
  test("Contains expected elements", () => {
    renderWithProviders(
      <UiContainer
        transportData={{
          stopMap: new Map(),
          lines: [],
        }}
      />
    );

    expect(screen.getByText(/ROUTE_SEARCH_HEADER/)).toBeInTheDocument();
    expect(screen.getByText(/APP_TITLE/)).toBeInTheDocument();
  });
});
