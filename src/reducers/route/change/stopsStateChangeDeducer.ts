import RouteCalculator from "./calculation/RouteCalculator";
import TransportDataSingleton from "../../../data/TransportDataSingleton";
import { RouteStore, Payload, StopState } from "../types";
import { CalculationResponse } from "./calculation/types";

/**
 * Handles changes that happen to startStop, destinationStop and calculatedRoute states when it is not immediately known whether start or the destination stop changed. This is used when user clicks one of the bus stops on the map
 * @param {*} currentState
 * @param {*} payload
 */
export function changeStartOrDestination(
  currentState: RouteStore,
  payload: Payload
): CalculationResponse | null {
  if (payload.hasErrors) {
    return null;
  }
  // Clicked the same stop that is currently start, so let's remove it
  if (
    currentState.startStop.name &&
    currentState.startStop.name.toUpperCase() === payload.name.toUpperCase()
  ) {
    currentState.startStop = createEmptyStopData();
    return null;
  }
  // Clicked the same stop that is currently destination, so let's remove it
  else if (
    currentState.destinationStop.name &&
    currentState.destinationStop.name.toUpperCase() ===
      payload.name.toUpperCase()
  ) {
    currentState.destinationStop = createEmptyStopData();
    return null;
  }
  // Click is destination stop because we have start and destination already set
  else if (currentState.startStop.name && currentState.destinationStop.name) {
    // Clicked some other stop so let's change the calculation
    currentState.destinationStop = payload;
    return calculateNewRoute(currentState);
  }
  // Click is destination stop because there is currently no destination stop
  else if (currentState.startStop.name && !currentState.destinationStop.name) {
    currentState.destinationStop = payload;
    return calculateNewRoute(currentState);
  }
  // Click is start stop because we do not have a start or destination yet
  else {
    currentState.startStop = payload;
    return calculateNewRoute(currentState);
  }
}

/**
 * Calculate and set route for the provided state if possible
 */
export function calculateNewRoute(newState: RouteStore): CalculationResponse | null {
  return new RouteCalculator(
    TransportDataSingleton.getInstance()
  ).calculate(newState.startStop, newState.destinationStop);
}

function createEmptyStopData(): StopState {
  return { name: null, hasErrors: false };
}
