import { STOP_GAP } from "./BusStopLocationConstant";
import { BusStopLocation } from "../../../types";
import { RoadDirection, NextLocation } from "./types";

/**
 * Provide location for the next bus stop. Each bus stop can be placed to 8 different directions from the current one.
 * We start selecting directions from Upper right and then go in clockwise direction to select the first available direction.
 */
export function provideNextLocation(
  location: BusStopLocation,
  duration: number,
  occupiedDirectionsForStop?: Array<RoadDirection>
): NextLocation | null {
  return findFreeLocation(
    location,
    calculatePixelDistance(duration),
    occupiedDirectionsForStop
  );

  function findFreeLocation(
    location: BusStopLocation,
    distance: number,
    occupiedDirectionsForStop?: Array<RoadDirection>
  ) {
    //Upper right
    if (isDirectionFree(RoadDirection.UPPER_RIGHT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x + distance,
        location.y - distance,
        RoadDirection.UPPER_RIGHT
      );
    }
    //Right
    else if (isDirectionFree(RoadDirection.RIGHT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x + distance,
        location.y,
        RoadDirection.RIGHT
      );
    }
    //Lower right
    else if (
      isDirectionFree(RoadDirection.LOWER_RIGHT, occupiedDirectionsForStop)
    ) {
      return createResponseObject(
        location.x + distance,
        location.y + distance,
        RoadDirection.LOWER_RIGHT
      );
    }
    //Down
    else if (isDirectionFree(RoadDirection.DOWN, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x,
        location.y + distance,
        RoadDirection.DOWN
      );
    }
    //Lower left
    else if (
      isDirectionFree(RoadDirection.LOWER_LEFT, occupiedDirectionsForStop)
    ) {
      return createResponseObject(
        location.x - distance,
        location.y - distance,
        RoadDirection.LOWER_LEFT
      );
    }
    //Left
    else if (isDirectionFree(RoadDirection.LEFT, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x - distance,
        location.y,
        RoadDirection.LEFT
      );
    }
    //Upper left
    else if (
      isDirectionFree(RoadDirection.UPPER_LEFT, occupiedDirectionsForStop)
    ) {
      return createResponseObject(
        location.x - distance,
        location.y + distance,
        RoadDirection.UPPER_LEFT
      );
    }
    //UP
    else if (isDirectionFree(RoadDirection.UP, occupiedDirectionsForStop)) {
      return createResponseObject(
        location.x,
        location.y - distance,
        RoadDirection.UP
      );
    } else {
      console.error("Ran out of possible directions!");
      return null;
    }
  }

  function createResponseObject(
    x: number,
    y: number,
    direction: RoadDirection
  ): NextLocation {
    return {
      point: {
        x: x,
        y: y,
      },
      direction: direction,
    };
  }

  function isDirectionFree(
    direction: RoadDirection,
    occupiedDirectionsForStop?: Array<RoadDirection>
  ) {
    return (
      !occupiedDirectionsForStop ||
      !occupiedDirectionsForStop!.includes(direction) //Negation and assurance that occupiedDirectionsForStop is not null
    );
  }

  function calculatePixelDistance(duration: number) {
    return STOP_GAP * duration;
  }
}
