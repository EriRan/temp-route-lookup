import { SET_DESTINATION_STOP, SET_START_STOP, STOP_CLICKED } from "../../actions/route/actions";
import { REDUCERS } from "./routeReducer";
import { Action, RouteStore } from "./types";
import * as stopsStateChangeDeducer from "./change/stopsStateChangeDeducer";

afterEach(() => {
  jest.restoreAllMocks();
});

test("SET_START_STOP", () => {
  const INITIAL_STATE: RouteStore = {
    calculatedRoute: null,
    startStop: { name: null, hasErrors: false },
    destinationStop: { name: null, hasErrors: false },
  };
  const action: Action = {
    type: SET_START_STOP,
    payload: {
      name: "a",
      hasErrors: false,
    },
  };

  // Import mocked functions as an object, then spy on the functions of the object
  const calculateNewRouteSpy = jest.spyOn(stopsStateChangeDeducer, 'calculateNewRoute');
  const changeStartOrDestinationSpy = jest.spyOn(stopsStateChangeDeducer, 'changeStartOrDestination');
  
  // Validate that calls have been done to the expected functions
  REDUCERS(INITIAL_STATE, action);
  expect(calculateNewRouteSpy.mock.calls.length).toBe(1);
  expect(changeStartOrDestinationSpy.mock.calls.length).toBe(0);
});

test("SET_DESTINATION_STOP", () => {
  const INITIAL_STATE: RouteStore = {
    calculatedRoute: null,
    startStop: { name: null, hasErrors: false },
    destinationStop: { name: null, hasErrors: false },
  };
  const action: Action = {
    type: SET_DESTINATION_STOP,
    payload: {
      name: "a",
      hasErrors: false,
    },
  };

  const calculateNewRouteSpy = jest.spyOn(stopsStateChangeDeducer, 'calculateNewRoute');
  const changeStartOrDestinationSpy = jest.spyOn(stopsStateChangeDeducer, 'changeStartOrDestination');
  
  REDUCERS(INITIAL_STATE, action);
  expect(calculateNewRouteSpy.mock.calls.length).toBe(1);
  expect(changeStartOrDestinationSpy.mock.calls.length).toBe(0);
});

test("STOP_CLICKED", () => {
  const INITIAL_STATE: RouteStore = {
    calculatedRoute: null,
    startStop: { name: null, hasErrors: false },
    destinationStop: { name: null, hasErrors: false },
  };
  const action: Action = {
    type: STOP_CLICKED,
    payload: {
      name: "a",
      hasErrors: false,
    },
  };

  const calculateNewRouteSpy = jest.spyOn(stopsStateChangeDeducer, 'calculateNewRoute');
  const changeStartOrDestinationSpy = jest.spyOn(stopsStateChangeDeducer, 'changeStartOrDestination');
  
  REDUCERS(INITIAL_STATE, action);
  expect(calculateNewRouteSpy.mock.calls.length).toBe(0);
  expect(changeStartOrDestinationSpy.mock.calls.length).toBe(1);
});