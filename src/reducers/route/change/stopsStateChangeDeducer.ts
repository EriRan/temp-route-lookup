import RouteCalculator from "./calculation/RouteCalculator";
import TransportDataSingleton from "../../../data/TransportDataSingleton";
import { RouteStore, Payload, StopState } from "../types";

/**
 * Handles changes that happen to startStop, destinationStop and calculatedRoute states when it is not immediately known did the start or the destination stop change. This is used when user clicks one of the bus stops on the map
 * @param {*} currentState
 * @param {*} payload
 */
export function changeStartOrDestination(
  currentState: RouteStore,
  payload: Payload
) {
  if (payload.hasErrors) {
    return currentState;
  }
  //If the payload is going to update the startStop state for the same stop as current state has, we will empty the startStop state.
  const isStartStopUsable = hasUsableInput(currentState.startStop);
  if (isStartStopUsable && currentState.startStop!.name === payload.name) {
    return appendCalculatedRoute({
      ...currentState,
      startStop: createEmptyStopData(),
    });
  }
  //Same as for the start stop, but now for destination
  if (
    hasUsableInput(currentState.destinationStop) &&
    currentState.destinationStop!.name === payload.name
  ) {
    return appendCalculatedRoute({
      ...currentState,
      destinationStop: createEmptyStopData(),
    });
  }

  //Update to state did not contain same stop names as in start and destination stops. We will then update either start or destination stop,
  //whichever is found to contain unusable value first.
  if (!isStartStopUsable) {
    return appendCalculatedRoute({
      ...currentState,
      startStop: payload,
    });
  } else {
    return appendCalculatedRoute({
      ...currentState,
      destinationStop: payload,
    });
  }
}

/**
 * Calculate and set route for the provided state if possible
 */
export function appendCalculatedRoute(currentState: RouteStore) {
  currentState.calculatedRoute = new RouteCalculator(
    TransportDataSingleton.getInstance()
  ).calculate(currentState.startStop!, currentState.destinationStop!);

  return currentState;
}

function hasUsableInput(targetStop: StopState | null) {
  return targetStop && targetStop.name;
}

function createEmptyStopData() {
  return { name: null, hasErrors: false };
}
