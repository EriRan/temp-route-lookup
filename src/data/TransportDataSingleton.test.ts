import { Line, Stop } from "./mapper/types";
import TransportDataSingleton from "./TransportDataSingleton";

describe("TransportDataSingleton", () => {

  test("Transport Data integration", () => {
    const transportDataSingleton = TransportDataSingleton.getInstance();
    expect(transportDataSingleton).toBeDefined();
    expect(transportDataSingleton.stopMap).toBeInstanceOf(Map);
    expect(transportDataSingleton.lines).toBeInstanceOf(Array);
  
    validateStops(transportDataSingleton.stopMap);
    validateHasLines(transportDataSingleton.lines);
  
    function validateStops(stops: Map<String, Stop>) {
      expect(stops.size).toBeGreaterThan(0);
      Array.from(stops.values()).forEach((stop) => {
        validateStopHasRoads(stop);
      });
    }
  
    function validateStopHasRoads(stop: Stop) {
      expect(stop.roads).toBeInstanceOf(Array);
      expect(stop.roads.length).toBeGreaterThan(0);
    }
  
    function validateHasLines(lines: Array<Line>) {
      expect(lines).toBeInstanceOf(Array);
      expect(lines.length).toBeGreaterThan(0);
    }
  });
  
  test("Is singleton", () => {
    expect(TransportDataSingleton.getInstance()).toEqual(
      TransportDataSingleton.getInstance()
    );
  });
  
})

