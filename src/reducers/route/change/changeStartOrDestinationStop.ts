import { RouteStore, Payload, StopState } from "../types";

/**
 * Set start or destination stop depending on what start and destination are currently set
 *
 * This is needed when user clicks a stop and we need to figure out whether the clicked one was start or destination stop.
 * @param {*} currentState
 * @param {*} payload
 */
export function changeStartOrDestinationStop(
  currentState: RouteStore,
  payload: Payload
): void {
  if (payload.hasErrors) {
    return;
  }
  // Remove start stop if the clicked one was already start stop
  if (
    currentState.startStop.name &&
    currentState.startStop.name.toUpperCase() === payload.name.toUpperCase()
  ) {
    currentState.startStop = createEmptyStopData();
  }
  // Remove destination stop if the clicked one was already destination stop
  else if (
    currentState.destinationStop.name &&
    currentState.destinationStop.name.toUpperCase() ===
      payload.name.toUpperCase()
  ) {
    currentState.destinationStop = createEmptyStopData();
  }
  // Click is destination if
  // - We have start and destination already set and we've clicked an unclicked stop
  // - There is currently no destination stop
  else if (
    (currentState.startStop.name && currentState.destinationStop.name) ||
    (currentState.startStop.name && !currentState.destinationStop.name)
  ) {
    currentState.destinationStop = payload;
  }
  // Click is start stop because we do not have a start or destination yet
  else {
    currentState.startStop = payload;
  }
}

function createEmptyStopData(): StopState {
  return { name: null, hasErrors: false };
}
