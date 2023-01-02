import { CalculationResponse } from "./change/calculation/types";

export type Action = {
  type: string; // I would like this to have only values from actions.ts but I don't know how to do that.
  payload: Payload;
};

export type RouteStore = {
  startStop: StopState;
  destinationStop: StopState;
  calculatedRoute: CalculationResponse | null;
};

export type Payload = {
  name: string;
  hasErrors?: boolean;
};

export type StopState = {
  name: string | null;
  hasErrors?: boolean;
};
