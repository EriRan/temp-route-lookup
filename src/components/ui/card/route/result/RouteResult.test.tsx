import RouteResult from "./RouteResult";
import * as routeResponseCompressor from "./routeResponseCompressor";
import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import { ResponseSegment } from "../../../../../reducers/route/calculation/types";
import { ROUTE_RESULT_UNKNOWN_LINE } from "../../../../constant/TranslationKeyConstant";
import { CompressedRoute } from "../types";

describe("RouteResult", () => {

  const compressResponseSpy = jest.spyOn(
    routeResponseCompressor,
    "compressResponse"
  );

  test("Renders empty div when no content", () => {
    renderWithProviders(<RouteResult />);
    // No changes to the initial state which does not have a calculated route
    expect(
      screen.queryByText(/ROUTE_RESULT_WITH_LINE/)
    ).not.toBeInTheDocument();
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

    expect(
      screen.queryByText(/ROUTE_RESULT_WITH_LINE/)
    ).not.toBeInTheDocument();
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
      line: "Green",
      duration: 1,
    });

    // Compression
    const compressedRoute: CompressedRoute[] = [];
    compressedRoute.push({
      from: "A",
      to: "B",
      line: "Green",
    });
    compressResponseSpy.mockReturnValue(compressedRoute);

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

    expect(
      screen.getByText(/A→B ROUTE_RESULT_WITH_LINE Green/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_RESULT_TOTAL_DURATION:1/i)
    ).toBeInTheDocument();
  });

  test("Unknown line if compressed route has an error", () => {
    const route: ResponseSegment[] = [];
    route.push({
      id: "A-B",
      from: "A",
      to: "B",
      line: "",
      duration: 22,
    });

    // Compression
    const compressedRoute: CompressedRoute[] = [];
    compressedRoute.push({
      from: "A",
      to: "B",
      line: "",
      error: ROUTE_RESULT_UNKNOWN_LINE
    });
    compressResponseSpy.mockReturnValue(compressedRoute);

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

    expect(
      screen.getByText(/A→B ROUTE_RESULT_WITH_LINE ROUTE_RESULT_UNKNOWN_LINE/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ROUTE_RESULT_TOTAL_DURATION:1/i)
    ).toBeInTheDocument();
  });
});
