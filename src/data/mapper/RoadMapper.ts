import { RoadUnmapped, Stop, Road } from "./types";

/**
 * Append road data to the provided stops
 *
 * Todo: Stop appending to the provided map and instead just return the two created roads. I hope we can do something like addAll in Javascript
 */
class RoadMapper {
  map(mappedStops: Map<string, Stop>, roadsJson: Array<RoadUnmapped>): void {
    if (!roadsJson) {
      return;
    }
    roadsJson.forEach((road) => {
      const mappedPointOneStop = mappedStops.get(road.mista);
      const mappedPointTwoStop = mappedStops.get(road.mihin)!;
      if (mappedPointOneStop === undefined) {
        console.error("Road connecting to unrecognised stop: " + road.mista);
        return;
      }
      if (mappedPointTwoStop === undefined) {
        console.error("Road connecting to unrecognised stop: " + road.mihin);
        return;
      }

      const mappedRoad: Road = {
        from: mappedPointOneStop,
        to: mappedPointTwoStop,
        duration: road.kesto,
        isReverse: false,
        includesLines: Array<string>(),
      };

      mappedPointOneStop.roads.push(mappedRoad);
      mappedPointTwoStop.roads.push(
        createReverseRoad(mappedRoad, mappedPointOneStop, mappedPointTwoStop)
      );
    });

    /**
     * Todo: I wonder if I can get rid of this? Would require massive changes to the Djikstra's algorithm but shouldn't be impossible. That way I'd also reduce the amount of data in use.
     * @param mappedRoad
     * @param mappedPointOneStop
     * @param mappedPointTwoStop
     * @returns
     */
    function createReverseRoad(
      mappedRoad: Road,
      mappedPointOneStop: Stop,
      mappedPointTwoStop: Stop
    ): Road {
      return {
        from: mappedPointTwoStop,
        to: mappedPointOneStop,
        duration: mappedRoad.duration,
        isReverse: true,
        includesLines: Array<string>(),
      };
    }
  }
}

export default RoadMapper;
