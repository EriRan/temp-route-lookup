import { FIRST_LOCATION } from "./BusStopLocationConstant";
import { provideNextLocation } from "./nextLocationProvider";
import { Road, Stop } from "../../../../../data/mapper/types";
import { BusStopLocation, BusStopLocations } from "../../../types";
import {
  AlreadyIncludedRoad,
  RoadDirection,
  NeighbourStop,
  NextLocation,
} from "./types";

/**
 * Deduces locations for bustops in a map with the stop names as keys
 */
export function provideBusStopLocations(firstStop: Stop): BusStopLocations {
  const alreadyDeducedStops = new Map<string, BusStopLocation>();
  const alreadyIncludedRoads = new Array<AlreadyIncludedRoad>();
  const occupiedDirections = new Map<string, Array<RoadDirection>>();
  alreadyDeducedStops.set(firstStop.name, {
    x: FIRST_LOCATION.x,
    y: FIRST_LOCATION.y,
  });
  addNeighbours(
    alreadyDeducedStops,
    alreadyIncludedRoads,
    occupiedDirections,
    firstStop,
    FIRST_LOCATION
  );
  const maxCoordinates = deduceMaxCoordinates(alreadyDeducedStops);
  return {
    busStopLocationMap: alreadyDeducedStops,
    xMax: maxCoordinates.x,
    yMax: maxCoordinates.y,
  };

  function addNeighbours(
    alreadyDeducedStops: Map<string, BusStopLocation>,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>,
    occupiedDirections: Map<string, Array<RoadDirection>>,
    stop: Stop,
    currentLocation: BusStopLocation
  ) {
    const neighbourStops = new Array<NeighbourStop>();
    deduceNeighbours(
      alreadyDeducedStops,
      alreadyIncludedRoads,
      occupiedDirections,
      stop,
      currentLocation,
      neighbourStops
    );
    neighbourStops.forEach((neighbourStop) => {
      addNeighbours(
        alreadyDeducedStops,
        alreadyIncludedRoads,
        occupiedDirections,
        neighbourStop.stop,
        neighbourStop.location
      );
    });
  }

  function deduceNeighbours(
    alreadyDeducedStops: Map<string, BusStopLocation>,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>,
    occupiedDirections: Map<string, Array<RoadDirection>>,
    stop: Stop,
    currentLocation: BusStopLocation,
    neighbourStops: Array<NeighbourStop>
  ) {
    stop.roads
      .filter((road) => !isRoadAlreadyIncluded(road, alreadyIncludedRoads))
      .forEach((road) => {
        alreadyIncludedRoads.push({
          fromName: road.from.name,
          toName: road.to.name,
        });
        if (alreadyDeducedStops.get(road.to.name)) {
          return;
        }
        const nextLocation = deduceNextLocation(
          currentLocation,
          road,
          occupiedDirections
        );
        if (!nextLocation) {
          console.log("No direction for ", road.to.name);
          return; //Return is equivalent of continue inside a forEach loop
        }
        alreadyDeducedStops.set(road.to.name, nextLocation.point);
        neighbourStops.push({
          stop: road.to,
          location: nextLocation.point,
        });
      });
  }

  function deduceNextLocation(
    currentLocation: BusStopLocation,
    road: Road,
    occupiedDirections: Map<string, Array<RoadDirection>>
  ): NextLocation | null {
    const nextLocation = provideNextLocation(
      currentLocation,
      road.duration,
      occupiedDirections.get(road.from.name)
    );
    if (!nextLocation) {
      return null;
    }
    addOccupiedDirection(
      road.from.name,
      nextLocation.direction,
      occupiedDirections
    );
    return nextLocation;
  }

  function addOccupiedDirection(
    stopName: string,
    direction: RoadDirection,
    occupiedDirections: Map<string, Array<RoadDirection>>
  ) {
    const occupiedDirectionsForStop = occupiedDirections.get(stopName);
    if (!occupiedDirectionsForStop) {
      const newDirectionArray = Array<RoadDirection>();
      newDirectionArray.push(direction);
      occupiedDirections.set(stopName, newDirectionArray);
    } else {
      occupiedDirectionsForStop!.push(direction);
    }
  }

  /**
   * Go through all bus stops and find out the highest available x and y coordinate from all of them.
   * @param alreadyDeducedStops
   * @returns
   */
  function deduceMaxCoordinates(
    alreadyDeducedStops: Map<string, BusStopLocation>
  ) {
    let xMax = 0;
    let yMax = 0;
    for (let value of Array.from(alreadyDeducedStops.values())) {
      if (xMax < value.x) {
        xMax = value.x;
      }
      if (yMax < value.y) {
        yMax = value.y;
      }
    }
    return {
      x: xMax,
      y: yMax,
    };
  }

  function isRoadAlreadyIncluded(
    road: Road,
    alreadyIncludedRoads: Array<AlreadyIncludedRoad>
  ) {
    return alreadyIncludedRoads.some((alreadyIncludedRoad) => {
      return (
        (road.to.name === alreadyIncludedRoad.toName ||
          road.to.name === alreadyIncludedRoad.fromName) &&
        (road.from.name === alreadyIncludedRoad.fromName ||
          road.from.name === alreadyIncludedRoad.toName)
      );
    });
  }
}
