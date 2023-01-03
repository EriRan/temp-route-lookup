import TransportDataMapper from "./TransportDataMapper";
import { TransportData, TransportDataUnmapped } from "./types";

describe("TransportDataMapper", () => {

  const mapper = new TransportDataMapper();

  test("Included lines", () => {
    const mappedTransportData = mapper.map(createMockData());
  
    validateIncludedLines(mappedTransportData);
  });

  function validateIncludedLines(mappedTransportData: TransportData) {
    mappedTransportData.stopMap.forEach((stop) => {
      if (stop.name === "X") {
        //Unreachable stop
        expect(stop.roads).toHaveLength(0);
        return;
      }
      stop.roads.forEach((road) => {
        expect(road.to).toBeDefined();
        expect(road.to.name).toBeDefined();
        expect(road.to.roads).toBeInstanceOf(Array);
        expect(road.from).toBeDefined();
        expect(road.from.name).toBeDefined();
        expect(road.from.roads).toBeInstanceOf(Array);
        expect(road.duration).toBeDefined();
        expect(road.includesLines).toBeInstanceOf(Array);
        validateIncludesLinesCount(
          road.to.name,
          road.from.name,
          road.includesLines
        );
      });
    });
  }
  
  function createMockData(): TransportDataUnmapped {
    return {
      pysakit: ["A", "B", "C", "D", "X"], //X here is unreachable
      tiet: [
        {
          mista: "A",
          mihin: "B",
          kesto: 1,
        },
        {
          mista: "B",
          mihin: "C",
          kesto: 2,
        },
        {
          mista: "C",
          mihin: "D",
          kesto: 1,
        },
        //This road is not used by any lines
        {
          mista: "A",
          mihin: "D",
          kesto: 3,
        },
      ],
      linjastot: {
        punainen: ["A", "B", "C", "D"],
        vihreä: ["C", "D"],
        sininen: ["B", "C"],
        keltainen: ["C", "A"],
      },
    };
  }
  
  function validateIncludesLinesCount(
    toName: String,
    fromName: String,
    includesLines?: Array<String>
  ) {
    if (
      (toName === "A" && fromName === "D") ||
      (toName === "D" && fromName === "A")
    ) {
      expect(includesLines).toHaveLength(0);
    } else {
      expect(includesLines).toBeDefined();
      expect(includesLines!.length).toBeGreaterThan(0);
    }
  }

});
