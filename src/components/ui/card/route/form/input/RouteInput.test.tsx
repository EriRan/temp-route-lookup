import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RouteInput from "./RouteInput";
import { setStartStop } from "../../../../../../reducers/route/routeReducer";
import { Stop } from "../../../../../../data/mapper/types";
import { StopState } from "../../../../../../reducers/route/types";
import userEvent from "@testing-library/user-event";
import { RouteInputType } from "./RouteInputContant";

describe("RouteInput", () => {
  test("Start stop: Label and stopName visible", () => {
    const stopMap = new Map();
    const stopName = "TestStop";
    const relatedStop: Stop = {
      name: stopName,
      roads: [],
    };
    const inputStopData: StopState = {
      name: stopName,
    };
    stopMap.set(relatedStop.name, relatedStop);

    renderWithProviders(
      <RouteInput type={RouteInputType.START} stopMap={stopMap} />,
      {
        preloadedState: {
          route: {
            startStop: inputStopData,
            destinationStop: {
              name: null,
            },
            calculatedRoute: {
              totalDuration: null,
              route: [],
              errorMessages: [],
            },
          },
        },
      }
    );
    expect(screen.queryByDisplayValue(stopName)).toBeInTheDocument();
    // Material UI uses label texts twice
    expect(
      screen.queryAllByText("ROUTE_SEARCH_START_POINT_PLACEHOLDER")
    ).toHaveLength(2);
    const inputTextField = screen.getByDisplayValue(stopName);
    expect(inputTextField).toBeValid();
  });

  test("Start stop: Error in stop state", () => {
    const stopMap = new Map();
    const stopName = "wrongStop";
    const relatedStop: Stop = {
      name: stopName,
      roads: [],
    };
    const inputStopData: StopState = {
      name: stopName,
      hasErrors: true,
    };
    stopMap.set(relatedStop.name, relatedStop);

    renderWithProviders(
      <RouteInput type={RouteInputType.START} stopMap={stopMap} />,
      {
        preloadedState: {
          route: {
            startStop: inputStopData,
            destinationStop: {
              name: null,
            },
            calculatedRoute: {
              totalDuration: null,
              route: [],
              errorMessages: [],
            },
          },
        },
      }
    );
    expect(screen.queryByDisplayValue(stopName)).toBeInTheDocument();
    expect(
      screen.queryAllByText("ROUTE_SEARCH_START_POINT_PLACEHOLDER")
    ).toHaveLength(2);
    const inputTextField = screen.getByDisplayValue(stopName);
    expect(inputTextField).toBeInvalid();
  });
});