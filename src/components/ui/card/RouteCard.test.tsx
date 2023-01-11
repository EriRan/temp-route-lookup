import { renderWithProviders } from "test-utils";
import RouteCard from "./RouteCard";
import { screen } from "@testing-library/react";
import { ResponseSegment } from "../../../reducers/route/calculation/types";

/**
 * Higher level test, so do just quick verification that some elements exist inside this element. Leave more detailed testing to component's own tests
 */
describe("RouteCard", () => {
  test("Contains expected content when no results", () => {
    renderWithProviders(
      <RouteCard
        transportData={{
          stopMap: new Map(),
          lines: [],
        }}
      />
    );

    expect(screen.getByText(/ROUTE_SEARCH_HEADER/)).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_SEARCH_START_POINT_HEADER/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_SEARCH_END_POINT_HEADER/)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/ROUTE_SEARCH_START_POINT_PLACEHOLDER/).length
    ).toBe(2);
    expect(
      screen.getAllByText(/ROUTE_SEARCH_END_POINT_PLACEHOLDER/).length
    ).toBe(2);
    expect(
      screen.queryByText(/ROUTE_RESULT_WITH_LINE/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/ROUTE_RESULT_TOTAL_DURATION/)
    ).not.toBeInTheDocument();
  });

  test("Contains expected content when has results", () => {
    const route: ResponseSegment[] = [];
    route.push({
      id: "A-B",
      from: "A",
      to: "B",
      line: "Green",
      duration: 1,
    });

    renderWithProviders(
      <RouteCard
        transportData={{
          stopMap: new Map(),
          lines: [],
        }}
      />,
      {
        preloadedState: {
          route: {
            startStop: {
              name: "none",
            },
            destinationStop: {
              name: "none",
            },
            calculatedRoute: {
              totalDuration: 1,
              route: route,
              errorMessages: [],
            },
          },
        },
      }
    );

    expect(screen.getByText(/ROUTE_SEARCH_HEADER/)).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_SEARCH_START_POINT_HEADER/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_SEARCH_END_POINT_HEADER/)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/ROUTE_SEARCH_START_POINT_PLACEHOLDER/).length
    ).toBe(2);
    expect(
      screen.getAllByText(/ROUTE_SEARCH_END_POINT_PLACEHOLDER/).length
    ).toBe(2);
    expect(
      screen.queryByText(/ROUTE_RESULT_WITH_LINE/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/ROUTE_RESULT_TOTAL_DURATION/)
    ).toBeInTheDocument();
  });
});
