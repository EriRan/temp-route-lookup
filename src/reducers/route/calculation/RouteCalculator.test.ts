import RouteCalculator from "./RouteCalculator";
import { CalculationResponse } from "./types";
import {
  ALREADY_AT_DESTINATION,
  UNKNOWN_END_STOP_INPUTED,
  UNKNOWN_START_STOP_INPUTED,
} from "./ErrorMessageConstant";
import TransportDataSingleton from "../../../data/TransportDataSingleton";
import { StopState } from "../types";

const calculator = new RouteCalculator(TransportDataSingleton.getInstance());

test("Route with no lines is not used", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("D");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response!, 5, 2);
  Array.from(response!.route!.entries()).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    expect(key).not.toBe("A-D");
    expect(value.line).toBe("Vihreä");
  });
});

test("Optimal route is deduced", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("R");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response!, 11, 3);
  expect(response!.route!.find(segment => segment.id === "A-B")!.line).toBe("Vihreä");
  expect(response!.route!.find(segment => segment.id === "B-D")!.line).toBe("Vihreä");
  expect(response!.route!.find(segment => segment.id === "D-R")!.line).toBe("Punainen");
});

/**
 * Encountered this when browsing routes: If the first available line is selected for the first stop
 * when there are more than one available, it can select a different line than a line that could be
 * used through the whole route.
 */
test("Same line can be used all the way with two line options at start", () => {
  const startStopState = createStopState("E");
  const destinationStopState = createStopState("H");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response!, 4, 3);
  response!.route!.forEach((singleDirection) => {
    expect(singleDirection.line).toBe("Vihreä");
  });
});

test("Same line can be used all the way with one line option at start", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("J");
  const response: CalculationResponse | null = calculator.calculate(
    startStopState,
    destinationStopState
  );
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  validateResponse(response!, 10, 7);
  response!.route!.forEach((singleDirection) => {
    expect(singleDirection.line).toBe("Vihreä");
  });
});

test("Unknown start stop", () => {
  const startStopState = createStopState("Railway station");
  const destinationStopState = createStopState("A");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(true);
  expect(destinationStopState.hasErrors).toBe(false);

  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(UNKNOWN_START_STOP_INPUTED);
});

test("Unknown end stop", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("Railway station");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(true);

  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(UNKNOWN_END_STOP_INPUTED);
});

test("Already at the destination", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("A");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeTruthy();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);

  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(ALREADY_AT_DESTINATION);
});

test("No start stop provided", () => {
  const startStopState = createStopState(null);
  const destinationStopState = createStopState("A");
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeFalsy();
});

test("No destination stop provided", () => {
  const startStopState = createStopState("A");
  const destinationStopState = createStopState(null);
  const response = calculator.calculate(startStopState, destinationStopState);
  expect(response).toBeFalsy();
});

function validateResponse(
  response: CalculationResponse,
  totalDuration: number,
  routeSize: number
) {
  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(0);
  expect(response.totalDuration).toBeDefined();
  expect(response.totalDuration).toBe(totalDuration);
  expect(response.route).toBeDefined();
  expect(response.route!.length).toBe(routeSize);
}

function createStopState(name: string | null): StopState {
  return {
    name: name,
    hasErrors: false,
  };
}
