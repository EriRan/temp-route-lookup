import { Store, AnyAction } from "redux";
import RouteResult from "./RouteResult";
import * as routeResponseCompressor from "./routeResponseCompressor";
import { CompressedRoute } from "./types";
import { RootState } from "../../../../reducers";
import { ResponseSegment } from "../../../../reducers/route/calculation/types";
import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";

describe("RouteResult", () => {
  let testStore: Store<RootState, AnyAction>;

  test("Renders empty div when no content", () => {
    renderWithProviders(<RouteResult />);
    // No changes to the initial state which does not have a calculated route
    expect(screen.queryByText(/ROUTE_RESULT_WITH_LINE/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/ROUTE_RESULT_TOTAL_DURATION/)
    ).not.toBeInTheDocument();
  });

  test("Renders empty div when calculated route has no route", () => {
    renderWithProviders(<RouteResult />, {
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
            route: [],
            errorMessages: [],
          },
        },
      },
    });

    expect(screen.queryByText(/ROUTE_RESULT_WITH_LINE/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/ROUTE_RESULT_TOTAL_DURATION/)
    ).not.toBeInTheDocument();
  });

  test("Renders route when calculatedRoute has content", () => {
    const route: ResponseSegment[] = [];
    route.push({
      id: "A-B",
      from: "A",
      to: "B",
      line: "Yellow",
      duration: 1,
    });

    renderWithProviders(<RouteResult />, {
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
    });

    // Compression
    const compressResponseSpy = jest.spyOn(
      routeResponseCompressor,
      "compressResponse"
    );
    const compressedRoute: CompressedRoute[] = [];
    compressedRoute.push({
      from: "A",
      to: "B",
      line: "Yellow",
    });
    compressResponseSpy.mockReturnValue(compressedRoute);

    expect(
      screen.getByText(/A→B ROUTE_RESULT_WITH_LINE Yellow/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ROUTE_RESULT_TOTAL_DURATION:1/i)).toBeInTheDocument();
  });
});
