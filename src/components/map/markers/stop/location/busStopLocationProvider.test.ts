import { provideBusStopLocations } from "./busStopLocationProvider";
import TransportDataSingleton from "../../../../../data/TransportDataSingleton";
import { BusStopLocation, BusStopLocations } from "../../../types";
import { Stop } from "../../../../../data/mapper/types";

describe("busStopLocationProvider", () => {
  test("Integration test", () => {
    const stopsMap = TransportDataSingleton.getInstance().stopMap;
    const busStopLocations = provideBusStopLocations(
      stopsMap.values().next().value
    );

    expect(busStopLocations).toBeDefined();
    expect(busStopLocations.busStopLocationMap).toBeDefined();
    validateMaxCoordinates(busStopLocations);
    validateLocations(stopsMap, busStopLocations.busStopLocationMap);
  });

  function validateMaxCoordinates(busStopLocations: BusStopLocations) {
    expect(busStopLocations.yMax).toBeDefined();
    expect(busStopLocations.xMax).toBeDefined();
    expect(busStopLocations.xMax).toBeGreaterThanOrEqual(0);
    expect(busStopLocations.yMax).toBeGreaterThanOrEqual(0);
  }

  function validateLocations(
    stopsMap: Map<string, Stop>,
    busStopLocationMap: Map<string, BusStopLocation>
  ) {
    validateAllStopsHaveLocation(stopsMap, busStopLocationMap);
    Array.from(busStopLocationMap.values()).forEach((locationData) => {
      expect(locationData.x).toBeGreaterThanOrEqual(0);
      expect(locationData.y).toBeGreaterThanOrEqual(0);
    });

    function validateAllStopsHaveLocation(
      stopsMap: Map<string, Stop>,
      busStopLocationMap: Map<string, BusStopLocation>
    ) {
      Array.from(stopsMap.keys()).forEach((stopName) => {
        expect(busStopLocationMap.get(stopName)).toBeDefined();
      });
    }
  }
});
