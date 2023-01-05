import TransportDataSingleton from "../../../data/TransportDataSingleton";
import { RouteStore } from "../types";
import RouteCalculator from "./RouteCalculator";
import { CalculationResponse } from "./types";

/**
 * Create a new RouteCalculator to calculate a route between two stops
 */
export function calculateNewRoute(
  newState: RouteStore
): CalculationResponse | null {
  return new RouteCalculator(TransportDataSingleton.getInstance()).calculate(
    newState.startStop,
    newState.destinationStop
  );
}