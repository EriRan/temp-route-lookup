import { Stop } from "../../../data/mapper/types";

export type RouteNode = {
  stopData: Stop;
  nodeDuration: number;
  linesAvailable: Array<string>;
  selectedLine: string | null;
  shortestPath: Array<RouteNode>;
};

/**
 * Route node that contains just the variables that RouteCalculatorUsedLineDeducer requires
 */
export type UsedLineRouteNode = {
  linesAvailable: Array<string>;
  selectedLine: string | null;
};

export type CalculationResponse = {
  totalDuration: number | null;
  route: Array<ResponseSegment>;
  errorMessages: Array<string>;
};

export type RouteKey = string; //Todo: Have this as a full object instead to make it very clear what the format is

/**
 * One stretch of the calculated journey. Points from one stop to another using one line.
 */
export type ResponseSegment = {
  id: string // Combination of start point and end point of the segment.
  from: string;
  to: string;
  line: string | null;
  duration: number | null;
};
