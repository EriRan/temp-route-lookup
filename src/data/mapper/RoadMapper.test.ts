import RoadMapper from "./RoadMapper";
import { RoadUnmapped, Stop } from "./types";

describe("RoadMapper", () => {
  const mapper = new RoadMapper();

  test("Can map roads to stops", () => {
    const roadData = [];
    roadData.push(createMockRoadJson("A", "B", 1));
    roadData.push(createMockRoadJson("B", "C", 1));
    const stopData = createMockStopMap();

    mapper.map(stopData, roadData);
    expect(stopData.get("A")).toBeDefined();
    expect(stopData.get("A")!.roads).toHaveLength(1);
    expect(stopData.get("B")).toBeDefined();
    expect(stopData.get("B")!.roads).toHaveLength(2);
    expect(stopData.get("C")).toBeDefined();
    expect(stopData.get("C")!.roads).toHaveLength(1);
  });

  test("Reverse roads included", () => {
    const roadData = [];
    roadData.push(createMockRoadJson("A", "B", 1));
    const stopData = createMockStopMap();

    mapper.map(stopData, roadData);
    expect(stopData.get("A")).toBeDefined();
    const aRoads = stopData.get("A")!.roads;
    expect(aRoads[0].duration).toBe(1);
    expect(aRoads[0].isReverse).toBe(false);

    expect(stopData.get("B")).toBeDefined();
    const bRoads = stopData.get("B")!.roads;
    expect(bRoads[0].duration).toBe(1);
    expect(bRoads[0].isReverse).toBe(true);
  });

  test("Empty roads", () => {
    const roadData: Array<RoadUnmapped> = [];
    const stopData = createMockStopMap();

    mapper.map(stopData, roadData);
    expect(stopData.get("A")).toBeDefined();
    expect(stopData.get("A")!.roads).toHaveLength(0);
    expect(stopData.get("B")).toBeDefined();
    expect(stopData.get("B")!.roads).toHaveLength(0);
    expect(stopData.get("C")).toBeDefined();
    expect(stopData.get("C")!.roads).toHaveLength(0);
  });

  test("Roads refer to stop objects", () => {
    const roadData = [];
    roadData.push(createMockRoadJson("A", "B", 1));
    const stopData = createMockStopMap();

    mapper.map(stopData, roadData);
    expect(stopData.get("A")).toBeDefined();
    expect(stopData.get("A")!.roads).toHaveLength(1);
    expect(stopData.get("A")!.roads[0]).toBeDefined();
    expect(stopData.get("A")!.roads[0].to).toBeDefined();
    expect(stopData.get("A")!.roads[0].to.name).toBe("B");

    expect(stopData.get("B")!.roads[0]).toBeDefined();
    expect(stopData.get("B")!.roads[0].to).toBeDefined();
    expect(stopData.get("B")!.roads[0].to.name).toBe("A");
  });

  function createMockStopMap(): Map<string, Stop> {
    const stopMap = new Map<string, Stop>();
    const stopNames = ["A", "B", "C"];
    for (let stopName of stopNames) {
      stopMap.set(stopName, {
        name: stopName,
        roads: [],
      });
    }
    return stopMap;
  }

  function createMockRoadJson(
    from: string,
    to: string,
    duration: number
  ): RoadUnmapped {
    return {
      mista: from,
      mihin: to,
      kesto: duration,
    };
  }
});
