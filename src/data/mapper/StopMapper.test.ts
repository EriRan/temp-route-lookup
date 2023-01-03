import StopMapper from "./StopMapper";
import { RoadUnmapped } from "./types";

describe("StopMapper", () => {

  const mapper = new StopMapper();

  test("Stops contain required variables", () => {
    //Road array mapped in the RoadMapper inside the StopMapper but let's not focus to it here
    const stopMap = mapper.map(
      createMockStopsJson(),
      new Array<RoadUnmapped>()
    );
    expect(stopMap).toBeInstanceOf(Map);
    Array.from(stopMap.entries()).forEach((stopEntry) => {
      const key = stopEntry[0];
      const value = stopEntry[1];

      expect(key).toBeDefined();
      expect(value).toBeDefined();
      expect(value.roads).toBeInstanceOf(Array);
    });
  });

  test("Empty content provided", () => {
    //Road array mapped in the RoadMapper inside the StopMapper but let's not focus to it here
    const stopMap = mapper.map(new Array<string>(), new Array<RoadUnmapped>());
    expect(stopMap).toBeInstanceOf(Map);
    expect(stopMap.size).toBe(0);
  });

  function createMockStopsJson() {
    return ["A", "B", "C"];
  }

});
