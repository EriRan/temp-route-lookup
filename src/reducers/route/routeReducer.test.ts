import { RouteStore } from "./types";
import * as changeStartOrDestinationStop from "./change/changeStartOrDestinationStop";
import * as calculateNewRoute from "./calculation/calculateNewRoute";
import routeReducer, { setDestinationStop, setStartStop, stopClicked } from "./routeReducer";
import { AnyAction } from "@reduxjs/toolkit";

describe("routeReducer", () => {

  test("SET_START_STOP", () => {
    const INITIAL_STATE: RouteStore = {
      calculatedRoute: null,
      startStop: { name: null, hasErrors: false },
      destinationStop: { name: null, hasErrors: false },
    };
    const action: AnyAction = {
      type: setStartStop.type,
      payload: {
        name: "a",
        hasErrors: false,
      },
    };

    // Import mocked functions as an object, then spy on the functions of the object
    const calculateNewRouteSpy = jest.spyOn(
      calculateNewRoute,
      "calculateNewRoute"
    );
    const changeStartOrDestinationSpy = jest.spyOn(
      changeStartOrDestinationStop,
      "changeStartOrDestinationStop"
    );

    // Validate that calls have been done to the expected functions
    routeReducer(INITIAL_STATE, action);
    expect(calculateNewRouteSpy.mock.calls.length).toBe(1);
    expect(changeStartOrDestinationSpy.mock.calls.length).toBe(0);
  });

  test("SET_DESTINATION_STOP", () => {
    const INITIAL_STATE: RouteStore = {
      calculatedRoute: null,
      startStop: { name: null, hasErrors: false },
      destinationStop: { name: null, hasErrors: false },
    };
    const action: AnyAction = {
      type: setDestinationStop.type,
      payload: {
        name: "a",
        hasErrors: false,
      },
    };

    const calculateNewRouteSpy = jest.spyOn(
      calculateNewRoute,
      "calculateNewRoute"
    );
    const changeStartOrDestinationSpy = jest.spyOn(
      changeStartOrDestinationStop,
      "changeStartOrDestinationStop"
    );

    routeReducer(INITIAL_STATE, action);
    expect(calculateNewRouteSpy.mock.calls.length).toBe(1);
    expect(changeStartOrDestinationSpy.mock.calls.length).toBe(0);
  });

  test("STOP_CLICKED", () => {
    const INITIAL_STATE: RouteStore = {
      calculatedRoute: null,
      startStop: { name: null, hasErrors: false },
      destinationStop: { name: null, hasErrors: false },
    };
    const action: AnyAction = {
      type: stopClicked.type,
      payload: {
        name: "a",
        hasErrors: false,
      },
    };

    const calculateNewRouteSpy = jest.spyOn(
      calculateNewRoute,
      "calculateNewRoute"
    );
    const changeStartOrDestinationSpy = jest.spyOn(
      changeStartOrDestinationStop,
      "changeStartOrDestinationStop"
    );

    routeReducer(INITIAL_STATE, action);
    expect(calculateNewRouteSpy.mock.calls.length).toBe(1);
    expect(changeStartOrDestinationSpy.mock.calls.length).toBe(1);
  });
});
