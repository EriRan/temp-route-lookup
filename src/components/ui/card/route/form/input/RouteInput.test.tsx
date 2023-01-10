import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RouteInput from "./RouteInput";
import { setStartStop } from "../../../../../../reducers/route/routeReducer";
import { Stop } from "../../../../../../data/mapper/types";
import { StopState } from "../../../../../../reducers/route/types";
import userEvent from "@testing-library/user-event";

describe("RouteInput", () => {
  test("Label and stopName visible", () => {
    const testLabel = "testLabel";
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
      <RouteInput
        label={testLabel}
        onChangeFunction={setStartStop}
        stopMap={stopMap}
        inputStopData={inputStopData}
      />
    );
    expect(screen.queryByDisplayValue(stopName)).toBeInTheDocument();
    // Material UI uses label texts twice
    expect(screen.queryAllByText(testLabel)).toHaveLength(2);
    const inputTextField = screen.getByDisplayValue(stopName);
    expect(inputTextField).toBeValid();
  });

  test("Error in stop state", () => {
    const testLabel = "testLabel";
    const stopMap = new Map();
    const stopName = "wrongStop";
    const relatedStop: Stop = {
      name: stopName,
      roads: [],
    };
    const inputStopData: StopState = {
      name: stopName,
      hasErrors: true
    };
    stopMap.set(relatedStop.name, relatedStop);

    renderWithProviders(
      <RouteInput
        label={testLabel}
        onChangeFunction={setStartStop}
        stopMap={stopMap}
        inputStopData={inputStopData}
      />
    );
    expect(screen.queryByDisplayValue(stopName)).toBeInTheDocument();
    expect(screen.queryAllByText(testLabel)).toHaveLength(2);
    const inputTextField = screen.getByDisplayValue(stopName);
    expect(inputTextField).toBeInvalid();
  });

  

});
