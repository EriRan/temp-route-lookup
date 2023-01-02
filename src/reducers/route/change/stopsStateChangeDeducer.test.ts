import { Payload, RouteStore, StopState } from "../types";
import { changeStartOrDestination } from "./stopsStateChangeDeducer";

test("Payload equal to start stop sets start to null", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("A", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBeNull();
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBe("B");
});

test("Payload equal to start stop considered equal even if casings arent the same", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("a", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop.name).toBeNull();
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBe("B");
});

test("Payload equal to destination stop sets destination to null", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("B", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop!.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBeNull();
});

test("Payload equal to destination stop considered equal even if casings arent the same", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "b"),
    createPayload("B", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop!.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBeNull();
});

test("Do nothing if payload has an error", () => {
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "B"),
    createPayload("B", true)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop!.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBe("B");
});

test("Set new destination if both start and destination in state and new destination is not equal to either", () => {
  //Would be nice to mock the calculation function somehow so that it doesn't get called for real.
  //We would then save a few milliseconds.
  const stateChange = changeStartOrDestination(
    createCurrentState("A", "C"),
    createPayload("B", false)
  );

  expect(stateChange).toBeDefined();
  expect(stateChange.startStop).toBeDefined();
  expect(stateChange.startStop!.name).toBe("A");
  expect(stateChange.destinationStop).toBeDefined();
  expect(stateChange.destinationStop!.name).toBe("B");
  expect(stateChange.calculatedRoute).toBeDefined();
  expect(stateChange.calculatedRoute!.route).toBeDefined();
  expect(stateChange.calculatedRoute!.totalDuration).toBeDefined();
});

function createCurrentState(
  startStop: string,
  destinationStop: string
): RouteStore {
  return {
    startStop: {
      name: startStop,
    },
    destinationStop: {
      name: destinationStop,
    },
    calculatedRoute: null,
  };
}

function createPayload(stopName: string, hasErrors: boolean): Payload {
  return {
    name: stopName,
    hasErrors: hasErrors,
  };
}
