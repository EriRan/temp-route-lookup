import { renderWithProviders } from "test-utils";
import RouteForm from "./RouteForm";
import { screen } from "@testing-library/react";

describe("RouteForm", () => {
  test("Contains header and text field placeholders", () => {
    renderWithProviders(<RouteForm stopMap={new Map()} />);

    expect(screen.queryByText("ROUTE_SEARCH_START_POINT_HEADER")).toBeInTheDocument();
    // Material UI uses both of these label texts twice
    expect(screen.queryAllByText("ROUTE_SEARCH_START_POINT_PLACEHOLDER")).toHaveLength(2);
    expect(screen.queryAllByText("ROUTE_SEARCH_END_POINT_PLACEHOLDER")).toHaveLength(2);
  });
});
