import {
  SET_START_STOP,
  SET_DESTINATION_STOP,
  STOP_CLICKED,
} from "../../actions/route/actions";

import {
  calculateNewRoute,
  changeStartOrDestination,
} from "./change/stopsStateChangeDeducer";
import { Action, RouteStore } from "./types";

const INITIAL_STATE: RouteStore = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

export const REDUCERS = (state = INITIAL_STATE, action: Action): RouteStore => {
  switch (action.type) {
    case SET_START_STOP:
      return calculateNewRoute({
        ...state,
        startStop: action.payload,
      });
    case SET_DESTINATION_STOP:
      return calculateNewRoute({
        ...state,
        destinationStop: action.payload,
      });
    case STOP_CLICKED:
      return changeStartOrDestination(state, action.payload);
    default:
      return state;
  }
};
