import { StopState } from "../../types";
import {
  ALREADY_AT_DESTINATION,
  UNKNOWN_END_STOP_INPUTED,
  UNKNOWN_START_STOP_INPUTED,
} from "../ErrorMessageConstant";
import { RouteNode } from "../types";
import RouteCalculatorInputValidator from "./RouteCalculatorInputValidator";

const validator = new RouteCalculatorInputValidator();

test("No errors", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  allNodesMap.set("A", createRouteNode("A"));
  allNodesMap.set("B", createRouteNode("B"));
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("B");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeNull();

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);
});

test("Start stop does not exist", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  allNodesMap.set("B", createRouteNode("B"));
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("B");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(UNKNOWN_START_STOP_INPUTED);

  expect(startStopState.hasErrors).toBe(true);
  expect(destinationStopState.hasErrors).toBe(false);
});

test("Destination stop does not exist", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  allNodesMap.set("A", createRouteNode("A"));
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("B");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(UNKNOWN_END_STOP_INPUTED);

  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(true);
});

test("Destination or start stop don't exist", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("B");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(2);
  expect(response!.errorMessages).toContain(UNKNOWN_START_STOP_INPUTED);
  expect(response!.errorMessages).toContain(UNKNOWN_END_STOP_INPUTED);

  expect(startStopState.hasErrors).toBe(true);
  expect(destinationStopState.hasErrors).toBe(true);
});

test("Start and destination stops are the same", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  allNodesMap.set("A", createRouteNode("A"));
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("A");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(ALREADY_AT_DESTINATION);

  //They aren't strictly wrong so both are false...? Reconsider this
  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);
});

test("Start and destination stops are the same even if they have different casing", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  allNodesMap.set("A", createRouteNode("A"));
  const startStopState = createStopState("a");
  const destinationStopState = createStopState("A");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(1);
  expect(response!.errorMessages).toContain(ALREADY_AT_DESTINATION);

  //They aren't strictly wrong so both are false...? Reconsider this
  expect(startStopState.hasErrors).toBe(false);
  expect(destinationStopState.hasErrors).toBe(false);
});

test("Start and destination stops are the same and they do not exist", () => {
  const allNodesMap: Map<string, RouteNode> = new Map();
  const startStopState = createStopState("A");
  const destinationStopState = createStopState("A");

  const response = validator.validate(
    startStopState,
    destinationStopState,
    allNodesMap
  );
  expect(response).toBeDefined();
  expect(response!.errorMessages).toBeDefined();
  expect(response!.errorMessages.length).toBe(3);
  expect(response!.errorMessages).toContain(ALREADY_AT_DESTINATION);
  expect(response!.errorMessages).toContain(UNKNOWN_START_STOP_INPUTED);
  expect(response!.errorMessages).toContain(UNKNOWN_END_STOP_INPUTED);

  expect(startStopState.hasErrors).toBe(true);
  expect(destinationStopState.hasErrors).toBe(true);
});

function createStopState(name: string): StopState {
  return {
    name: name,
    hasErrors: false,
  };
}

function createRouteNode(name: string): RouteNode {
  return {
    stopData: {
      name: name,
      roads: [],
    },
    nodeDuration: 2,
    selectedLine: null, //Normally not available to the validator
    linesAvailable: [], //Not important in the validator
    shortestPath: [],
  };
}
