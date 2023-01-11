import { Stop } from "../../../../data/mapper/types";
import { RouteInputType } from "./form/input/RouteInputConstant";

export type RouteInputProps = {
  type: RouteInputType;
  stopMap: Map<string, Stop>;
};

export type RouteInputEvent = {
  target?: {
    value?: unknown;
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
