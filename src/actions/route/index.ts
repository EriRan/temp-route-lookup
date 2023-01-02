import { SET_START_STOP, SET_DESTINATION_STOP, STOP_CLICKED } from "./actions";

// TODO: Lodash usage here makes no sense. Just upper case them during mapping
export const setStartStop = (startStop: string, hasError: boolean) => {
  return {
    type: SET_START_STOP,
    payload: {
      name: startStop,
      hasError: hasError,
    },
  };
};

export const setDestinationStop = (
  destinationStop: string,
  hasError: boolean
) => {
  return {
    type: SET_DESTINATION_STOP,
    payload: {
      name: destinationStop,
      hasError: hasError,
    },
  };
};

export const stopClicked = (stopName: string) => {
  return {
    type: STOP_CLICKED,
    payload: {
      name: stopName,
      hasError: null,
    },
  };
};
