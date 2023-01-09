import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Stop } from "../../../../data/mapper/types";
import { Payload, StopState } from "../../../../reducers/route/types";

export type RouteInputProps = {
  label: string;
  onChangeFunction: ActionCreatorWithPayload<Payload, string>;
  stopMap: Map<string, Stop>;
  inputStopData: StopState | null;
  autoFocus?: boolean;
};

export type RouteInputEvent = {
  target: {
    value: unknown;
  };
};

/**
 * Route from one stop to another using a line. In case there is an error, error will hold the translation key for the error message
 */
export type CompressedRoute = {
  from: string;
  to: string;
  line: string;
  error?: string;
};
