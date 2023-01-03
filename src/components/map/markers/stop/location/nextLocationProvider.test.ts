import { provideNextLocation } from "./nextLocationProvider";
import { STOP_GAP } from "./BusStopLocationConstant";
import { RoadDirection, NextLocation } from "./types";

describe("nextLocationProvider", () => {
  test("No existing locations", () => {
    const location = {
      x: 0,
      y: 0,
    };
    const duration = 1;
    const occupiedDirectionsForStop = Array<RoadDirection>();
    const nextLocation = provideNextLocation(
      location,
      duration,
      occupiedDirectionsForStop
    );
    expect(nextLocation).toBeDefined();
    expect(nextLocation!.direction).toBe(RoadDirection.UPPER_RIGHT);
    validateNextLocationCoordinates(
      duration * STOP_GAP,
      -duration * STOP_GAP,
      nextLocation!
    );
  });

  test("Next location down", () => {
    const location = {
      x: 0,
      y: 0,
    };
    const duration = 1;
    const occupiedDirectionsForStop: Array<RoadDirection> = [
      RoadDirection.UPPER_RIGHT,
      RoadDirection.RIGHT,
      RoadDirection.LOWER_RIGHT,
    ];
    const nextLocation = provideNextLocation(
      location,
      duration,
      occupiedDirectionsForStop
    );
    expect(nextLocation).toBeDefined();
    expect(nextLocation!.direction).toBe(RoadDirection.DOWN);
    validateNextLocationCoordinates(0, duration * STOP_GAP, nextLocation!);
  });

  test("Take first in a gap", () => {
    const location = {
      x: 0,
      y: 0,
    };
    const duration = 1;
    const occupiedDirectionsForStop: Array<RoadDirection> = [
      RoadDirection.UPPER_RIGHT,
      RoadDirection.LOWER_RIGHT,
    ];
    const nextLocation = provideNextLocation(
      location,
      duration,
      occupiedDirectionsForStop
    );
    expect(nextLocation).toBeDefined();
    expect(nextLocation!.direction).toBe(RoadDirection.RIGHT);
    validateNextLocationCoordinates(duration * STOP_GAP, 0, nextLocation!);
  });

  function validateNextLocationCoordinates(
    expectedX: number,
    expectedY: number,
    nextLocationData: NextLocation
  ) {
    expect(nextLocationData).toBeDefined();
    expect(nextLocationData.point).toBeDefined();
    expect(nextLocationData.point.x).toBe(expectedX);
    expect(nextLocationData.point.y).toBe(expectedY);
  }
});
