import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RouteInput from "./RouteInput";
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

  test("Destination stop: Label and stopName visible", () => {
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
      <RouteInput type={RouteInputType.DESTINATION} stopMap={stopMap} />,
      {
        preloadedState: {
          route: {
            startStop: {
              name: null,
            },
            destinationStop: inputStopData,
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
      screen.queryAllByText("ROUTE_SEARCH_END_POINT_PLACEHOLDER")
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

  test("Destination stop: Error in stop state", () => {
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
      <RouteInput type={RouteInputType.DESTINATION} stopMap={stopMap} />,
      {
        preloadedState: {
          route: {
            startStop: {
              name: null,
            },
            destinationStop: inputStopData,
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
      screen.queryAllByText("ROUTE_SEARCH_END_POINT_PLACEHOLDER")
    ).toHaveLength(2);
    const inputTextField = screen.getByDisplayValue(stopName);
    expect(inputTextField).toBeInvalid();
  });

  test("Start stop: State changes when typing done to input", async () => {
    // TODO: The fact that transportation data is always coming from the JSON really limits my choices of names here
    // Validator will add an error to the start stop if the start stop name does not match. Really need to move the transport data into state to resolve this
    const initialStopName = "A";
    const typedStopName = "B";
    const stopMap = new Map();
    const initialStop: Stop = {
      name: initialStopName,
      roads: [],
    };
    const typedStop: Stop = {
      name: typedStopName,
      roads: [],
    };
    const inputStopData: StopState = {
      name: initialStopName,
    };
    stopMap.set(initialStop.name, initialStop);
    stopMap.set(typedStop.name, typedStop);

    const user = userEvent.setup();
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
    const inputTextField = screen.getByRole("textbox");
    expect(inputTextField instanceof HTMLInputElement).toBeTruthy();
    const castedInputTextField = inputTextField as HTMLInputElement;
    await user.clear(castedInputTextField);
    await user.type(castedInputTextField, typedStopName);

    expect(castedInputTextField).toBeValid();
    expect(castedInputTextField).toHaveValue(typedStopName);
  });

  test("Type to non existant value displays an error", async () => {
    const initialStopName = "initialStop";
    const nonExistantStopName = "nonExistantStop";
    const stopMap = new Map();
    const initialStop: Stop = {
      name: initialStopName,
      roads: [],
    };
    const inputStopData: StopState = {
      name: initialStopName,
    };
    stopMap.set(initialStop.name, initialStop);

    const user = userEvent.setup();
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
    const inputTextField = screen.getByRole("textbox");
    expect(inputTextField instanceof HTMLInputElement).toBeTruthy();
    const castedInputTextField = inputTextField as HTMLInputElement;
    await user.clear(castedInputTextField);
    await user.type(castedInputTextField, nonExistantStopName);

    expect(castedInputTextField).toHaveValue(nonExistantStopName);
    expect(castedInputTextField).toBeInvalid();
  });
});
